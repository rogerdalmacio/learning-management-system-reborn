<?php

namespace App\Http\Controllers\CourseDeveloper;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CourseDeveloper\LessonRequest;
use App\Models\Modules\Lesson;

class CDLesson extends Controller
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
    public function store(LessonRequest $request)
    {

        $exist = Lesson::where('module_id', $request['module_id'])->get();

        $bool = 'True';

        if($exist == '[]'){
            $bool = 'False';
        }

        if($bool == 'True'){  
            return response(['already exist'], 201);
        }

        Lesson::create($request->all());

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
