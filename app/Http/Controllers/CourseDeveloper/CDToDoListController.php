<?php

namespace App\Http\Controllers\CourseDeveloper;

use App\Http\Controllers\Controller;
use App\Models\CourseManager\ContentValidation;
use App\Models\CourseManager\ToDoList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CDToDoListController extends Controller
{

    public function submitTodo($id) {

        $content_validate = ContentValidation::find($id);

        $content_validate->update([
            'submitted' => true
        ]);

        $response = [
            'message' => 'To do submitted'
        ];

        return response($response, 204);

    }

}
