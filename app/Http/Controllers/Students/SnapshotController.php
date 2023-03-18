<?php

namespace App\Http\Controllers\Students;

use Illuminate\Http\Request;
use App\Models\CoreFunctions\Logs;
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

        $newFileLocation = 'public/quiz';

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

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'snapshot captured on quiz = ' . $quizresult->quiz_id . ' on module ' . $quizresult->module_Id
        ]);

        return response($response, 201);

    }

}
