<?php

namespace App\Http\Controllers\CoreFunctions;

use App\Http\Controllers\Controller;
use App\Models\Users\CourseDeveloper;
use App\Models\Users\CourseManager;
use App\Models\Users\Student;
use App\Models\Users\Teacher;
use Illuminate\Http\Request;

class ListOfUsersController extends Controller
{
    
    public function students() {

        $students = Student::all();

        $response = [
            'students' => $students
        ];

        return response($response, 200);

    }

    public function teachers() {

        $teachers = Teacher::all();

        $response = [
            'teachers' => $teachers
        ];

        return response($response, 200);

    }

    public function coursemanager() {

        $coursemanager = CourseManager::all();

        $response = [
            'CourseManagers' => $coursemanager
        ];

        return response($response, 200);

    }

    public function coursedeveloper() {

        
        $coursedeveloper = CourseDeveloper::all();

        $response = [
            'CourseDeveloper' => $coursedeveloper
        ];

        return response($response, 200);


    }
    
}
