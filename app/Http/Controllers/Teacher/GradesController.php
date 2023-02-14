<?php

namespace App\Http\Controllers\Teacher;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Teacher\ComputeGradesRequest;
use App\Models\Modules\Activity;
use App\Models\Users\Student;

class GradesController extends Controller
{
    
    public function computeGrades(ComputeGradesRequest $request) {

        $students = Student::with('activityresult','quizresult')
                    ->where('year_and_section', $request['year_and_section'])
                    ->where('department', $request['department'])
                    ->where('program', $request['program'])
                    ->where('major', $request['major'])
                    ->where('activity_results.preliminaries', $request['preliminaries'])
                    ->where('quiz_results.preliminaries', $request['preliminaries'])
                    ->get();

        foreach($students as $student) {

            $activity = [];
            $quiz = [];
            
            $data = [
                'Activity' => $activity,
                'Quiz' => $quiz,
                'Exam' => $student['exam']['score']
            ];

            echo "$data";

        }

    }

}
