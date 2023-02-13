<?php

namespace App\Http\Controllers\CMCourseDeveloper;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Users\CourseDeveloper;

class CMCourseDeveloper extends Controller
{
    
    public function index() {

        $user = Auth::user();

        $courseDevelopers = CourseDeveloper::where(['depeartment', $user->department])->where(['subjects'], '')->get();

        $response = [
            'CourseDevelopers' => $courseDevelopers
        ];

        return response($response, 200);

    }

}
