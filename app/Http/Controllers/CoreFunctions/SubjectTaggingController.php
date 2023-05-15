<?php

namespace App\Http\Controllers\CoreFunctions;

use League\Csv\Reader;
use Illuminate\Http\Request;
use App\Models\Users\Student;
use App\Models\Users\Teacher;
use Illuminate\Validation\Rule;
use App\Models\CoreFunctions\Logs;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Users\CourseDeveloper;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\Core\SubjectTaggingRequests\BatchTeacherSubjectTaggingRequest;
use App\Http\Requests\Core\SubjectTaggingRequests\BatchStudentsSubjectTaggingRequest;
use App\Http\Requests\Core\SubjectTaggingRequests\SingleStudentSubjectTaggingRequest;
use App\Http\Requests\Core\SubjectTaggingRequests\SingleTeacherSubjectTaggingRequest;
use App\Http\Requests\Core\SubjectTaggingRequests\SingleCourseDeveloperSubjectTaggingRequest;

class SubjectTaggingController extends Controller
{
    
    public function batchStudentsSubjectTagging(BatchStudentsSubjectTaggingRequest $request)
    {

        DB::beginTransaction();
        try {

            $csv = $request->file('file');
            $csv = Reader::createFromPath($csv->getRealPath(), 'r');
            $csv->setHeaderOffset(0);
            
            foreach ($csv as $config) {

                $rules = [
                    'year_and_semester' => [
                        'required',
                    ],
                    'program' => [
                        'required',
                    ],
                    'major' => [
                        'required'
                    ],
                    'subjects' => [
                        'required'
                    ],
                ];

                Validator::make($config, $rules);

                $students = Student::where('program', $config['program'])
                    ->where('year_and_section', 'LIKE', $config['year_and_semester' . '%'])
                    ->when($config['major'], function($query) use ($config) {
                        return $query->where('major', $config['major']);
                    })
                    ->get();
                
                foreach($students as $student) {
                    $student->update([
                        'subjects' => $config['subjects']
                    ]);
                }
            }

        } catch (\Exception $e) {
            DB::rollback();
            Log::error($e->getMessage());

            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Batch tagged students on their subjects'
        ]);

        DB::commit();

        return response()->json([
            'Task executed successfully'
        ], 201);
    }

    public function batchTeacherSubjectTagging(BatchTeacherSubjectTaggingRequest $request)
    {

        try {

            $success = [];
            $errors = [];

            $csv = $request->file('file');
            $csv = Reader::createFromPath($csv->getRealPath(), 'r');
            $csv->setHeaderOffset(0);
            
            foreach ($csv as $teacher) {

                $rules = [
                    'id' => [
                        'required',
                        Rule::exists('lms_teachers', 'id')
                    ],
                    'subjects' => [
                        'required',
                    ]
                ];

                $message = [
                    'id.exists' => 'Teacher id : :input does not exist',
                ];

                $validator = Validator::make($teacher, $rules, $message);

                if($validator->fails()){
                    $errors[] = $validator->errors();
                }

                $user = Teacher::find($teacher['id']);

                if($user) {

                    $success[] = $teacher['id'];
                    $user->subjects = $teacher['subjects'];
                    $user->save();
                    
                }
                
            }

        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Batch tagged teachers on their subjects'
        ]);

        return response()->json([
            'Subjects Tagged to' => $success,
            'errors' => $errors,
        ], 201);

    }

    public function singleStudentSubjectTagging(SingleStudentSubjectTaggingRequest $request)
    {
        $user = Student::find($request['id']);

        $userSubjects = $user->subjects;

        //trim subject requests

        $newSubjectRequests = explode(",", $request['subjects']);

        $newSubjectRequestsArray = array_map('trim', $newSubjectRequests);

        $newSubjects = implode(",", $newSubjectRequestsArray);


        if(!$userSubjects) {

            $user->update(['subjects' => $newSubjects]);
            
            $response = [
                'Successfully added' => $request['subjects'],
            ];

            return response($response, 201);

        }

        $userSubjectsArray = explode(',', $userSubjects);
        $requestSubjectsArray = explode(',', $newSubjects);

        $intersects = array_intersect($userSubjectsArray, $requestSubjectsArray);
        
        if(count($intersects) > 0) {
            
            $response = [
                'SubjectAlreadyExists' => $intersects
            ];

            return response($response, 409);

        }

        $newSubjectsArray = array_merge($userSubjectsArray, $requestSubjectsArray);

        $newSubjectsString = implode(",", $newSubjectsArray);

        $user->update(['subjects' => $newSubjectsString]);

        $response = [
            'Successfully added' => $newSubjects,
            'New list of subjects' => $newSubjectsArray
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Tagged student on his/her subjects'
        ]);

        return response($response, 201);

    }

    public function singleTeacherSubjectTagging(SingleTeacherSubjectTaggingRequest $request)
    {
        $user = Teacher::find($request['id']);

        $userSubjects = $user->subjects;
        
        //trim subject requests

        $newSubjectRequests = explode(",", $request['subjects']);

        $newSubjectRequestsArray = array_map('trim', $newSubjectRequests);

        $newSubjects = implode(",", $newSubjectRequestsArray);

        if(!$userSubjects) {

            $user->update(['subjects' => $newSubjects]);
            
            $response = [
                'Successfully added' => $request['subjects'],
            ];

            return response($response, 201);

        }

        $userSubjectsArray = explode(',', $userSubjects);

        $requestSubjectsArray = explode(',', $request['subjects']);

        $intersects = array_intersect($userSubjectsArray, $requestSubjectsArray);

        if(count($intersects) > 0) {
            
            $response = [
                'SubjectAlreadyExists' => $intersects
            ];

            return response($response, 409);

        }

        $newSubjectsArray = array_merge($userSubjectsArray, $requestSubjectsArray);

        $newSubjectsString = implode(",", $newSubjectsArray);

        $user->update(['subjects' => $newSubjectsString]);

        $response = [
            'Successfully added' => $newSubjects,
            'New list of subjects' => $newSubjectsArray
        ];
        
        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Tagged teacher on his/her subjects'
        ]);

        return response($response, 201);

    }

    public function singleCourseDeveloperSubjectTagging(SingleCourseDeveloperSubjectTaggingRequest $request)
    {

        $user = CourseDeveloper::find($request['id']);

        $userSubjects = $user->subjects;
        
        //trim subject requests

        $newSubjectRequests = explode(",", $request['subjects']);

        $newSubjectRequestsArray = array_map('trim', $newSubjectRequests);

        $newSubjects = implode(",", $newSubjectRequestsArray);

        if(!$userSubjects) {

            $user->update(['subjects' => $newSubjects]);
            
            $response = [
                'Successfully added' => $request['subjects'],
            ];

            return response($response, 201);

        }

        $userSubjectsArray = explode(',', $userSubjects);

        $requestSubjectsArray = explode(',', $request['subjects']);

        $intersects = array_intersect($userSubjectsArray, $requestSubjectsArray);

        if(count($intersects) > 0) {
            
            $response = [
                'SubjectAlreadyExists' => $intersects
            ];

            return response($response, 409);

        }

        $newSubjectsArray = array_merge($userSubjectsArray, $requestSubjectsArray);

        $newSubjectsString = implode(",", $newSubjectsArray);

        $user->update(['subjects' => $newSubjectsString]);

        $response = [
            'Successfully added' => $newSubjects,
            'New list of subjects' => $newSubjectsArray
        ];
        
        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Tagged CourseDeveloper on his/her subjects'
        ]);

        return response($response, 201);

    }

    public function editCourseDeveloperSubject($id, Request $request) {

        $request->validate([
            'subjects' => 'string|required'
        ]);

        $coursedeveloper = CourseDeveloper::find($id);

        $coursedeveloper->update([
            'subjects' => $request['subjects']
        ]);

        $response = [
            'new subjects list' => $coursedeveloper->subjects
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Editted course developer subjects'
        ]);

        return response($response, 201);

    }

    public function editStudentSubject($id, Request $request) {

        $request->validate([
            'subjects' => 'string|required'
        ]);

        $student = Student::find($id);

        $student->update([
            'subjects' => $request['subjects']
        ]);

        $response = [
            'new subjects list' => $student->subjects
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Editted student subjects'
        ]);

        return response($response, 201);
    
    }

    public function editTeacherSubject($id, Request $request){

        $request->validate([
            'subjects' => 'string|required'
        ]);

        $teacher = Teacher::find($id);

        $teacher->update([
            'subjects' => $request['subjects']
        ]);

        $response = [
            'new subjects list' => $teacher->subjects
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Editted teacher subjects'
        ]);

        return response($response, 201);

    }

}
