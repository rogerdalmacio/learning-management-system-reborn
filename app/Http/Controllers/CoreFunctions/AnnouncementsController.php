<?php

namespace App\Http\Controllers\CoreFunctions;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CoreFunctions\Announcement;
use App\Http\Requests\Core\SubjectTaggingRequests\CreateAnnouncementRequest;

class AnnouncementsController extends Controller
{
    
    public function createAnnouncement(CreateAnnouncementRequest $request) {

        Announcement::create($request->all());

        $response = [
            'Announcement Succesfully created: ' => $request['title'],
        ];

        return response($response, 201);
        
    }

    // patch header
    public function editAnnouncement(Request $request, $id) {

        $request->validate([
            'title' => 'required',
            'body' => 'required',
            'status' => 'required|boolean',
            'embed_link' => 'required',
        ]);

        $announcement = Announcement::find($id);

        $announcement->update([
            'title' => $request['title'],
            'body' => $request['body'],
            'status' => $request['status'],
            'embed_link' => $request['embed_link']
        ]);

        $response = [
            'Announcement Edited Succesfully: ' => $announcement,
        ];
        
        return response($response, 201);

    }

    public function deleteAnnouncement($id) {

        $announcement = Announcement::find($id);

        $announcement->delete();

        $response = [
            'Announcement Deleted Succesfully: ' => $announcement->title,
        ];

        return response($response, 204);
    }

}
