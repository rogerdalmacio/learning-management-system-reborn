<?php

namespace App\Http\Controllers\Users;

use App\Models\Users\Admin;
use Illuminate\Http\Request;
use App\Models\Users\Student;
use App\Models\Users\Teacher;
use App\Models\Users\SuperAdmin;
use App\Models\CoreFunctions\Logs;
use App\Models\Users\CourseManager;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Users\CourseDeveloper;
use App\Http\Requests\Users\ChangePasswordRequest;

class ChangePasswordController extends Controller
{

    public function changePassword(ChangePasswordRequest $request) {
    
        $auth_user = Auth::user();

        $user = $auth_user->type()::find($auth_user->id);

        $user->update([
            'password' => $request['password']
        ]);

        $response = [
            'Password Updated Successfully'
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Changed password'
        ]);

        return response($response, 201);

    }

    

}
