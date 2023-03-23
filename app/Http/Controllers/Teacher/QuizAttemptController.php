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
    
    public function deleteAttempt(Request $request) {

        $quizresult = QuizResult::find($request['id']);

        $quizresult->delete();

        $path = storage_path('app/public/quiz/' . $quizresult->student_id . $quizresult->quiz_type . $quizresult->id . '.jpg');

        File::delete($path);
        
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
