<?php

namespace App\Http\Controllers\CourseDeveloper;

use App\Models\Modules\Quiz;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CourseDeveloper\QuizRequest;

class CDQuiz extends Controller
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
            ->where('quiz_type', $request['quiz_type'])->get();

        $bool = 'True';

        if($exist == '[]'){
            $bool = 'False';
        }

        if($bool == 'True'){  
            return response(['already exist'], 201);
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
        //
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
        //
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
