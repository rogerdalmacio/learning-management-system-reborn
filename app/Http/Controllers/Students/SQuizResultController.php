<?php

namespace App\Http\Controllers\Students;
use Carbon\Carbon;
use App\Models\Modules\Quiz;
use Illuminate\Http\Request;
use App\Models\CoreFunctions\Logs;
use App\Models\Students\QuizResult;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Students\AutoSaveProgress;
use App\Http\Requests\Student\QuizResultRequest;

class SQuizResultController extends Controller
{

    // custom function 

    public function getQuizResultId(Request $request) {

        $request->validate([
            'quiz_id' => 'required'
        ]);

        $quizResult = QuizResult::where('student_id', Auth::user()->id)
                        ->where('quiz_id', $request['quiz_id'])
                        ->get();

        $response = [
            $quizResult
        ];

        return response($response, 200);

    }

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

        $exists = QuizResult::where('student_id', Auth::user()->id)
                    ->where('quiz_id', $request['quiz_id'])
                    ->get();

        if($exists->count() > 0) {

            return response('quiz attempted', 404);

        }
        
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

        $autoSaveProgress = AutoSaveProgress::create([
            'student_id' => Auth::user()->id,
            'quiz_result_id' => $quizResult->id,
            'quiz_id' => $quizResult->quiz_id,
            'answers' => $request['answers'],
            'logs' => $request['logs'],
            'snapshot' => $request['snapshot'],
            'start_time' => $quizResult->start_time,
            'end_time' => $quizResult->end_time,
        ]);

        $response = [
            'quiz_result' => $quizResult,
            'auto_save' => $autoSaveProgress
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
            'attempt' => 'required',
            'answers' => 'required',
            'logs' => 'sometimes',
        ]);

        // check if user have pending quiz to be finished

        $user = Auth::user();

        $exists = QuizResult::where('student_id', $user->id)
                    ->where('attempt', 'on progress')
                    ->get();

        if($exists->count() > 0) {

            $response = [
                'You have a pending quiz'
            ];

            return response($response, 404);

        }


        // process quiz information

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

        $timeElapsed = $timeFinished->diffInMinutes($startTime);

        $autoSave = AutoSaveProgress::where('quiz_result_id', $quizresult->id)->first();

        $autoSave->delete();

        $quizresult->update([
            'score' => $score,
            'percentage' => $score / $numberOfItems * 100,
            'logs' => $quizresult->logs ? $quizresult->logs . ',' . $request['logs'] : $request['logs'],
            'time_elapsed' => $timeElapsed,
            'attempt' => $request['attempt']
        ]);

        $response = [
            'Quiz Result' => $quizresult,
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Quiz submitted on quiz = ' . $quizresult->quiz_id . ' on module ' . $quizresult->module_Id
        ]);

        return response($response, 201) ;

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