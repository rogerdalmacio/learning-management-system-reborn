<?php

namespace App\Http\Controllers\Teacher;

use Illuminate\Http\Request;
use App\Models\Users\Student;
use App\Http\Controllers\Controller;

class ListOfStudentController extends Controller
{
    
    public function listOfStudents(Request $request) {

        $request->validate([
            'year_and_section' => 'required',
            'department' => 'required',
            'program' => 'required',
            'major' => 'required'
        ]);

        $students = $students = Student::with('activityresult','quizresult')
                    ->where('year_and_section', $request['year_and_section'])
                    ->where('department', $request['department'])
                    ->where('program', $request['program'])
                    ->where('major', $request['major'])
                    ->orderBy('last_name')
                    ->get();

        $response = [
            'students' => $students
        ];

        return response($response, 200);

    }

}
