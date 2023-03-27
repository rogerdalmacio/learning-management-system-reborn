<?php

namespace App\Http\Controllers\CoreFunctions;

use App\Http\Controllers\Controller;
use App\Models\Modules\Course;
use Illuminate\Http\Request;

class ListOfSubjectsController extends Controller
{
    
    public function index() {

        $subjects = Course::with('rating')->get();

        return response($subjects, 200);

    }

}
