<?php

namespace App\Http\Controllers\Users;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\ChangePasswordRequest;
use App\Models\Users\Student;
use App\Models\Users\Teacher;
use App\Models\Users\CourseDeveloper;
use App\Models\Users\CourseManager;
use App\Models\Users\Admin;
use App\Models\Users\SuperAdmin;
use Illuminate\Support\Facades\Auth;

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

        return response($response, 201);

    }

}
