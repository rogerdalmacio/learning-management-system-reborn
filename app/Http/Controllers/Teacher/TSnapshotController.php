<?php

namespace App\Http\Controllers\Teacher;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Modules\Quiz;
use App\Models\Students\QuizResult;
use Illuminate\Support\Facades\File;

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

        File::delete('storage/quiz/' . $quiz->quiz_type . '/' . $request['student_id'] . $quiz->quiz_type . $quiz->id . '.jpg');

        $response = [
            'Snapshot accepted'
        ];

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

        return response($response, 204);

    }

}
