<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Modules\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TCourseController extends Controller
{
    
    public function index() {

        $user = Auth::user();

        $subjectsarray = $user->subjects;

        $courses = Course::whereIn('course_code', $subjectsarray)->where('department', $user->department)->get();

        $response = [ 
            'subjects' => $courses 
        ];

        return response($response, 200);

    }

}
