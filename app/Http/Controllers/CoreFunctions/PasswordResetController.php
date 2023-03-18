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
use App\Models\CoreFunctions\PasswordReset;
use Illuminate\Support\Facades\Auth;
use App\Models\Users\CourseDeveloper;

class PasswordResetController extends Controller
{   
    public function passwordReset(Request $request) {

        $request->validate([
            'user_id' => 'required|integer',
            'user_type' => 'required|string',
        ]);

        $user = $request['user_type']::find($request['user_id']);

        $firstTwoCharactersOfLastName = substr($user['last_name'], 0, 2);

        $date = Carbon::now()->format('Y');

        $password = '#' . $firstTwoCharactersOfLastName . $date;

        $user->update([
            'password' => bcrypt($password),
            'is_logged_in' => 1,
        ]);

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Reset password for user - ' . $user->userType() . $user->first_name . ' ' . $user->last_name
        ]);

        return response(['message' => 'Password reset successful'], 204);
    }

}
