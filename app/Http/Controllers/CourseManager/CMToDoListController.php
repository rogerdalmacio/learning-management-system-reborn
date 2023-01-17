<?php

namespace App\Http\Controllers\CourseManager;

use App\Http\Controllers\Controller;
use App\Models\CourseManager\ToDoList;
use Illuminate\Support\Facades\Request;

class ToDoListController extends Controller
{

    public function taskList() {     

        $toDoList = ToDoList::all();
        
        $response = [
            'To do list' => $toDoList 
        ];

        return response($response, 201);

    }
    
    public function createTask(Request $request) {   

        ToDoList::create($request->all());

        $response = [
            'task succesfully created: ' => $request['title']
        ];

        return response($response, 201);
    }

    //patch header
    public function editTask(Request $request, $id) {

        $todolist = ToDoList::find($id);

        $todolist->update();
        
    }

    public function approveTask(Request $request, $id) {
        
        $todolist = ToDoList::find($id);

        $todolist->update();

    }

    public function deleteTask($id) {
        
        $todolist = ToDoList::find($id);

        $todolist->delete();

        $response = [
            'Succesfully deleted' => $todolist
        ];

        return response($response, 200);
    }

}
