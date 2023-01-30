<?php

namespace App\Http\Controllers\Students;

use Illuminate\Http\Request;
use App\Models\Modules\Course;
use App\Http\Controllers\Controller;
use App\Models\Modules\Lesson;
use Illuminate\Support\Facades\Auth;

class SLessonController extends Controller
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

        $courses = Course::with('lesson')->whereIn('course_code', $subjectsarray)->where('department', $user->department)->get();
        
        $response = [
            'Lessons' => $courses,
            'test'
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

        $lesson = Lesson::find($id);

        $response = [
            'Lesson' => $lesson
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
