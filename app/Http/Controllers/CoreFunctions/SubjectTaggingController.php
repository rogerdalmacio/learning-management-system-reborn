<?php

namespace App\Http\Controllers\CoreFunctions;

use League\Csv\Reader;
use App\Models\Users\Student;
use App\Models\Users\Teacher;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
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

        try {

            $success = [];
            $errors = [];

            $csv = $request->file('file');
            $csv = Reader::createFromPath($csv->getRealPath(), 'r');
            $csv->setHeaderOffset(0);
            
            foreach ($csv as $student) {



                $rules = [
                    'id' => [
                        'required',
                        Rule::exists('students', 'id')
                    ],
                    'subjects' => [
                        'required',
                        'unique:students,subjects'
                    ]
                ];

                $message = [
                    'id.exists' => 'This student id : :input does not exist',
                    'subjects.unique' => $student['id'] . 'The subjects :input you are trying to tag already exist'
                ];

                $validator = Validator::make($student, $rules, $message);

                if($validator->fails()){
                    
                    $errors[] = $validator->errors();
                
                }

                $user = Student::find($student['id']);

                if($user) {
                    
                    $success[] = $student['id'];
                    $user->subjects = $student['subjects'];
                    $user->save();

                }

            }

        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'Subjects Tagged to' => $success,
            'errors' => $errors,
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
                        Rule::exists('teachers', 'id')
                    ],
                    'subjects' => [
                        'required',
                        'unique:teachers,subjects'
                    ]
                ];

                $message = [
                    'id.exists' => 'Teacher id : :input does not exist',
                    'subjects.unique' => $teacher['id'] . 'The subjects :input you are trying to tag already exist'
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

        return response($response, 201);

    }

    public function singleCourseDeveloperSubjectTagging(SingleCourseDeveloperSubjectTaggingRequest $request)
    {

        $user = CourseDeveloper::find($request['id']);

        $userSubjects = $user->subjects;

        if($userSubjects) {

            $error = [
                'You can only tag single subject to a Course Developer',
                'not successfull' => $request['subject']
            ];

            return response($error, 409);

        }

        $response = [
            'Subject Tagged Successfully' => $request['subject']
        ];

        $user->subjects = $request['subject'];
        $user->save();

        return response($response, 201);

    }

}
