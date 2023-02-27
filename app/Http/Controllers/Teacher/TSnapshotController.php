<?php

namespace App\Http\Controllers\Teacher;

use App\Models\Modules\Quiz;
use Illuminate\Http\Request;
use App\Models\Students\QuizResult;
use App\Http\Controllers\Controller;
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

        $directory =  Storage::delete('storage/' . $quiz->quiz_type . '/' . $request['student_id'] . $quiz->quiz_type . $quiz->id . '.jpg');

        $response = [
            'Snapshot accepted',
            $directory
        ];

        return response($response, 204);

    }

    public function rejectSnapshot($id, Request $request) {

        $request->validate([
            'student_id' => 'required|int',
        ]);

        $quiz = QuizResult::find($id);

        Storage::delete('storage/' . $quiz->quiz_type . '/' . $request['student_id'] . $quiz->quiz_type . $quiz->id . '.jpg');

        $quiz->delete();

        $response = [
            'Snapshot rejected'
        ];

        return response($response, 204);

    }

}
