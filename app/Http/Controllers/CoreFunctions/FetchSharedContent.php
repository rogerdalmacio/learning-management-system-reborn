<?php

namespace App\Http\Controllers\CoreFunctions;

use App\Models\Modules\Quiz;
use Illuminate\Http\Request;
use App\Models\Modules\Course;
use App\Models\Modules\Lesson;
use App\Models\Modules\Module;
use App\Models\Modules\Activity;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class FetchSharedContent extends Controller
{
    
    public function courses()
    {
        $user = Auth::user();

        if($user->user_type() == 'Admin') {
            $courses = Course::with('module')->get();
            $response = [
                'Courses' => $courses
            ];

            return response()->json($response, 200);
        }

        $courses = Course::with('module')
                ->where('department', $user->department)
                ->get();

        $response = [
            'Courses' => $courses
        ];

        return response()->json($response, 200);
    }

    public function modules(int $id)
    {
        $module = Module::with('activity','lesson','quiz')
                ->find($id);
        $response = [
            'Modules' => $module
        ];

        return response()->json($response, 200);
    }

    public function activity(int $id)
    {
        $activity = Activity::find($id);

        $response = [
            'Activity' => $activity
        ];

        return response()->json($response, 200);
    }

    public function lesson(int $id)
    {
        $lesson = Lesson::find($id);

        $response = [
            'Lesson' => $lesson
        ];

        return response()->json($response, 200);
    }

    public function quiz(int $id)
    {
        $quiz = Quiz::find($id);

        $response = [
            'Quiz' => $quiz
        ];

        return response()->json($response, 200);
    }
}
