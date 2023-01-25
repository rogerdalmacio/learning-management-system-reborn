<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Students\QuizResult;
use App\Models\Users\Student;
use Illuminate\Http\Request;

class QuizAttemptController extends Controller
{
    
    public function deleteAttempt(Request $request) {

        $request->validate([
            'student_id' => 'required',
            'quiz_id' => 'required',
            'quiz_type' => 'required'
        ]);

        $attempt = QuizResult::where('student_id', $request['student_id'])
                    ->where('quiz_id', $request['quiz_id'])
                    ->where('quiz_type', $request['quiz_type'])
                    ->get();

        $attempt->delete();
        
        $response = [
            'Attempt deleted successfully'
        ];

        return response($response, 204);

    }

}
