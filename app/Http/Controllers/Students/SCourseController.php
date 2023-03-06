<?php

namespace App\Http\Controllers\Students;

use Illuminate\Http\Request;
use App\Models\Modules\Course;
use App\Models\Modules\Module;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SCourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $user = Auth::user();

        $subjects = $user->subjects;

        $subjectsarray = explode (",", $subjects);

        $courses =  Module::with(['course' => function ($query) use ($user, $subjectsarray) {
                        $query->whereIn('course_code', $subjectsarray)
                            ->where('department', $user->department);
                    }])->where('status', true)
                        ->get();

        $response = [
            'subjects' => $courses
        ];

        return response($response, 200);
        
    }

    // /**
    //  * Store a newly created resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @return \Illuminate\Http\Response
    //  */
    // public function store(Request $request)
    // {
    //     //
    // }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $course = Course::find($id);

        $response = [
            'Course' => $course
        ];

        return response($response, 200);
    }

    // /**
    //  * Update the specified resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function update(Request $request, $id)
    // {
    //     //
    // }

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
