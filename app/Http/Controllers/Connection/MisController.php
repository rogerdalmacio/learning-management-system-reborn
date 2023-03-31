<?php

namespace App\Http\Controllers\Connection;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\MisConnection;
use App\Models\CoreFunctions\Logs;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class MisController extends Controller
{

    public function listOfMisRequest()
    {
        $data = MisConnection::where('department', 'LMS')->get();

        $response = [
            'List' => $data
        ];

        return response($response, 200);
    }

    public function requestExamGrantees(Request $request)
    {
        $request->validate([
            'inq_type',
        ]);

        MisConnection::insert([
            'inq_type' => $request['inq_type'],
            'department' => 'LMS',
            'date_req' => Carbon::now(),
            'status' => 1,
        ]);

        $response = [
            'Exam grantees requested successfully'
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Requested exam grantees from MIS'
        ]);

        return response($response, 201);
    }
}
