<?php

namespace App\Http\Controllers\CourseManager;

use Illuminate\Http\Request;
use App\Models\Users\Teacher;
use App\Models\CoreFunctions\Logs;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CMEditSectionController extends Controller
{
    public function editTeacherSection(Request $request, $id)
    {
        $teacher = Teacher::find($id);

        $year_and_sections = explode(",", $teacher->year_and_sections);

        $new_year_and_sections = array_push($year_and_sections, explode(",", $request['year_and_sections']));
        
        $teacher->update([
            'year_and_sections' => $new_year_and_sections
        ]);

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Updated teachers year and sections'
        ]);

        $response = [
            'teacher' => $teacher,
            'message' => 'Year and sections updated successfully'
        ];

        return response($response, 204);
    }
}
