<?php

namespace App\Http\Controllers\CourseManager;

use App\Models\Modules\Course;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Request;
use App\Models\CourseManager\ContentValidation;
use App\Models\Modules\Module;

class CMToDoListController extends Controller
{

    public function createTodo(Request $request) {

        $request->validate([
            'module_id' => 'required|string' ,
            'status' => 'required|string',
            'comments' => 'required|string',
            'deadline' => 'required|string'
        ]);

        ContentValidation::create([
            'module_id' => $request['module_id'],
            'status' => $request['status'],
            'comments' => $request['comments'],
            'deadline' => $request['deadline'],
            'submitted' => false
        ]);

        $response = [
            'message' => 'To do successfully sent'
        ];

        return response($response, 201);

    }

    public function moduleApproval($id) {

        $module = Module::find($id);

        $module->update([
            'approval' => ! $module->approval
        ]);

        $message = $module->approval ? 'Module approved' : 'Module approval reset';

        $response = [
            'message' => $message
        ];

        return response($response, 204);

    }

    public function toggleCourseApproval($id){

        $course = Course::find($id);

        $course->update([
            'approval' => ! $course->approval
        ]);

        $message = $course->approval ? 'Course approved' : 'Course approval reset';

        $response = [
            'message' => $message
        ];

        return response($response, 204);

    }

}
