<?php

namespace App\Http\Controllers\CourseManager;

use Illuminate\Http\Request;
use App\Models\Modules\Course;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CourseManager\CourseRequest;
use App\Models\Modules\Module;

class CMCourseController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $user = Auth::user();

        $department = $user->department;
        
        $query = Course::where('departments', $department)->get();

        $response = [
            'Course' => $query
        ];

        return response($response, 201);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CourseRequest $request)
    {

        $exist = Course::where([
            ['course', '=', $request['course']],
            ['departments', '=', $request['departments']] 
        ])->get();

        $bool = 'True';

        if($exist == '[]'){
            $bool = 'False';
        }

        if($bool == 'True'){  
            return response(['already exist'], 201);
        }

        $course = Course::create([
            'course' => $request['course'],
            'course_code' => $request['course_code'],
            'departments' => $request['departments'],
            'approval' => $request['approval']
        ]);



        $moduleCount = $request['modules'];
        $moduleWeek = 1;
        $moduleCreated = [];

        for($i = 0; $i < $moduleCount; $i++) {
            $moduleId = $course['course_code'] . '-' . $moduleWeek;

            $module = Module::create([
                'id' => $moduleId,
                'course_id' => $course['id'],
                'week' => $moduleWeek,
                'status' => 0,
            ]);

            $moduleWeek++;
            $moduleCreated[] = $module;
        }

        $response = [
            'Course Succesfully created' => $course,
            'Modules created' => $moduleCreated
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
