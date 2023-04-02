<?php

namespace App\Http\Controllers\Connection;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\AcademicConnection;
use App\Models\CoreFunctions\Logs;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AmsController extends Controller
{
    public function listOfAmsRequest()
    {
        $data = AcademicConnection::all();

        $response = [
            'list' => $data
        ];

        return response($response, 200);
    }

    public function requestCmo(Request $request)
    {
        $request->validate([
            'Request' => 'required',
        ]);

        $cmorequest = AcademicConnection::insert([
            'Request' => $request['Request'],
            'Department' => 'LMS',
            'Status' => 'Pending',
            'Request_date' => Carbon::now(),
        ]);

        $response = [
            'request' => $cmorequest
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Requested CMO on academic'
        ]);

        return response($response, 201);
    }
}
