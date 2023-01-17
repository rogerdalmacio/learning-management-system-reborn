<?php

namespace App\Http\Controllers\CoreFunctions;

use App\Http\Controllers\Controller;
use App\Models\Modules\Module;
use Illuminate\Http\Request;

class ModuleStatusUpdateController extends Controller
{
    public function editModuleStatus(Request $request) {

        $modulesArr = [];
        $modules = Module::where('week', $request['week'])->get();

        foreach($modules as $module) {

            $modulesArr[] = $module->id;

        }

        $chunks = array_chunk($modulesArr, 100);

        foreach($chunks as $chunk) {
            Module::whereIn('id', $chunk)->update(['status' => $request['status']]);
        }

        $response = [
            'Module status updated: ' => $modulesArr,
        ];

        return response($response, 201);

    }   
}
