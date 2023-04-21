<?php

namespace App\Http\Controllers\Teacher;

use App\Models\Users\Student;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class GradesController extends Controller
{
    public function index() {
        $user = Auth::user();
        $year_and_sections = explode(',', $user->year_and_sections);
        $subjects = explode(',', $user->subjects);

        $students = Student::with('activityresult','quizresult')
            ->whereIn('year_and_section',  $year_and_sections)
            ->whereIn('subjects', $subjects)
            ->get();

        $response = [
            'scores' => $students
        ];

        return response($response, 200);
    }
}
