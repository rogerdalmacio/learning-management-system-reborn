<?php

namespace App\Http\Controllers\CourseManager;

use Illuminate\Http\Request;
use App\Models\CoreFunctions\Logs;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Modules\CourseSyllabus;

class CourseSyllabusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response([CourseSyllabus::all()], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required',
            'week1' => 'required',
            'week2' => 'required',
            'week3' => 'required',
            'week4' => 'required',
            'week5' => 'required',
            'week6' => 'required',
            'week7' => 'required',
            'week8' => 'required',
            'week9' => 'required',
            'week10' => 'required',
            'week11' => 'required',
            'week12' => 'required',
            'week13' => 'required',
            'week14' => 'required',
            'week15' => 'required',
            'week16' => 'required',
            'week17' => 'required',
            'week18' => 'required',
            'week19' => 'sometimes|nullable',
            'week20' => 'sometimes|nullable',
            'week21' => 'sometimes|nullable',
            'week22' => 'sometimes|nullable',
            'week23' => 'sometimes|nullable',
            'week24' => 'sometimes|nullable',
        ]);

        $data = CourseSyllabus::create([
            'course_id' => $request['course_id'],
            'week1' => $request['week1'],
            'week2' => $request['week2'],
            'week3' => $request['week3'],
            'week4' => $request['week4'],
            'week5' => $request['week5'],
            'week6' => $request['week6'],
            'week7' => $request['week7'],
            'week8' => $request['week8'],
            'week9' => $request['week9'],
            'week10' => $request['week10'],
            'week11' => $request['week11'],
            'week12' => $request['week12'],
            'week13' => $request['week13'],
            'week14' => $request['week14'],
            'week15' => $request['week15'],
            'week16' => $request['week16'],
            'week17' => $request['week17'],
            'week18' => $request['week18'],
        ]); 

        $response = [
            'Syllabus' => $data,
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Added syllabus for course id: ' . $request['course_id'], 
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
        return response([CourseSyllabus::find($id)], 200);
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
            'week1' => 'required',
            'week2' => 'required',
            'week3' => 'required',
            'week4' => 'required',
            'week5' => 'required',
            'week6' => 'required',
            'week7' => 'required',
            'week8' => 'required',
            'week9' => 'required',
            'week10' => 'required',
            'week11' => 'required',
            'week12' => 'required',
            'week13' => 'required',
            'week14' => 'required',
            'week15' => 'required',
            'week16' => 'required',
            'week17' => 'required',
            'week18' => 'required',
            'week19' => 'sometimes|nullable',
            'week20' => 'sometimes|nullable',
            'week21' => 'sometimes|nullable',
            'week22' => 'sometimes|nullable',
            'week23' => 'sometimes|nullable',
            'week24' => 'sometimes|nullable',
        ]);

        $syllabus = CourseSyllabus::find($id);

        $syllabus->update($request->all());

        $response = [
            'Syllabus' => $syllabus,
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Updated syllabus for course id: ' . $request['course_id'], 
        ]);

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
