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

    public function batchCheckSnapshot(Request $request) {
        $request->validate([
            'year_and_sections' => 'required',
            'quiz_type' => 'required',
            'week_no' => 'required',
        ]);

        $quizzes = QuizResult::with('student')
            ->where('year_and_sections', $request['year_and_sections'])
            ->where('quiz_type', $request['quiz_type'])
            ->where('week_no', $request['week_no'])
            ->get();

        foreach($quizzes as $quiz) {
            $quiz->update([
                'attempt' => 'recorded'
            ]);

            $path = storage_path('app/public/quiz/' . $quiz->student->id . $quiz->quiz_type . $quiz->id . '.jpg');

            File::delete($path);
    
            $response = [
                'Snapshot accepted'
            ];
    
            Logs::create([
                'user_id' => Auth::user()->id,
                'user_type' => Auth::user()->usertype(),
                'activity_log' => 'Snapshot accepted for quiz - ' . $quiz->quiz_id
            ]);
        }

        return response($response, 200);
    }
    
    public function checkSnapshot(Request $request, int $id) {

        $request->validate([
            'student_id' => 'required|int',
        ]);

        $quiz = QuizResult::find($id);

        $quiz->update([
            'attempt' => 'recorded'
        ]);

        $path = storage_path('app/public/quiz/' . $request['student_id'] . $quiz->quiz_type . $quiz->id . '.jpg');

        File::delete($path);

        $response = [
            'Snapshot accepted'
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Snapshot accepted for quiz - ' . $quiz->quiz_id
        ]);


        return response($response, 200);

    }

    public function rejectSnapshot(Request $request, int $id) {

        $request->validate([
            'student_id' => 'required|int',
        ]);

        $quiz = QuizResult::find($id);

        $path = storage_path('app/public/quiz/' . $request['student_id'] . $quiz->quiz_type . $quiz->id . '.jpg');
        
        $quiz->delete();
        
        File::delete($path);

        $response = [
            'Snapshot rejected'
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Snapshot rejected for quiz - ' . $quiz->quiz_id
        ]);

        return response($response, 200);

    }

}
