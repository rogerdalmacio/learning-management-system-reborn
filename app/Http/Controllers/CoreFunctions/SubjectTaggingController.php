<?php

namespace App\Http\Controllers\CoreFunctions;

use League\Csv\Reader;
use Illuminate\Http\Request;
use App\Models\Users\Student;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\Core\TagSubjectsRequest;
use App\Http\Requests\Core\SingleSubjectTagging;

class SubjectTaggingController extends Controller
{
    
    public function store(TagSubjectsRequest $request)
    {

        try {

            $success = [];
            $errors = [];
            $null = [];

            $csv = $request->file('file');
            $csv = Reader::createFromPath($csv->getRealPath(), 'r');
            $csv->setHeaderOffset(0);
            
            foreach ($csv as $student) {

                $rules = [
                    'id' => [
                        'required',
                    ],
                    'subjects' => [
                        'required',
                    ]
                ];

                $validator = Validator::make($student, $rules);

                if($validator->fails()){
                    $errors[] = $validator->errors();
                }

                $user = Student::find($student['id']);

                if(!$user) {
                    $null[] = $student['id'];
                } else {
                    $success[] = $student['id'];
                    $user->subjects = $student['subjects'];
                    $user->save();  
                }
                
            }

        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'Subjects Tagged to' => $success,
            'errors' => $errors,
            'does not exist' => $null,
        ], 201);

    }


    //patch header
    public function update(SingleSubjectTagging $request, $id)
    {
        $user = Student::find($id);

        $subjects = $user->subjects;

        $subjectsArray = explode(',', $subjects);

        foreach($subjectsArray as $subs){
            if($subs == $request['subjects']){
                return response([
                    'Subject Already Exist' => $request['subjects']
                ]);
            }
        }

        $user->update(['subjects' => $request['subjects']]);

        $response = [
            'Successfully added' => $request['subjects']
        ];

        return response($response, 201);

    }

}
