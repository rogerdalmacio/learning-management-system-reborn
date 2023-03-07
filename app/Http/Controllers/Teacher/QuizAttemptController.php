<?php

namespace App\Http\Controllers\Teacher;

use Illuminate\Http\Request;
use App\Models\Users\Student;
use App\Models\Students\QuizResult;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Models\CoreFunctions\Logs;

class QuizAttemptController extends Controller
{
    
    public function deleteAttempt($id) {

        $quizresult = QuizResult::find($id);

        $quizresult->delete();

        if(file_exists('public/quiz/' . $quizresult->type . '/' .$quizresult->student_id . $quizresult->quiz_type . $quizresult->id . '.jpg')) {

            File::delete($quizresult->student_id . $quizresult->quiz_type . $quizresult->id . '.jpg');

        }
        
        $response = [
            'Attempt deleted successfully'
        ];
        
        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'quiz attempt reset for student - ' . $quizresult->student_id
        ]);


        return response($response, 204);

    }

}
