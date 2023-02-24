<?php

namespace App\Http\Controllers\CoreFunctions;

use App\Http\Controllers\Controller;
use App\Models\CoreFunctions\Logs;
use Illuminate\Http\Request;

class LogsController extends Controller
{
    public function logsList() {

        $logs = Logs::all();

        $response = [
            'logs' => $logs
        ];

        return response($response, 200);
        
    }
}
