<?php

namespace App\Http\Controllers\CourseDeveloper;

use Illuminate\Http\Request;
use App\Models\Modules\Lesson;
use App\Models\CoreFunctions\Logs;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CourseDeveloper\LessonRequest;

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
            return response(['already exist'], 409);
        }

        $lesson = Lesson::create($request->all());

        $response = [
            'Successfuly created' => $request['module_id'],
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Created lesson for module' .  $lesson->module_id
        ]);

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
            'title' => 'sometimes',
            'embed_links' => 'sometimes',
        ]);
        
        $lesson = Lesson::find($id);

        $lesson->update($request->all());

        $response = [
            'Lesson updated' => $lesson
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Editted lesson for module' .  $lesson->module_id
        ]);

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