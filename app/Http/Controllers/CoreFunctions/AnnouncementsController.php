<?php

namespace App\Http\Controllers\CoreFunctions;


use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\CoreFunctions\Logs;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\CoreFunctions\Announcement;
use App\Http\Requests\Core\CreateAnnouncementRequest;
use App\Http\Resources\CoreFunctions\AnnouncementResource;

class AnnouncementsController extends Controller
{
    public function announcement() {

        $user = Auth::user();

        if($user->usertype() == 'Admin') {

            $data = Announcement::all();

            $response = [
                'Announcement' => $data,
            ];

            return response()->json($response, 200);
        }

        $data = Announcement::where('users', 'like', '%' . $user->usertype() . '%')->where('status', true)->get();

        $announcements = AnnouncementResource::collection($data);

        $response = [
            'data' => $announcements
        ];

        return response()->json($response, 200);

    }
    
    public function createAnnouncement(CreateAnnouncementRequest $request) {

        $extension = $request->file('photo_path')->getClientOriginalExtension();

        $newFileName =  Str::uuid() . '.' . $extension;

        $newFileLocation = 'public/announcement';

        $path = $request->file('photo_path')->storeAs(
            $newFileLocation,
            $newFileName
        );

        Announcement::create([
            'title' => $request['title'],
            'body' => $request['body'],
            'status'  => $request['status'],
            'photo_path' => $path,
            'users' => $request['users'],
            'tags'  => $request['tags'],
        ]);

        $response = [
            'Announcement Succesfully created: ' => $request['title'],
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'created announcement'
        ]);

        return response($response, 201);
        
    }

    // patch header
    public function editAnnouncement(Request $request, $id) {

        $request->validate([
            'title' => 'required',
            'body' => 'required',
            'status' => 'required',
            'tags' => 'required',
            'users' => 'required',
        ]);

        $announcement = Announcement::find($id);

        $announcement->update([
            'title' => $request['title'],
            'body' => $request['body'],
            'status'  => $request['status'],
            'users' => $request['users'],
            'tags'  => $request['tags'],
        ]);

        $response = [
            'Announcement Edited Succesfully: ' => $announcement,
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'editted announcement'
        ]);
        
        return response($response, 201);

    }

    public function deleteAnnouncement(Request $request, $id) {

        $announcement = Announcement::find($id);

        $announcement->delete();

        $response = [
            'Announcement Deleted Succesfully: ' => $announcement->title,
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'deleted announcement'
        ]);
 
        return response($response, 204);
    }

}
