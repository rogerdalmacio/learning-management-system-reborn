<?php

namespace App\Http\Controllers\CoreFunctions;

use Illuminate\Http\Request;
use App\Models\Users\Student;
use App\Models\Users\Teacher;
use App\Models\CoreFunctions\Logs;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AccountManageController extends Controller
{
    
    public function editStudent($id, Request $request) {

        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'year_and_section' => 'required|string',
            'major' => 'sometimes',
            'department' => 'required|string',
            'program' => 'required|string'
        ]);
        
        $student = Student::find($id);
    
        $student->update([
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'year_and_section' => $request['year_and_section'],
            'major' => $request['major'],
            'department' => $request['department'],
            'program' => $request['program']
        ]);

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'editted student information'
        ]);
        
        return response(['Successfully edited'], 201);

    }

    public function editTeacher($id, Request $request) {

        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'year_and_sections' => 'sometimes',
            'department' => 'required|string',
            'program' => 'required|string'
        ]);

        $teacher = Teacher::find($id);

        $teacher->update([
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'year_and_sections' => $request['year_and_sections'],
            'department' => $request['department'],
            'program' => $request['program']
        ]);

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'editted teacher information'
        ]);

        return response(['Successfully edited'], 201);

    }

    public function editCourseManager($id, Request $request) {

        

    }

}
