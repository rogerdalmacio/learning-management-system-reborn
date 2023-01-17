<?php

namespace App\Http\Controllers\CoreFunctions;


use App\Http\Controllers\Controller;
use App\Http\Requests\Core\CreateAnnouncementRequest;
use App\Models\CoreFunctions\Announcement;
use Illuminate\Http\Request;

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

        $announcement = Announcement::find($id);

        $response = [
            'Announcement Edited Succesfully: ' => $announcement->title,
        ];
        
        return response($response, 201);

    }

    public function deleteAnnouncement(Request $request, $id) {

        $announcement = Announcement::find($id);

        $response = [
            'Announcement Deleted Succesfully: ' => $announcement->title,
        ];

        return response($response, 201);
    }

}
