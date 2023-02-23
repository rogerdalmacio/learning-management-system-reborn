<?php

namespace App\Http\Controllers\CoreFunctions;

use App\Http\Controllers\Controller;
use App\Models\Users\Student;
use App\Models\Users\Teacher;
use Illuminate\Http\Request;

class AccountManageController extends Controller
{
    
    public function editStudent($id, Request $request) {

        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'year_and_section' => 'required|string',
            'major' => 'required|string',
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

        return response(['Successfully edited'], 201);

    }

    public function editTeacher($id, Request $request) {

        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'year_and_sections' => 'required|string',
            'major' => 'required|string',
            'department' => 'required|string',
            'program' => 'required|string'
        ]);

        $teacher = Teacher::find($id);

        $teacher->update([
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'year_and_sections' => $request['year_and_section'],
            'major' => $request['major'],
            'department' => $request['department'],
            'program' => $request['program']
        ]);

        return response(['Successfully edited'], 201);

    }

    public function editCourseManager($id, Request $request) {

        

    }

}
