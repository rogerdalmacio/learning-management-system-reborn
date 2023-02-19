<?php

namespace App\Http\Controllers\CourseDeveloper;

use Illuminate\Http\Request;
use App\Models\Modules\Activity;
use App\Http\Controllers\Controller;
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

        Activity::create($request->all());

        $response = [
            'Successfuly created' => $request['module_id'],
        ];

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
            'title' => 'required',
            'embed_link' => 'required' 
        ]);

        $activity = Activity::find($id);

        $activity->update([
            'title' => $request['title'],
            'embed_links' => $request['embed_link']
        ]);
        
        $response = [
            'Activity successfully updated' => $activity
        ];

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
