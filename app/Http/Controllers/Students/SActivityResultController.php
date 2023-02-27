<?php

namespace App\Http\Controllers\Students;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Students\ActivityResult;
use App\Http\Requests\Student\ActivityResultRequest;

class SActivityResultController extends Controller
{
            //  /**
    //  * Display a listing of the resource.
    //  *
    //  * @return \Illuminate\Http\Response
    //  */
    // public function index()
    // {
        
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ActivityResultRequest $request)
    {

        $user = Auth::user();

        $activityType = $request['activity_type'];

        $activitiyId = $request['activity_id'];

        $userId = $user->id;

        $exists = ActivityResult::where('student_id', $user->id)
                                ->where('activity_id', $request['activity_id'])
                                ->get();

        if($exists->count() > 0) {

            return response(['Already Exists'], 404);

        }

        $extension = $request->file('file')->getClientOriginalExtension();

        $newFileName = $userId . $activityType . $activitiyId . '.' . $extension;

        $newFileLocation = 'public/activity/' . $activityType;

        $path = $request->file('file')->storeAs(
            $newFileLocation,
            $newFileName
        );
        
        $activityResult = ActivityResult::create([
            'student_id' => $user->id,
            'activity_id' => $request['activity_id'],
            'module_id' => $request['module_id'],
            'activity_type' => $request['activity_type'],
            'terms' => $request['terms'],
            'attempt' => $request['attempt'],
            'score' => null
        ]);

        $response = [
            'Activity Result' => $activityResult,
            'file path' => $path
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

        $activityResult = ActivityResult::find($id);

        $response = [
            'Activity Result' => $activityResult
        ];

        return response($response, 200);

    }

    // /**
    //  * Update the specified resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function update(Request $request, $id)
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function destroy($id)
    // {
    //     //
    // }
}
