<?php

namespace App\Http\Controllers\Students;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Students\AutoSaveProgress;
use App\Http\Requests\Student\AutoSaveProgressRequest;
use Illuminate\Support\Facades\Auth;

class AutoSaveProgressController extends Controller
{

    public function fetchProgress(Request $request) {

        $userId = Auth::user()->id;

        $quizType = $request['quiz_type'];
        $quizId = $request['quiz_id'];

        $autoSavedProgress = AutoSaveProgress::where('student_id', $userId)
                            ->where('quiz_id', $quizId)
                            ->where('quiz_type', $quizType)
                            ->get();

        $response = [
            'progress' => $autoSavedProgress
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
    public function updateProgress(Request $request)
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
