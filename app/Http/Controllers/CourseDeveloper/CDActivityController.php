<?php

namespace App\Http\Controllers\CourseDeveloper;

use Illuminate\Http\Request;
use App\Models\Modules\Activity;
use App\Models\CoreFunctions\Logs;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CourseDeveloper\ActivityRequest;

class CDActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function index()
    // {

    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ActivityRequest $request)
    {

        $exist = Activity::where('module_id', $request['module_id'])
                ->where('activity_type', $request['activity_type'])
                ->get();


        if($exist->count() > 0){
            return response(['already exist'], 409);
        }

        $activity = Activity::create($request->all());

        $response = [
            'Successfuly created' => $request['module_id'],
        ];

        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Created activity for module' .  $activity->module_id . '-' . $activity->activity_type
        ]);

        return response($response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
        $query = Activity::where('id', $id)->get();

        $response = [
            'Activity' => $query
        ];

        return response($response, 200);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $request->validate([
            'title' => 'sometimes',
            'embed_links' => 'sometimes', 
        ]);

        $activity = Activity::find($id);

        $activity->update($request->all());
        
        $response = [
            'Activity successfully updated' => $activity
        ];


        Logs::create([
            'user_id' => Auth::user()->id,
            'user_type' => Auth::user()->usertype(),
            'activity_log' => 'Editted activity for module' .  $activity->module_id . '-' . $activity->activity_type
        ]);

        return response($response, 201); 

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
