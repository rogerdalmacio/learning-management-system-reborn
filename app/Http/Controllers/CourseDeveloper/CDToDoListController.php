<?php

namespace App\Http\Controllers\CourseDeveloper;

use App\Http\Controllers\Controller;
use App\Models\CourseManager\ToDoList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CDToDoListController extends Controller
{

    public function taskList() {

        $user = Auth::user();

        $toDoList = ToDoList::where('course_developer_id', $user->id);

        $response = [
            'To do list' => $toDoList,
        ];

        return response($response, 201);

    }

    

    // patch header
    public function submitTask(Request $request, $id) {
        
        $toDoList = ToDoList::find($id);

    }

}
