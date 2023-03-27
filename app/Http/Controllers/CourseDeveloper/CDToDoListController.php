
<?php

namespace App\Http\Controllers\CourseDeveloper;

use Illuminate\Http\Request;
use App\Models\CoreFunctions\Logs;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\CourseManager\ContentValidation;

class CDToDoListController extends Controller
{

    public function submitTodo(Request $request, $id) {

        $content_validate = ContentValidation::find($id);

        $content_validate->update([
            'submitted' => true
        ]);

        $response = [
            'message' => 'To do submitted'
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Submitted to do for content validation - ' . $content_validate->id
        ]);

        return response($response, 204);

    }

}
