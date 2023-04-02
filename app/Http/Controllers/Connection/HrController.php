<?php

namespace App\Http\Controllers\Connection;

use Carbon\Carbon;
use App\Models\HrConnection;
use Illuminate\Http\Request;
use App\Models\CoreFunctions\Logs;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class HrController extends Controller
{
    public function listOfHrRequest()
    {
        $data = HrConnection::all();

        $response = [
            'list' => $data
        ];

        return response($response, 200);
    }

    public function requestTeacherCredentials(Request $request)
    {
        $request->validate([
            'Request' => 'required',
        ]);

        $hrrequest = HrConnection::insert([
            'Request' => $request['Request'],
            'Department' => 'LMS',
            'Status' => 'Pending',
            'Request_date' => Carbon::now(),
        ]);

        $response = [
            'request' => $hrrequest
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Requested teacher credentials on hr'
        ]);

        return response($response, 201);
    }
}
