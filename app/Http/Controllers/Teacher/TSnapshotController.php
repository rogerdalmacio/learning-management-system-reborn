<?php

namespace App\Http\Controllers\Teacher;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;

class TSnapshotController extends Controller
{

    public function checkSnapshot(Request $request) {

        $request->validate([
            'filename' => 'required'
        ]);

        $deleteFile = File::delete($request['filename']);

        $response = [
            'Success' => $deleteFile
        ];

        return response($response, 204);

    }

}
