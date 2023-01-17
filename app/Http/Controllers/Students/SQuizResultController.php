<?php

namespace App\Http\Controllers\Students;
use App\Models\Modules\Quiz;
use Illuminate\Http\Request;
use App\Models\Students\QuizResult;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Student\QuizResultRequest;

class QuizResultController extends Controller
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
        $user = Auth::user();

        $quizType = $request['quiz_type'];

        $quizId = $request['quiz_id'];

        $userId = $user->id;

        $extension = $request->file('file')->getClientOriginalExtension();

        $newFileName = $userId . $quizType . $quizId . '.' . $extension;

        $newFileLocation = 'public/quiz/' . $quizType;

        $path = $request->file('file')->storeAs(
            $newFileLocation,
            $newFileName
        );
        
        $quizResult = QuizResult::create($request->all());

        $response = [
            'Activity Result' => $quizResult,
            'Snapshot' => $path
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
    // public function update(Request $request, $id)
    // {
    //     //
    // }

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
