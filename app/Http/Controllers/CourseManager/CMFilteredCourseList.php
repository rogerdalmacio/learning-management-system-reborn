<?php

namespace App\Http\Controllers\CourseManager;

use Illuminate\Http\Request;
use App\Models\Modules\Course;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Users\CourseDeveloper;

class CMFilteredCourseList extends Controller
{
    
    public function index() {

        $user = Auth::user();

        $department = $user->department;

        $coursesFromCourseDevelopers = [];

        $courseDevelopers = CourseDeveloper::where('department', $user->department)->get();

        foreach($courseDevelopers as $courseDeveloper) {
            $coursesFromCourseDevelopers[] = $courseDeveloper['subjects'];
        }

        $query = Course::with('module')->where('department', $department)->whereNotIn('course_code', $coursesFromCourseDevelopers)->get();

        $response = [
            'Course' => $query
        ];

        return response($response, 200);

    }

}
