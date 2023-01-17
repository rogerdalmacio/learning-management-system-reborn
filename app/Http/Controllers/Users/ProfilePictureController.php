<?php

namespace App\Http\Controllers\Users;


use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\User\ProfilePictureRequest;

class ProfilePictureController extends Controller
{

    //upload profile picture
    public function uploadProfilePicture(ProfilePictureRequest $request) {

        $user = Auth::user();

        $userType = $user->userType();

        $userId = $user->id;

        $extension = $request->file('file')->getClientOriginalExtension();

        $newFileName = $userType . $userId . '.' . $extension;

        $newFileLocation = 'public/' . $userType;

        $path = $request->file('file')->storeAs(
            $newFileLocation,
            $newFileName
        );
        
        $response = [
            'profile picture:' => $newFileName,
            'path' => $path
        ];

        return response($response, 201);

    }

}
