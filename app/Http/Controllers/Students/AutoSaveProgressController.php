<?php

namespace App\Http\Controllers\Students;

use PDO;
use App\Models\Modules\Quiz;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Students\AutoSaveProgress;
use App\Http\Requests\Student\AutoSaveProgressRequest;
use App\Models\Students\QuizResult;
use Carbon\Carbon;

class AutoSaveProgressController extends Controller
{

    public function fetchProgress() {

        $userId = Auth::user()->id;

        $autoSavedProgress = AutoSaveProgress::where('student_id', $userId)->first();

        // return $autoSavedProgress;

        $startTime = Carbon::parse($autoSavedProgress['start_time']);

        $endTime = Carbon::parse($autoSavedProgress['end_time']);

        if($startTime->diffInMinutes($endTime) > 60) {

            if($autoSavedProgress['snapshot'] === false) {

                $quizresult = QuizResult::find($autoSavedProgress['quiz_result_id']);

                $timeFinished = Carbon::now();

                $timeElapsed = $timeFinished - $autoSavedProgress['start_time'];

                $quizresult->update([
                    'score' => 0,
                    'logs' => $autoSavedProgress['logs'],
                    'time_elapsed' => $timeElapsed
                ]);

                $response = [
                    'Time Elapsed without snapshot, score nulled' => $quizresult
                ];

                return response($response, 204);

            }

            $quizresult = QuizResult::find($autoSavedProgress['quiz_result_id']);

            $quiz = Quiz::find($quizresult->quiz_id);

            $answerKeys = explode("|", $quiz->answers);

            $numberOfItems = count($answerKeys);

            $answers = explode("|", $autoSavedProgress['answers']);

            $wrongItems = array_diff($answers, $answerKeys);
            
            $numberOfWrongItems = count($wrongItems);
            
            $score = $numberOfItems - $numberOfWrongItems;

            $timeFinished = Carbon::now();

            $timeElapsed = $timeFinished->diffInMinutes($autoSavedProgress['start_time']);

            $quizresult->update([
                'score' => $score,
                'logs' => $autoSavedProgress['logs'],
                'snapshot' => $autoSavedProgress['snapshot'],
                'time_elapsed' => $timeElapsed
            ]);

            $response = [
                'time passed! Quiz submitted' => $quizresult
            ];

            return response($response, 201);

        }

        $returnanswer = explode("|", $autoSavedProgress['answers']);

        $response = [
            'request' => $returnanswer
        ];

        return response($response, 200);
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function saveProgress(AutoSaveProgressRequest $request)
    {

        $autoSave = AutoSaveProgress::where('quiz_result_id', $request['quiz_result_id'])->first();

        $autoSave->update([
            'answers' => $request['answers'],
            'logs' => $request['logs'],
            'snapshot' => $request['snapshot'],
        ]);

        $response = [
            'Saved' => $autoSave
        ];

        return response($response, 201);

    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function updateProgress(UpdateProgressRequest $request)
    // {

    // }

}
