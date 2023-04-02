<?php

namespace App\Http\Controllers\Connection;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\FacultyConnection;
use App\Models\CoreFunctions\Logs;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class FacultyConnectionController extends Controller
{
    public function listOfFacultyRequest()
    {
        $data = FacultyConnection::all();

        $response = [
            'list' => $data
        ];

        return response($response, 200);
    }

    public function approveRequest(Request $request)
    {
        $request->validate([
            'Request' => 'required',
        ]);

        $extension = $request->file('photo_path')->getClientOriginalExtension();

        $newFileName =  Str::uuid() . '.' . $extension;

        $newFileLocation = 'public/announcement';

        $path = $request->file('photo_path')->storeAs(
            $newFileLocation,
            $newFileName
        );

        $databasePath = 'storage/announcement/' . $newFileName;

        $facultyrequest = FacultyConnection::insert([
            'status' => 'approved',
            'file' => $databasePath
        ]);

        $response = [
            'request' => $facultyrequest
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Approve faculty request'
        ]);

        return response($response, 201);
    }
}
