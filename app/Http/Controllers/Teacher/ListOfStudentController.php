<?php

namespace App\Http\Controllers\Teacher;

use Illuminate\Http\Request;
use App\Models\Users\Student;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ListOfStudentController extends Controller
{
    
    public function listOfStudents() {

        $user = Auth::user();

        $students = $students = Student::with('activityresult','quizresult')
<<<<<<< Updated upstream
                    ->whereIn('year_and_section', explode(",", $user->year_and_sections))
=======
                    ->whereIn('year_and_section', $user->year_and_sections)
>>>>>>> Stashed changes
                    ->where('department', $user->department)
                    ->where('program', $user->program)
                    // ->where('major', $user->major)
                    ->orderBy('year_and_section')
                    ->get();

        $response = [
            'students' => $students
        ];

        return response($response, 200);

    }

}
