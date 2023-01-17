<?php

namespace App\Http\Controllers\CoreFunctions;

use League\Csv\Reader;
use App\Models\Users\Student;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\Core\AccountCreationRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class AccountCreationController extends Controller
{
    public function store(AccountCreationRequest $request)
    {
        
        try {

            $success = [];
            $insertStudents = [];
            $errors = [];

            $csv = $request->file('file');
            $csv = Reader::createFromPath($csv->getRealPath(), 'r');
            $csv->setHeaderOffset(0);

            $rules = [
                'first_name' => [
                    'required',
                ],
                'last_name' => [
                    'required',
                ],
                'email' => [
                    'required',
                    'email',
                    'unique:students'
                ],
                'departments' => [
                    'required',
                ],
                'section' => [
                    'required',
                ],
                'year_level' => [
                    'required',
                ],
            ];
        
            foreach ($csv as $student) {

                $firstTwoCharactersOfLastName = substr($student['last_name'], 0, 2);

                $date = Carbon::now()->format('Y');

                $password = '#' . $firstTwoCharactersOfLastName . $date;

                $newstudent = [
                    'first_name' => $student['first_name'],
                    'last_name' => $student['last_name'],
                    'email' => $student['email'],
                    'password' => Hash::make($password),
                    'departments' => $student['departments'],
                    'section' => $student['section'],
                    'year_level' => $student['year_level'],
                    'subjects' => '',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];

                $message = ['email.unique' => 'Email :input is already taken'];
                $validator = Validator::make($newstudent, $rules, $message);

                if($validator->fails()){
                    $errors[] = $validator->errors();
                } else {
                    $insertStudents[] = $newstudent;
                    $success[] = $newstudent['email'] . ' - ' . $password;
                }

            }

            $chunks = array_chunk($insertStudents, 100);

            foreach($chunks as $chunk) {
                Student::insert($chunk);
            }

        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return response()->json([
                'error' => $e->getMessage(),
                'errors' => $errors
            ], 500);
        }

        return response()->json([
            'account successfully created for' => $success,
            'errors' => $errors
        ], 201);

    }
}
