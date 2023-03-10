<?php

namespace App\Http\Controllers\CoreFunctions;

use Carbon\Carbon;
use League\Csv\Reader;
use Illuminate\Http\Request;
use App\Models\Users\Student;
use Illuminate\Validation\Rule;
use App\Models\CoreFunctions\Logs;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\Core\ExamGrantRequest;
use App\Models\CoreFunctions\ExaminationGrant;

class ExamGrantingController extends Controller
{

    public function listOfGrantees() {

        $students = Student::with('grant')->get();

        $response = [
            'students' => $students
        ];

        return response($response, 200);

    }
    
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

                if($grantExists->count() > 0) {
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

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'granted students for examination'
        ]);

        return response()->json([   
            'Exam granted for' => $success,
            'errors' => $errors
        ], 201);

    }

    public function singleExamGrant(Request $request) {

        $request->validate([
            'student_id' => [
                'required',
                Rule::exists('students', 'id')],
            'grant' => 'required',
            'preliminaries' => 'required',
        ]);

        $grantExists = ExaminationGrant::where('student_id', $request['student_id'])
                        ->where('preliminaries', $request['preliminaries'])->get(); 

        if($grantExists->count() > 0) {
            return response(['already granted'], 201);
        }
    
        ExaminationGrant::insert([
            'student_id' => $request['student_id'],
            'grant' => $request['grant'],
            'preliminaries' => $request['preliminaries'],
            'granted_at' => Carbon::now()
        ]);

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'granted student for examination'
        ]);

        return response('granted successfully', 204);

    }


    public function deleteGrant($id) {

        $grant = ExaminationGrant::find($id);

        $grant->delete();

        $response = [
            'Grant dropped'
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'revoked examination grant for a student'
        ]);

        return response($response, 202);

    }

}
