<?php

namespace App\Http\Controllers\Students;
use Carbon\Carbon;
use App\Models\Modules\Quiz;
use Illuminate\Http\Request;
use App\Models\Students\QuizResult;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Student\QuizResultRequest;

class SQuizResultController extends Controller
{
        //  /**
    //  * Display a listing of the resource.
    //  *
    //  * @return \Illuminate\Http\Response
    //  */
    // public function index()
    // {
        
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(QuizResultRequest $request)
    {
        
        $quizResult = QuizResult::create([
            'student_id' => $request['student_id'],
            'quiz_id' => $request['quiz_id'],
            'module_id' => $request['module_id'],
            'preliminaries' => $request['preliminaries'],
            'quiz_type' => $request['quiz_type'],
            'attempt' => $request['attempt'],
            'score' => null,
            'logs' => $request['logs'],
            'snapshot' => $request['snapshot'],
            'start_time' =>  Carbon::now(),
            'end_time' => Carbon::now()->addHour(),
            'time_elapsed' => null
        ]);

        $response = [
            'quiz result' => $quizResult,
            // 'Snapshot' => $path
        ];

        return response($response, 201);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $quizResult = QuizResult::find($id);

        $response = [
            'Quiz Result' => $quizResult
        ];

        return response($response, 200);

    }

    // /**
    //  * Update the specified resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    public function update(Request $request, $id)
    {

        $request->validate([
            'answers' => 'required',
            'logs' => 'sometimes',
        ]);

        $quizresult = QuizResult::find($id);

        $quiz = Quiz::find($quizresult->quiz_id);

        $answerKeys = explode("|", $quiz->answers);

        $numberOfItems = count($answerKeys);

        $answers = explode("|", $request['answers']);

        $wrongItems = array_diff($answers, $answerKeys);
        
        $numberOfWrongItems = count($wrongItems);
        
        $score = $numberOfItems - $numberOfWrongItems;

        $timeFinished = Carbon::now();

        $startTime = $quizresult->start_time;

        $timeElapsed = $timeFinished - $startTime;

        $quizresult->update([
            'score' => $score,
            'logs' => $request['logs'],
            'time_elapsed' => $timeElapsed
        ]);

        $response = [
            'Quiz Result' => $quizresult,
        ];

        return response($response, 201);

    }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function destroy($id)
    // {
    //     //
    // }
}
