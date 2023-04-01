<?php

namespace App\Http\Controllers\CoreFunctions;

use Illuminate\Http\Request;
use App\Models\Modules\Module;
use App\Models\CoreFunctions\Logs;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\CoreFunctions\Announcement;

class ModuleStatusUpdateController extends Controller
{

    public function listOfModules() {

        $modules = Module::select('week', 'status')
                    ->whereIn('week', ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'])
                    ->distinct('week')
                    ->skip(0)
                    ->take(24)
                    ->get();

        $response = [
            'modules' => $modules
        ];

        return response($response, 200);

    }

    public function editModuleStatus(Request $request, $id) {

        $request->validate([
            'status' => 'required'
        ]);

        $modules = Module::where('week', $id)->get();

        foreach($modules as $module) {
            $module->update([
                'status' => $request['status']
            ]);
        }

        $response = [
            'Module status updated: ' => $modules,
        ];

        Announcement::create([
            'title' => 'Module ' . $id . ' is now open',
            'body' => 'you can now proceed and answer your modules, goodluck !',
            'status' => null,
            'photo_path' => null,
            'users' => ['Student', 'Teacher'],
            'tags' => 'notification',
        ]);

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Editted module status'
        ]);

        return response($response, 201);

    }   
}