<?php

namespace App\Http\Controllers\Students;

use Illuminate\Http\Request;
use App\Models\Users\Student;
use App\Models\Modules\Course;
use App\Http\Controllers\Controller;
use App\Models\CoreFunctions\ExaminationGrant;
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

        $courses = Course::with('module')
                            ->whereIn('course_code', $subjectsarray)
                            ->whereNot('approval', 0)
                            ->where('department', $user->department)
                            ->whereHas('module', function ($query) {
                                $query->where('status', true);
                            })
                            ->get();

        $examgrant = ExaminationGrant::where('student_id', $user->id)->get();

        $response = [
            'subjects' => $courses,
            'grant' => $examgrant,
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
