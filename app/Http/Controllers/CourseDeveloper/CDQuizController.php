<?php

namespace App\Http\Controllers\CourseDeveloper;

use App\Models\Modules\Quiz;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CourseDeveloper\QuizRequest;

class CDQuizController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(QuizRequest $request)
    {

        $exist = Quiz::where('module_id', $request['module_id'])
                ->where('quiz_type', $request['quiz_type'])
                ->get();


        if($exist->count() > 0){
            return response(['already exist'], 409);
        }

        Quiz::create($request->all());

        $response = [
            'Successfuly created' => $request['module_id'],
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

        $query = Quiz::where('id', $id)->get();

        $response = [
            'Quiz' => $query
        ];

        return response($response, 200);
         
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $request->validate([
            'questions' => 'sometimes',
            'answers'  => 'sometimes',
            'options'  => 'sometimes',
        ]);
        
        $quiz = Quiz::find($id);

        $quiz->update($request->all());

        $response = [
            'Quiz Successfully updated' => $quiz
        ];

        return response($response, 201);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    
}
