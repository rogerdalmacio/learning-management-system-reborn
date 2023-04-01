<?php

namespace App\Http\Controllers\Connection;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\CoreFunctions\Logs;
use App\Models\RegistrarConnection;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class RegistrarController extends Controller
{
    public function listOfRegistrarRequest()
    {
        $list = RegistrarConnection::all();

        $response = [
            'list' => $list
        ];

        return response($response, 200);
    }

    public function requestStudentCredentials(Request $request)
    {
        $request->validate([
            'Request' => 'required',
        ]);

        $studentrequest = RegistrarConnection::insert([
            'Request' => $request['Request'],
            'Department' => 'LMS',
            'Status' => 'Pending',
            'Request_date' => Carbon::now(),
        ]);

        $response = [
            'request' => $studentrequest
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Requested student credentials on registrar'
        ]);

        return response($response, 201);
    }

    public function requestStudentSubjects(Request $request)
    {
        $request->validate([
            'Request' => 'required',
        ]);

        $studentrequest = RegistrarConnection::insert([
            'Request' => $request['Request'],
            'Department' => 'LMS',
            'Status' => 'Pending',
            'Request_date' => Carbon::now(),
        ]);

        $response = [
            'request' => $studentrequest
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Requested student subjects on registrar'
        ]);

        return response($response, 201);
    }
}
