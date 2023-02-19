<?php

namespace App\Http\Controllers\CoreFunctions;

use Carbon\Carbon;
use League\Csv\Reader;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\CoreFunctions\ExaminationGrant;
use App\Http\Requests\Core\ExamGrantRequest;
use Illuminate\Http\Request;

class ExamGrantingController extends Controller
{
    
    public function batchExamGrant(ExamGrantRequest $request){
        
        try {

            $csv = $request->file('file');
            $csv = Reader::createFromPath($csv->getRealPath(), 'r');
            $csv->setHeaderOffset(0);

            $massgrant = [];
            $errors = [];
            $success = [];

            $rules = [
                'student_id' => [
                    'required',
                    'unique:examination_grants'
                ],
                'grant' => [
                    'required',
                ],
                'preliminaries' => [
                    'required',
                ],
            ];

            foreach($csv as $grant) {

                $grantExists = ExaminationGrant::where('student_id', $grant['student_id'])
                                ->where('preliminaries', $grant['preliminaries'])->get(); 

                if(!$grantExists === '[]') {
                    return response(['already exist'], 201);
                }

                $newGrant = [
                    'student_id' => $grant['student_id'],
                    'grant' => $grant['grant'],
                    'preliminaries' => $grant['preliminaries'],
                    'granted_at' => Carbon::now(),
                ];

                $message = ['student_id.unique' => 'Student_id: :input already granted'];
                $validator = Validator::make($newGrant, $rules, $message);

                if($validator->fails()){
                    $errors[] = $validator->errors();
                } else {
                    $massgrant[] = $newGrant;
                    $success[] = $grant;
                }

            }

            $chunks = array_chunk($massgrant, 100);
            
            foreach($chunks as $chunk) {
                ExaminationGrant::insert($chunk); 
            }

        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return response()->json([
                'error' => $e->getMessage(),
                'errors' => $errors
            ], 500);
        }

        return response()->json([   
            'Exam granted for' => $success,
            'errors' => $errors
        ], 201);

    }

    public function singleExamGrant(Request $request) {

        $request->validate([
            'student_id' => 'required|unique:examination_grants',
            'grant' => 'required',
            'preliminaries' => 'required',
        ]);

        $grantExists = ExaminationGrant::where('student_id', $request['student_id'])
                        ->where('preliminaries', $request['preliminaries'])->get(); 

        if($grantExists->count() > 0) {
            return response(['already exist'], 201);
        }
    
        ExaminationGrant::create([
            'student_id' => $request['student_id'],
            'grant' => $request['grant'],
            'preliminaries' => $request['preliminaries']
        ]);

    }

}
