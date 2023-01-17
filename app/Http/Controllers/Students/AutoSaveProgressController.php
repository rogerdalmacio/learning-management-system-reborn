<?php

namespace App\Http\Controllers\Students;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Students\AutoSaveProgress;
use App\Http\Requests\Student\AutoSaveProgressRequest;

class AutoSaveProgressController extends Controller
{
        // /**
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
    public function store(AutoSaveProgressRequest $request)
    {
        
        $autoSave = AutoSaveProgress::create($request->all());

        $response = [
            'Saved' => $autoSave
        ];

        return response($response, 201);

    }

    // /**
    //  * Display the specified resource.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function show($id)
    // {

    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
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
