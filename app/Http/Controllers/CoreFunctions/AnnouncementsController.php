<?php

namespace App\Http\Controllers\CoreFunctions;


use Illuminate\Http\Request;
use App\Models\CoreFunctions\Logs;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\CoreFunctions\Announcement;
use App\Http\Requests\Core\CreateAnnouncementRequest;

class AnnouncementsController extends Controller
{

    public function activeAnnouncements() {

        $announcements = Announcement::where('status', true)->get();

        $response = [
            'announcements' => $announcements
        ];

        return response($response, 200);

    }

    public function inActiceAnnouncements() {

        $announcements = Announcement::where('status', false)->get();

        $response = [
            'announcements' => $announcements
        ];

        return response($response, 200);
        
    }
    
    public function createAnnouncement(CreateAnnouncementRequest $request) {

        Announcement::create($request->all());

        $response = [
            'Announcement Succesfully created: ' => $request['title'],
        ];

        return response($response, 201);

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'created announcement'
        ]);
        
    }

    // patch header
    public function editAnnouncement(Request $request, $id) {

        $request->validate([
            'title' => 'sometimes',
            'body' => 'sometimes',
            'status' => 'sometimes|boolean',
            'embed_link' => 'sometimes',
        ]);

        $data = $request->only(['title', 'body', 'status', 'embed_link']);

        $announcement = Announcement::find($id);

        $announcement->update($data);

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

    public function deleteAnnouncement($id) {

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
