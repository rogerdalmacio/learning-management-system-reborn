<?php

namespace App\Http\Controllers\CourseManager;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Users\CourseDeveloper;

class CMCourseDeveloper extends Controller
{
    
    public function index() {

        $user = Auth::user();

        $courseDevelopers = CourseDeveloper::where('department', $user->department)->where('subjects', '')->get();

        $response = [
            'CourseDevelopers' => $courseDevelopers
        ];

        return response($response, 200);

    }

}
