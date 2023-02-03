<?php

namespace App\Http\Controllers\Students;

use Illuminate\Http\Request;
use App\Models\Students\QuizResult;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Student\SnapshotRequest;

class SnapshotController extends Controller
{
    
    public function saveSnapshot(SnapshotRequest $request) {

        $quizresult = QuizResult::find($request['quiz_result_id']);

        if($quizresult->snapshot == true) {

            return response('snapshot already exists', 404);

        } 

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
