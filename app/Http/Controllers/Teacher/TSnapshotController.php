<?php

namespace App\Http\Controllers\Teacher;

use App\Models\Modules\Quiz;
use Illuminate\Http\Request;
use App\Models\CoreFunctions\Logs;
use App\Models\Students\QuizResult;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class TSnapshotController extends Controller
{

    public function checkSnapshot($id, Request $request) {

        $request->validate([
            'student_id' => 'required|int',

        ]);

        $quiz = QuizResult::find($id);

        $quiz->update([
            'attempt' => 'recorded'
        ]);

        $directory =  File::delete('storage/quiz/' . $quiz->quiz_type . '/' . $request['student_id'] . $quiz->quiz_type . $quiz->id . '.jpg');

        $response = [
            'Snapshot accepted',
            $directory
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Snapshot accepted for quiz - ' . $quiz->quiz_id
        ]);


        return response($response, 204);

    }

    public function rejectSnapshot($id, Request $request) {

        $request->validate([
            'student_id' => 'required|int',
        ]);

        $quiz = QuizResult::find($id);

        File::delete('storage/quiz/' . $quiz->quiz_type . '/' . $request['student_id'] . $quiz->quiz_type . $quiz->id . '.jpg');

        $quiz->delete();

        $response = [
            'Snapshot rejected'
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Snapshot rejected for quiz - ' . $quiz->quiz_id
        ]);

        return response($response, 204);

    }

}
