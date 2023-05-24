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
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\Core\ExamGrantRequest;
use App\Mail\ExamGrantMail;
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

            foreach($csv as $grant) {

                $rules = [
                    'student_id' => [
                        'required',
                    ],
                    'grant' => [
                        'required',
                    ],
                    'preliminaries' => [
                        'required',
                        Rule::unique('lms_examination_grants')->where( function ($query) use($grant) {
                            return $query->where('student_id', $grant['student_id'])
                                ->where('preliminaries', $grant['preliminaries']);
                        })
                    ],
                ];

                $newGrant = [
                    'student_id' => $grant['student_id'],
                    'grant' => $grant['grant'],
                    'preliminaries' => $grant['preliminaries'],
                    'granted_at' => Carbon::now(),
                ];

                $message = [
                    'preliminaries.unique' => 'Student id '. $grant['student_id'] .' already have ' . $grant['preliminaries']
                ];
                
                $validator = Validator::make($newGrant, $rules, $message);

                if($validator->fails()){
                    $errors[] = $validator->errors();
                } else {
                    $massgrant[] = $newGrant;
                    $success[] = $grant;
                }
            }
            
            foreach($massgrant as $chunk) {
                ExaminationGrant::insert($chunk);

                $student = Student::find($chunk['student_id']);

                Mail::to($student->email)->queue(new ExamGrantMail($student, $chunk['preliminaries']));
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
        ], 200);

    }

    public function singleExamGrant(Request $request) {

        $request->validate([
            'student_id' => [
                'required',
                Rule::exists('lms_students', 'id')],
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

        $student = Student::find($request['student_id']);

        Mail::to($student->email)->queue(new ExamGrantMail($student, $request['preliminaries']));

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
