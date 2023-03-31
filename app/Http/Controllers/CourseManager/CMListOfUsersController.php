<?php

namespace App\Http\Controllers\CourseManager;

use Illuminate\Http\Request;
use App\Models\Users\Student;
use App\Models\Users\Teacher;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CMListOfUsersController extends Controller
{
    
    public function student() {

        $students = Student::where('department', Auth::user()->department)->get();

        $response = [
            'students' => $students
        ];

        return response($response, 200);

    }

    public function teacher() {

        $teacher = Teacher::where('department', Auth::user()->department)->get();

        $response = [
            'students' => $teacher
        ];

        return response($response, 200);

    }

}
