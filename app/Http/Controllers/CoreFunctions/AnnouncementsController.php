<?php

namespace App\Http\Controllers\CoreFunctions;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CoreFunctions\Announcement;
use App\Http\Requests\Core\CreateAnnouncementRequest;

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
            'title' => 'sometimes',
            'body' => 'sometimes',
            'status' => 'sometimes|boolean',
            'embed_link' => 'sometimes',
        ]);

        $announcement = Announcement::find($id);

        $announcement->update([$request->all()]);

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
