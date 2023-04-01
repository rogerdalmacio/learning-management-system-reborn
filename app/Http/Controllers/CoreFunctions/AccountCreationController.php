<?php

namespace App\Http\Controllers\CoreFunctions;

use Carbon\Carbon;
use League\Csv\Reader;
use App\Models\Users\Admin;
use App\Models\Users\Student;
use App\Models\Users\Teacher;
use App\Models\CoreFunctions\Logs;
use App\Models\Users\CourseManager;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Users\CourseDeveloper;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\Core\AccountCreationRequests\CreateSingleAdminRequest;
use App\Http\Requests\Core\AccountCreationRequests\BatchCreateStudentRequest;
use App\Http\Requests\Core\AccountCreationRequests\BatchCreateTeachersRequest;
use App\Http\Requests\Core\AccountCreationRequests\CreateSingleStudentRequest;
use App\Http\Requests\Core\AccountCreationRequests\CreateSingleTeacherRequest;
use App\Http\Requests\Core\AccountCreationRequests\CreateSingleCourseManagerRequest;
use App\Http\Requests\Core\AccountCreationRequests\CreateSingleCourseDeveloperRequest;

class AccountCreationController extends Controller
{
    public function batchCreateStudents(BatchCreateStudentRequest $request)
    {
        
        try {

            $success = [];
            $insertStudents = [];
            $errors = [];

            $extension = $request->file('file')->getClientOriginalExtension();

            $csv = $request->file('file');
            $csv = Reader::createFromPath($csv->getRealPath(), 'r');
            if($extension == 'csv') {
                $csv->setHeaderOffset(0);
            }

            $rules = [
                'id' => [
                    'required',
                    'unique:lms_students'
                ],
                'first_name' => [
                    'required',
                ],
                'last_name' => [
                    'required',
                ],
                'year_and_section' => [
                    'required',
                ],
                'major' => [
                    'sometimes',
                ],
                'department' => [
                    'required',
                ],
                'program' => [
                    'required',
                ]
            ];
        
            foreach ($csv as $student) {

                $firstTwoCharactersOfLastName = substr($student['last_name'], 0, 2);

                $date = Carbon::now()->format('Y');

                $password = '#' . $firstTwoCharactersOfLastName . $date;

                $email = $student['id'] . '@lms.bcpsms.com';

                $newstudent = [
                    'id' => $student['id'],
                    'first_name' => $student['first_name'],
                    'last_name' => $student['last_name'],
                    'email' => $email,
                    'password' => Hash::make($password),
                    'year_and_section' => $student['year_and_section'],
                    'major' => $student['major'],
                    'department' => $student['department'],
                    'program' => $student['program'],
                    'subjects' => '',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];

                $message = [
                    'id.unique' => 'ID :input already exists'
                ];

                $validator = Validator::make($newstudent, $rules, $message);

                if($validator->fails()){
                    $errors[] = $validator->errors();
                } else {
                    $insertStudents[] = $newstudent;
                    $success[] = $newstudent['email'] . ' - ' . $password;
                }

            }

            $chunks = array_chunk($insertStudents, 100);

            foreach($chunks as $chunk) {
                Student::insert($chunk);
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
            'activity_log' => 'batch created students account'
        ]);

        return response()->json([
            'accountSuccessfullyCreatedFor' => $success,
            'errors' => $errors
        ], 201);

    }

    public function batchCreateTeachers(BatchCreateTeachersRequest $request) {

        try {

            $success = [];
            $insertTeacher = [];
            $errors = [];

            $extension = $request->file('file')->getClientOriginalExtension();

            $csv = $request->file('file');
            $csv = Reader::createFromPath($csv->getRealPath(), 'r');
            if($extension == 'csv') {
                $csv->setHeaderOffset(0);
            }

            $rules = [
                'id' => [
                    'required',
                    'unique:lms_teachers'
                ],
                'first_name' => [
                    'required',
                ],
                'last_name' => [
                    'required',
                ],
                'department' => [
                    'required',
                ],
                'program' => [
                    'required',
                ],
                'year_and_sections' => [
                    'required',
                ]
            ];
        
            foreach ($csv as $teacher) {

                $firstTwoCharactersOfLastName = substr($teacher['last_name'], 0, 2);

                $date = Carbon::now()->format('Y');

                $password = '#' . $firstTwoCharactersOfLastName . $date;

                $email = $teacher['id'] . '@lms.bcpsms.com';

                $newteacher = [
                    'id' => $teacher['id'],
                    'first_name' => $teacher['first_name'],
                    'last_name' => $teacher['last_name'],
                    'email' => $email,
                    'password' => Hash::make($password),
                    'department' => $teacher['department'],
                    'program' => $teacher['program'],
                    'year_and_sections' => $teacher['year_and_sections'],
                    'subjects' => '',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];

                $message = [
                    'id.unique' => 'ID :input already exists'
                ];

                $validator = Validator::make($newteacher, $rules, $message);

                if($validator->fails()){
                    $errors[] = $validator->errors();
                } else {
                    $insertTeacher[] = $newteacher;
                    $success[] = $newteacher['email'] . ' - ' . $password;
                }

            }

            $chunks = array_chunk($insertTeacher, 100);

            foreach($chunks as $chunk) {
                Teacher::insert($chunk);
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
            'activity_log' => 'batch created teacher account'
        ]);

        return response()->json([
            'accountSuccessfullyCreatedFor' => $success,
            'errors' => $errors
        ], 201);

    }

    public function createSingleStudent(CreateSingleStudentRequest $request) {
        
        $firstTwoCharactersOfLastName = substr($request['last_name'], 0, 2);

        $date = Carbon::now()->format('Y');

        $password = '#' . $firstTwoCharactersOfLastName . $date;

        $email = $request['id'] . '@lms.bcpsms.com';

        $student = Student::insert([
            'id' => $request['id'],
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'email' => $email,
            'password' => Hash::make($password),
            'year_and_section' => $request['year_and_section'],
            'major' => $request['major'],
            'department' => $request['department'],
            'program' => $request['program'],
            'subjects' => '',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $response = [
            'Account Succesfully Created' => $student
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'created student account'
        ]);

        return response($response, 201);
    }

    public function createSingleAdmin(CreateSingleAdminRequest $request) {

        $firstTwoCharactersOfLastName = substr($request['last_name'], 0, 2);

        $date = Carbon::now()->format('Y');

        $password = '#' . $firstTwoCharactersOfLastName . $date;

        $email = 'admin' . $request['id'] . '@lms.bcpsms.com';

        $admin = Admin::insert([
            'id' => $request['id'],
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'email' => $email,
            'password' => Hash::make($password),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $response = [
            'Account Succesfully Created' => $admin
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'created admin account'
        ]);

        return response($response, 201);

    }

    public function createSingleCourseManager(CreateSingleCourseManagerRequest $request) {
        
        $firstTwoCharactersOfLastName = substr($request['last_name'], 0, 2);

        $date = Carbon::now()->format('Y');

        $password = '#' . $firstTwoCharactersOfLastName . $date;

        $email = 'coursemanager' . $request['id'] . '@lms.bcpsms.com';

        $course_manager = CourseManager::insert([
            'id' => $request['id'],
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'department' => $request['department'],
            'email' => $email,
            'password' => Hash::make($password),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $response = [
            'Account Succesfully Created' => $course_manager
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'created course manager account'
        ]);

        return response($response, 201);

    }

    public function createSingleCourseDeveloper(CreateSingleCourseDeveloperRequest $request) {

        $firstTwoCharactersOfLastName = substr($request['last_name'], 0, 2);

        $date = Carbon::now()->format('Y');

        $password = '#' . $firstTwoCharactersOfLastName . $date;

        $email = 'coursedeveloper' . $request['id'] . '@lms.bcpsms.com';

        $course_developer = CourseDeveloper::insert([
            'id' => $request['id'],
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'department' => $request['department'],
            'subjects' => '',
            'email' => $email,
            'password' => Hash::make($password),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $response = [
            'Account Succesfully Created' => $course_developer
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'created course developer account'
        ]);

        return response($response, 201);

    }

    public function createSingleTeacher(CreateSingleTeacherRequest $request) {

        $firstTwoCharactersOfLastName = substr($request['last_name'], 0, 2);

        $date = Carbon::now()->format('Y');

        $password = '#' . $firstTwoCharactersOfLastName . $date;

        $email = 'teacher' . $request['id'] . '@lms.bcpsms.com';

        $teacher = Teacher::insert([
            'id' => $request['id'],
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'email' => $email,
            'password' => Hash::make($password),
            'department' => $request['department'],
            'program' => $request['program'],
            'year_and_sections' => '',
            'subjects' => '',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $response = [
            'Account Succesfully Created' => $teacher
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'created teacher account'
        ]);

        return response($response, 201);

    }

}
