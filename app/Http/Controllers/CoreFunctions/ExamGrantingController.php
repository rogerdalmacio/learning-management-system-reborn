<?php

namespace App\Http\Controllers\CoreFunctions;

use League\Csv\Reader;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\Core\ExamGrantRequest;
use App\Models\CoreFunctions\ExaminationGrant;
use Carbon\Carbon;

class ExamGrantingController extends Controller
{
    public function store(ExamGrantRequest $request){
        
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
}
