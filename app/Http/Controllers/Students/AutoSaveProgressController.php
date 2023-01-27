<?php

namespace App\Http\Controllers\Students;

use PDO;
use App\Models\Modules\Quiz;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Students\AutoSaveProgress;
use App\Http\Requests\Student\UpdateProgressRequest;
use App\Http\Requests\Student\AutoSaveProgressRequest;
use App\Models\Students\QuizResult;

class AutoSaveProgressController extends Controller
{

    public function fetchProgress() {

        $userId = Auth::user()->id;

        $autoSavedProgress = AutoSaveProgress::where('student_id', $userId)->get();

        foreach($autoSavedProgress as $progress){

            if($progress['start_time'] >= $progress['end_time']) {

                $startTime = $progress['start_time'];

                $endTime = $progress['end_time'];
        
                $timeFinished = $progress['time_finished'];

                $timeElapsed = $endTime - $timeFinished;

                $quiz = Quiz::find($progress['id']);

                $answerKeys = explode("|", $quiz->answers);

                $numberOfItems = count($answerKeys);
                
                $answers = explode("|", $progress->answers);

                $wrongAnswers = array_diff($answers, $answerKeys);

                $numberOfWrongItems = count($wrongAnswers);

                $score = $numberOfItems - $numberOfWrongItems;
                
                $quizResult = QuizResult::create([
                    'student_id' => $progress['student_id'],
                    'quiz_id' => $progress['quiz_id'],
                    'module_id' => $progress['module_id'],
                    'preliminaries' => $progress['preliminaries'],
                    'quiz_type' => $progress['quiz_type'],
                    'attempt' => $progress['attempt'],
                    'score' => $score,
                    'logs' => $progress['logs'],
                    'snapshot' => $progress['snapshot'],
                    'time_elapsed' => $timeElapsed
                ]);

                $response = [
                    'quiz submitted' => $quizResult
                ];

                return response($response, 201);

            }

        }

        $sorted = $autoSavedProgress->sortBy('start_time');

        $response = [
            'progress' => $sorted
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

        $autoSave = AutoSaveProgress::create($request->all());

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
    public function updateProgress(UpdateProgressRequest $request)
    {

        $autoSave = AutoSaveProgress::where([
            'student_id' == $request['student_id'],
            'quiz_id' == $request['quiz_id'],
            'module_id' == $request['module_id'] 
        ]);

        $autoSave->update([$request->all()]);

        $response = [
            'Saved' => $autoSave
        ];

        return response($response, 201);


    }

}
