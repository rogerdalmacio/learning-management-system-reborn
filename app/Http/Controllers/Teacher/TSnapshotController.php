<?php

namespace App\Http\Controllers\Teacher;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Modules\Quiz;
use Illuminate\Support\Facades\File;

class TSnapshotController extends Controller
{

    public function checkSnapshot($id, Request $request) {

        $request->validate([
            'student_id' => 'required|int',

        ]);

        $quiz = Quiz::find($id);

        $quiz->update([
            'attempt' => 'recorded'
        ]);

        File::delete($request['student_id'] . $quiz->quiz_type . $quiz->id . '.jpg');

        $response = [
            'Snapshot accepted'
        ];

        return response($response, 204);

    }

    public function rejectSnapshot($id, Request $request) {

        $request->validate([
            'student_id' => 'required|int',
        ]);

        $quiz = Quiz::find($id);

        File::delete($request['student_id'] . $quiz->quiz_type . $quiz->id . '.jpg');

        $quiz->delete();

        $response = [
            'Snapshot rejected'
        ];

        return response($response, 204);

    }

}
