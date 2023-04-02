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

    public function approveRequest(Request $request, $id)
    {
        $request->validate([
            'file' => 'required',
        ]);

        $extension = $request->file('file')->getClientOriginalExtension();

        $newFileName =  Str::uuid() . '.' . $extension;

        $newFileLocation = 'public/announcement';

        $path = $request->file('file')->storeAs(
            $newFileLocation,
            $newFileName
        );

        $databasePath = env('APP_URL') . '/storage/announcement/' . $newFileName;

        $facultyrequest = FacultyConnection::find($id);

        $facultyrequest->update([
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
