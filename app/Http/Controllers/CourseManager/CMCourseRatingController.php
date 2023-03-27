<?php

namespace App\Http\Controllers\CourseManager;

use App\Models\CourseRating;
use Illuminate\Http\Request;
use App\Models\CoreFunctions\Logs;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CMCourseRatingController extends Controller
{
    public function rating(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id|unique:course_ratings,course_id',
            'comprehensiveness' => 'required',
            'accuracy' => 'required',
            'readability' => 'required',
            'complete' => 'required',
        ]);

        $courserating = CourseRating::create($request->all());

        $response = [
            'Rating' => $courserating
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Added Ratings for course ' . $courserating->course_id,
        ]);

        return response($response, 201);
    }

    public function editRating(Request $request, $id)
    {
        $request->validate([
            'comprehensiveness' => 'required',
            'accuracy' => 'required',
            'readability' => 'required',
            'complete' => 'required',
        ]);

        $courserating = CourseRating::find($id);

        $courserating->update($request->all());

        $response = [
            'Rating' => $courserating
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Updated Ratings for course ' . $courserating->course_id,
        ]);

        return response($response, 204);
    }
}
