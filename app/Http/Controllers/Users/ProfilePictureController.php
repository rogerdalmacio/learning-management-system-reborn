<?php

namespace App\Http\Controllers\Users;


use Spatie\Glide\GlideImage;
use App\Models\CoreFunctions\Logs;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Http\Requests\Users\ProfilePictureRequest;

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

        // $existPNG = storage_path('app/public/' . $userType . '/' . $userType . $userId . '.png');
        // $existJPG = storage_path('app/public/' . $userType . '/' . $userType . $userId . '.jpg');

        // if(File::exists($existPNG)) {

        //     File::delete($existPNG);

        // }

        // if(File::exists($existJPG)) {

        //     File::delete($existJPG);

        // }

        $path = $request->file('file')->storeAs(
            $newFileLocation,
            $newFileName
        );
  
        $response = [
            'profile picture:' => $newFileName,
            'path' => $path
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Updated profile picture'
        ]);

        return response($response, 201);

    }

    // public function fetchProfilePicture($filename) {

    //     $user = Auth::user();

    //     $userType = $user->userType();
        
    //     $path = storage_path('app/' . $userType . '/' . $filename);


        // if(!File::exists($path)) {
    //         return response(['file does not exists'], 404);
    //     }

    //     $file = File::get($path);
    //     $type = File::mimeType($path);

    //     return response($file, 200)->header("Content-Type", $type);

    // }

}
