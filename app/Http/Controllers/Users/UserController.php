<?php

namespace App\Http\Controllers\Users;

use App\Models\Users\Admin;
use App\Models\Users\Student;
use App\Models\Users\Teacher;
use Illuminate\Http\Request;
use App\Models\Users\CourseManager;
use App\Http\Controllers\Controller;
use App\Models\Users\CourseDeveloper;
use App\Models\Users\SuperAdmin;
use Illuminate\Support\Facades\Auth;

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

            return response($response, 201);

        } else {
            return response(['Unknown Request'], 400);
        }
    }

    public function logout(Request $request){

        $request->user()->currentAccessToken()->delete();
        
        $response =  [
            'message' => 'Logged out'
        ];
        
        return response($response, 201);
    }
}
