<?php

namespace App\Http\Controllers\CourseManager;

use Illuminate\Http\Request;
use App\Models\Modules\Course;
use App\Models\Modules\Module;
use App\Models\CoreFunctions\Logs;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Users\CourseDeveloper;
use App\Http\Requests\CourseManager\CourseRequest;

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

        $query = Course::with('module')->where('department', $department)->get();

        $response = [
            'Course' => $query
        ];

        return response($response, 200);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CourseRequest $request)
    {

        DB::beginTransaction();

        try {

        $exist = Course::where('course', $request['course'])
                ->where('department', $request['department'])
                ->get();

        if($exist->count() > 0){
            return response(['already exist'], 201);
        }

        $course = Course::create([
            'course' => $request['course'],
            'course_code' => $request['course_code'],
            'department' => $request['department'],
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
                'title' => '',
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

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Created ' . $course->course
        ]);

        DB::commit();
        return response($response, 201);

        } catch (\Exception $e) {
            DB::rollback();

            $response = [
                'errors' => $e,
            ];
            
            return response($response, 404);
        }

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

        $request->validate([
            'course' => 'sometimes|string',
            'course_code' => 'sometimes|string',
            'department' => 'sometimes|string',
            'approval' => 'sometimes|boolean',
            'modules' => 'sometimes|integer'
        ]);
        
        $course = Course::find($id);

        $course->update([$request->all()]);

        $response = [
            'Course updated' => $course
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Editted ' . $course->course
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

        $course = Course::find($id);

        $response = [
            'Course Successfully deleted' => $course->course 
        ];
        
        $course->lesson()->delete();
        $course->activity()->delete();
        $course->quiz()->delete();
        $course->module()->delete();
        $course->delete();

        return response($response, 204);
    }
}