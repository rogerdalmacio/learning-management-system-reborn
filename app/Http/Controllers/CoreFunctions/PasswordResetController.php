<?php

namespace App\Http\Controllers\CoreFunctions;

use Carbon\Carbon;
use App\Models\Users\Admin;
use Illuminate\Http\Request;
use App\Models\Users\Student;
use App\Models\Users\Teacher;
use App\Models\Users\SuperAdmin;
use App\Models\CoreFunctions\Logs;
use App\Models\Users\CourseManager;
use App\Http\Controllers\Controller;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Models\Users\CourseDeveloper;
use App\Models\PasswordReset as ModelsPasswordReset;

class PasswordResetController extends Controller
{   
    public function passwordResetList() {
        $password_reset = ModelsPasswordReset::all();

        $response = [
            'users' => $password_reset
        ];

        return response($response, 200);
    }

    public function passwordReset(Request $request, $id) {

        $password_reset = ModelsPasswordReset::find($id);

        $user = $password_reset->user_type::where('email', $password_reset->email)->get();

        $user->update([
            'password' => $password_reset->base_password,
            'password_updated' => 0,
        ]);
        
        Mail::to($user->email)->send(new ResetPasswordMail($user, $password_reset->base_password));

        $response = [
            'success'
        ];

        return response($response, 201);
    }
}