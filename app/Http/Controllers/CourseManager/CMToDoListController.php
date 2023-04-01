<?php

namespace App\Http\Controllers\CourseManager;

use Illuminate\Http\Request;
use App\Models\Modules\Course;
use App\Models\Modules\Module;
use App\Models\CoreFunctions\Logs;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\CourseManager\ContentValidation;

class CMToDoListController extends Controller
{
    public function createTodo(Request $request) {

        $request->validate([
            'module_id' => 'required|string' ,
            'status' => 'required|string',
            'comments' => 'required|string',
        ]);

        $contentvalidation = ContentValidation::create([
            'module_id' => $request['module_id'],
            'status' => $request['status'],
            'comments' => $request['comments'],
            'submitted' => false
        ]);

        $response = [
            'message' => 'To do successfully sent'
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Created to do for ' . $contentvalidation->module_id
        ]);
        
        return response($response, 201);
    }

    public function updateTodo(Request $request, $id) {

        $request->validate([
            'comments' => 'required'
        ]);

        $todo = ContentValidation::find($id);

        $todo->update([
            'comments' => $request['comments'],
            'submitted' => false,
        ]);

        $response = [
            'message' => 'To do successfully sent'
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Created to do for ' . 
            $todo->module_id
        ]);

        return response($response, 204);
    }

    public function acceptTodo(Request $request, $id) {

        $request->validate([
            'status' => 'required'
        ]);

        $module = Module::find($id);

        $module->update([
            'status' => true
        ]);

        $todo = ContentValidation::where('module_id', $id)->first();

        if($todo) {
            $todo->update([
                'status' => $request['status']
            ]);
        }

        $response = [
            'message' => 'Todo accepted successfully'
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Accepted to do for ' . $id
        ]);

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

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => $message
        ]);

        return response($response, 204);
    }
}
