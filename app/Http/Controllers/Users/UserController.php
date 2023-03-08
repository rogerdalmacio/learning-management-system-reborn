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

class UserController extends Controller
{
    public function login(Request $request){

        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
            'type' => 'required'
        ]);

        if($request->type == 'Student'){

            $user = Student::where('email', $request->email)->first();

            if(!Auth::attempt(['email' => $request->email, 'password' => $request->password])){
                return response(['Bad Credentials'], 401);
            }

            $token = $user->createToken('LMS',['Student'])->plainTextToken;

            $response = [
                'user' => $user,
                'token' => $token,
                'type' => 'student',
            ];

            Logs::create([
                'user_id' => Auth::user()->id,
                'user_type' => Auth::user()->usertype(),
                'activity_log' => 'Logged in'
            ]);

            return response($response, 201)->cookie('sanctum', $token, 1440);

        } elseif ($request->type == 'Teacher') {

            $user = Teacher::where('email', $request->email)->first();

            if(!Auth::guard('Teacher')->attempt(['email' => $request->email, 'password' => $request->password])){
                return response(['Bad Credentials'], 401);
            }

            $token = $user->createToken('LMS',['Teacher'])->plainTextToken;

            $response = [
                'user' => $user,
                'token' => $token,
                'type' => 'teacher'
            ];

            Logs::create([
                'user_id' => Auth::guard('Teacher')->user()->id,
                'user_type' => Auth::guard('Teacher')->user()->usertype(),
                'activity_log' => 'Logged in'
            ]);
                    
            return response($response, 201);

        } elseif($request->type == 'CourseManager') {

            $user = CourseManager::where('email', $request->email)->first();

            if(!Auth::guard('CourseManager')->attempt(['email' => $request->email, 'password' => $request->password])){
                return response(['Bad Credentials'], 401);
            }

            $token = $user->createToken('LMS',['CourseManager'])->plainTextToken;

            $response = [
                'user' => $user,
                'token' => $token,
                'type' => 'CourseManager',
            ];

            Logs::create([
                'user_id' => Auth::guard('CourseManager')->user()->id,
                'user_type' => Auth::guard('CourseManager')->user()->usertype(),
                'activity_log' => 'Logged in'
            ]);

            return response($response, 201);

        } elseif($request->type == 'CourseDeveloper') {

            $user = CourseDeveloper::where('email', $request->email)->first();

            if(!Auth::guard('CourseDeveloper')->attempt(['email' => $request->email, 'password' => $request->password])){
                return response(['Bad Credentials'], 401);
            }

            $token = $user->createToken('LMS',['CourseDeveloper'])->plainTextToken;

            $response = [
                'user' => $user,
                'token' => $token,
                'type' => 'courseDeveloper'
            ];

            Logs::create([
                'user_id' => Auth::guard('CourseDeveloper')->user()->id,
                'user_type' => Auth::guard('CourseDeveloper')->user()->usertype(),
                'activity_log' => 'Logged in'
            ]);

            return response($response, 201);

        } elseif($request->type == 'Admin') {

            $user = Admin::where('email', $request->email)->first();

            if(!Auth::guard('Admin')->attempt(['email' => $request->email, 'password' => $request->password])){
                return response(['Bad Credentials'], 401);
            }

            $token = $user->createToken('LMS',['Admin'])->plainTextToken;

            $response = [
                'user' => $user,
                'token' => $token,
                'type' => 'admin'
            ];

            Logs::create([
                'user_id' => Auth::guard('Admin')->user()->id,
                'user_type' => Auth::guard('Admin')->user()->usertype(),
                'activity_log' => 'Logged in'
            ]);

            return response($response, 201);

        } elseif($request->type == 'SuperAdmin') {

            $user = SuperAdmin::where('email', $request->email)->first();

            if(!Auth::guard('SuperAdmin')->attempt(['email' => $request->email, 'password' => $request->password])){
                return response(['Bad Credentials'], 401);
            }

            $token = $user->createToken('LMS',['SuperAdmin'])->plainTextToken;

            $response = [
                'user' => $user,
                'token' => $token,
                'type' => 'SuperAdmin'
            ];

            Logs::create([
                'user_id' => Auth::guard('SuperAdmin')->user()->id,
                'user_type' => Auth::guard('SuperAdmin')->user()->usertype(),
                'activity_log' => 'Logged in'
            ]);

            return response($response, 201);

        } else {
            return response(['Unknown Request'], 400);
        }
    }

    public function logout(Request $request){

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Logged out'
        ]);

        $request->user()->currentAccessToken()->delete();
        
        $response =  [
            'message' => 'Logged out'
        ];
        
        return response($response, 200);
    }
}
