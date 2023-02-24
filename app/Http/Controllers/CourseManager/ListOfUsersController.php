<?php

namespace App\Http\Controllers\CourseManager;

use App\Http\Controllers\Controller;
use App\Models\Users\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ListOfUsersController extends Controller
{
    
    public function student() {

        $students = Student::where('department', Auth::user()->department)->get();

        $response = [
            'students' => $students
        ];

        return response($response, 200);

    }

}
