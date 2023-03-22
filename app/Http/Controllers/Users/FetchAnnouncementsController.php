<?php

namespace App\Http\Controllers\Users;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\CoreFunctions\Announcement;
use App\Http\Resources\CoreFunctions\AnnouncementResource;

class FetchAnnouncementsController extends Controller
{
    public function announcement()
    {
        $user = Auth::user();

        $data = Announcement::where('users', 'like', '%' . $user->usertype() . '%')->get();

        $announcements = AnnouncementResource::collection($data);

        $response = [
            'data' => $announcements
        ];

        return response()->json($response, 200);
    }

    public function teachers()
    {
        $user = Auth::user();

        $data = Announcement::where('users', 'like', '%' . $user->usertype() . '%')->get();

        $announcements = AnnouncementResource::collection($data);

        $response = [
            'data' => $announcements
        ];

        return response()->json($response, 200);
    }

    public function courseDevelopers()
    {
        $user = Auth::user();

        $data = Announcement::where('users', 'like', '%' . $user->usertype() . '%')->get();

        $announcements = AnnouncementResource::collection($data);

        $response = [
            'data' => $announcements
        ];

        return response()->json($response, 200);
    }

    public function courseManagers()
    {
        $user = Auth::user();

        $data = Announcement::where('users', 'like', '%' . $user->usertype() . '%')->get();

        $announcements = AnnouncementResource::collection($data);

        $response = [
            'data' => $announcements
        ];

        return response()->json($response, 200);
    }

    public function admins()
    {
        $user = Auth::user();

        $data = Announcement::where('users', 'like', '%' . $user->usertype() . '%')->get();

        $announcements = AnnouncementResource::collection($data);

        $response = [
            'data' => $announcements
        ];

        return response()->json($response, 200);
    }
    
    public function superAdmins()
    {
        $user = Auth::user();

        $data = Announcement::where('users', 'like', '%' . $user->usertype() . '%')->get();

        $announcements = AnnouncementResource::collection($data);

        $response = [
            'data' => $announcements
        ];

        return response()->json($response, 200);
    }
}
