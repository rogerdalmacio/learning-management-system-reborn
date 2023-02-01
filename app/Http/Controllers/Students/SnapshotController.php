<?php

namespace App\Http\Controllers\Students;

use Illuminate\Http\Request;
use App\Models\Students\QuizResult;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SnapshotController extends Controller
{
    
    public function saveSnapshot(Request $request) {

        $request->validate([
            'quiz_result_id' => 'required',
            'file' => 'sometimes|mimetypes:jpg|max:5000',
            'snapshot' => 'required',
        ]);

        $quizresult = QuizResult::find($request['quiz_result_id']);

        $user = Auth::user();

        $userId = $user->id;

        $quizType = $quizresult->quiz_type;

        $quizId = $quizresult->quiz_id;

        $extension = $request->file('file')->getClientOriginalExtension();

        $newFileName = $userId . $quizType . $quizId . '.' . $extension;

        $newFileLocation = 'public/quiz/' . $quizType;

        $path = $request->file('file')->storeAs(
            $newFileLocation,
            $newFileName
        );

        $quizresult->update([
            'snapshot' => true
        ]);

        $response = [
            'Quiz result updated' => $quizresult,
            'Snapshot' => $path
        ];

        return response($response, 201);

    }

}
