<?php

namespace App\Http\Controllers\CourseDeveloper;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CourseDeveloper\LessonRequest;
use App\Models\Modules\Lesson;

class CDLessonController extends Controller
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

        if($exist->count() > 0){
            return response(['already exist'], 204);
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
        $query = Lesson::where('id', $id)->get();

        $response = [
            'Lesson' => $query
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
            'preliminaries' => 'sometimes',
            'title' => 'sometimes',
            'body' => 'sometimes',
            'embed_links' => 'sometimes',
        ]);
        
        $lesson = Lesson::find($id);

        $lesson->update([$request->all()]);

        $response = [
            'Lesson updated' => $lesson
        ];

        return response($response, 204);
        
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
