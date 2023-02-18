<?php

namespace App\Http\Controllers\CoreFunctions;

use Carbon\Carbon;
use League\Csv\Reader;
use App\Models\Users\Admin;
use App\Models\Users\Student;
use App\Models\Users\CourseManager;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
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
use App\Models\Users\Teacher;

class AccountCreationController extends Controller
{
    public function batchCreateStudents(BatchCreateStudentRequest $request)
    {
        
        try {

            $success = [];
            $insertStudents = [];
            $errors = [];

            $csv = $request->file('file');
            $csv = Reader::createFromPath($csv->getRealPath(), 'r');
            $csv->setHeaderOffset(0);

            $rules = [
                'id' => [
                    'required',
                    'unique:students'
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
                    'required',
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

        return response()->json([
            'account successfully created for' => $success,
            'errors' => $errors
        ], 201);

    }

    public function batchCreateTeachers(BatchCreateTeachersRequest $request) {

        try {

            $success = [];
            $insertTeacher = [];
            $errors = [];

            $csv = $request->file('file');
            $csv = Reader::createFromPath($csv->getRealPath(), 'r');
            $csv->setHeaderOffset(0);

            $rules = [
                'id' => [
                    'required',
                    'unique:teachers'
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

        return response()->json([
            'account successfully created for' => $success,
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
            'password' => $password,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $response = [
            'Account Succesfully Created' => $admin
        ];

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
            'password' => $password,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $response = [
            'Account Succesfully Created' => $course_manager
        ];

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
            'password' => $password,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $response = [
            'Account Succesfully Created' => $course_developer
        ];

        return response($response, 201);

    }

    public function createSingleTeacher(CreateSingleTeacherRequest $request) {

        $firstTwoCharactersOfLastName = substr($request['last_name'], 0, 2);

        $date = Carbon::now()->format('Y');

        $password = '#' . $firstTwoCharactersOfLastName . $date;

        $email = 'teacher' . $request['id'] . '@lms.bcpsms.com';

        $teacher = CourseDeveloper::insert([
            'id' => $request['id'],
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'email' => $email,
            'password' => $password,
            'department' => $request['department'],
            'program' => $request['program'],
            'year_and_section' => '',
            'subjects' => '',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $response = [
            'Account Succesfully Created' => $teacher
        ];

        return response($response, 201);

    }

}
