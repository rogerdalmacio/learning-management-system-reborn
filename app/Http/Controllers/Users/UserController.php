<?php

namespace App\Http\Controllers\Users;

use Carbon\Carbon;
use App\Models\Users\Admin;
use Illuminate\Http\Request;
use App\Models\PasswordReset;
use App\Models\Users\Student;
use App\Models\Users\Teacher;
use App\Models\Users\SuperAdmin;
use App\Models\CoreFunctions\Logs;
use App\Models\Users\CourseManager;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Users\CourseDeveloper;

class UserController extends Controller
{
    public function login(Request $request){

        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
            'type' => 'required'
        ]);

        switch($request->type) {

            case 'Student' :

                if(!Auth::attempt(['email' => $request->email, 'password' => $request->password])){
                    return response(['Bad Credentials'], 401);
                }

                $user = Auth::user();

                if($user->is_logged_in) {

                    $response = [
                        'message' => 'Your account is already logged in to other device.'
                    ];

                    return response($response, 404);

                }

                $user->update([
                    'is_logged_in' => true
                ]);

                $token = $user->createToken('LMS',['Student'])->plainTextToken;

                $response = [
                    'user' => $user,
                    'token' => $token,
                    'type' => 'student',
                ];

                Logs::create([
                    'user_id' => $user->id,
                    'user_type' => $user->usertype(),
                    'activity_log' => 'Logged in'
                ]);

                return response($response, 201)->cookie('sanctum', $token, 1440);

                break;

            case 'Teacher' :

                if(!Auth::guard('Teacher')->attempt(['email' => $request->email, 'password' => $request->password])){
                    return response(['Bad Credentials'], 401);
                }

                $user = Auth::guard('Teacher')->user();
                
                if($user->is_logged_in) {

                    $response = [
                        'message' => 'Your account is already logged in to other device.'
                    ];

                    return response($response, 404);

                }

                $user->update([
                    'is_logged_in' => true
                ]);

                $token = $user->createToken('LMS',['Teacher'])->plainTextToken;

                $response = [
                    'user' => $user,
                    'token' => $token,
                    'type' => 'teacher'
                ];

                Logs::create([
                    'user_id' => $user->id,
                    'user_type' => $user->usertype(),
                    'activity_log' => 'Logged in'
                ]);

                        
                return response($response, 201);

                break;

            case 'CourseManager' :

                if(!Auth::guard('CourseManager')->attempt(['email' => $request->email, 'password' => $request->password])){
                    return response(['Bad Credentials'], 401);
                }

                $user = Auth::guard('CourseManager')->user();

                if($user->is_logged_in) {

                    $response = [
                        'message' => 'Your account is already logged in to other device.'
                    ];

                    return response($response, 404);

                }

                $user->update([
                    'is_logged_in' => true
                ]);

                $token = $user->createToken('LMS',['CourseManager'])->plainTextToken;

                $response = [
                    'user' => $user,
                    'token' => $token,
                    'type' => 'CourseManager',
                ];

                Logs::create([
                    'user_id' => $user->id,
                    'user_type' => $user->usertype(),
                    'activity_log' => 'Logged in'
                ]);

                return response($response, 201);

                break;

            case 'CourseDeveloper' :

                if(!Auth::guard('CourseDeveloper')->attempt(['email' => $request->email, 'password' => $request->password])){
                    return response(['Bad Credentials'], 401);
                }

                $user = Auth::guard('CourseDeveloper')->user();

                if($user->is_logged_in) {

                    $response = [
                        'message' => 'Your account is already logged in to other device.'
                    ];

                    return response($response, 404);

                }

                $user->update([
                    'is_logged_in' => true
                ]);

                $token = $user->createToken('LMS',['CourseDeveloper'])->plainTextToken;

                $response = [
                    'user' => $user,
                    'token' => $token,
                    'type' => 'courseDeveloper'
                ];

                Logs::create([
                    'user_id' => $user->id,
                    'user_type' => $user->usertype(),
                    'activity_log' => 'Logged in'
                ]);

                return response($response, 201);

                break;

            case 'Admin' :

                if(!Auth::guard('Admin')->attempt(['email' => $request->email, 'password' => $request->password])){
                    return response(['Bad Credentials'], 401);
                }

                $user = Auth::guard('Admin')->user();

                if($user->is_logged_in) {

                    $response = [
                        'message' => 'Your account is already logged in to other device.'
                    ];

                    return response($response, 404);

                }

                $user->update([
                    'is_logged_in' => true
                ]);

                $token = $user->createToken('LMS',['Admin'])->plainTextToken;

                $response = [
                    'user' => $user,
                    'token' => $token,
                    'type' => 'admin'
                ];

                Logs::create([
                    'user_id' => $user->id,
                    'user_type' => $user->usertype(),
                    'activity_log' => 'Logged in'
                ]);

                return response($response, 201);

                break;

            case 'SuperAdmin' :

                if(!Auth::guard('SuperAdmin')->attempt(['email' => $request->email, 'password' => $request->password])){
                    return response(['Bad Credentials'], 401);
                }

                $user = Auth::guard('SuperAdmin')->user();

                if($user->is_logged_in) {

                    $response = [
                        'message' => 'Your account is already logged in to other device.'
                    ];

                    return response($response, 404);

                }

                $user->update([
                    'is_logged_in' => true
                ]);

                $token = $user->createToken('LMS',['SuperAdmin'])->plainTextToken;

                $response = [
                    'user' => $user,
                    'token' => $token,
                    'type' => 'SuperAdmin'
                ];

                Logs::create([
                    'user_id' => $user->id,
                    'user_type' => $user->usertype(),
                    'activity_log' => 'Logged in'
                ]);

                return response($response, 201);

                break;

            default :

                return response(['User not found'], 201);

                break;
        }

    }

    public function logout(Request $request){

        $user = Auth::user();

        $user->update([
            'is_logged_in' => 0
        ]);

        Logs::create([
            'user_id' => $user->id,
            'user_type' => $user->usertype(),
            'activity_log' => 'Logged out'
        ]);

        $request->user()->currentAccessToken()->delete();
        
        $response =  [
            'message' => 'Logged out'
        ];
        
        return response($response, 200);
    }

    public function changePassword(Request $request) {
        $user = Auth::user();

        $request->validate([
            'old_password' => $user->password_updated ? 'required' : 'sometimes',
            'password' => 'required|min:8'
        ]);

        if(!$user->password_updated) {
            $user->update([
                'password' => bcrypt($request['password']),
                'password_updated' => true
            ]);

            Logs::create([
                'user_id' => Auth::user()->id,
                'user_type' => Auth::user()->usertype(),
                'activity_log' => 'Changed password'
            ]);

            return response('success', 200);
        }

        $check_password = Hash::check($request['old_password'], $user->password);

        if($check_password) {

            $user->update([
                'password' => bcrypt($request['password']),
                'password_updated' => true
            ]);

            Logs::create([
                'user_id' => Auth::user()->id,
                'user_type' => Auth::user()->usertype(),
                'activity_log' => 'Changed password'
            ]);

            return response('success', 200);
        } else {
            return response('Old password is incorrect', 404);
        }
    }


    public function passwordResetRequest(Request $request)
    {

        $user = $request->user_type::where('email', $request->email)->get();

        if(!$user) {
            $response = [
                'error' => 'this account does not exist on our database'
            ];
            return response($response, 404);
        }
        
        $firstTwoCharactersOfLastName = substr($user['last_name'], 0, 2);
    
        $date = Carbon::now()->format('Y');

        $password = '#' . $firstTwoCharactersOfLastName . $date;

        PasswordReset::create([
            'user_type' => $user->userType(),
            'email' => $user->email,
            'base_password' => bcrypt($password),
            'status' => 0,
        ]);
        
        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Reset password'
        ]);

        return response('success', 200);
    }
}
