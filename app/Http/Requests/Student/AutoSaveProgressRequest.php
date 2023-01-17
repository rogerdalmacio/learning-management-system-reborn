<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;

class AutoSaveProgressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'file' => 'sometimes|mimetypes:jpg,png|max:5000',
            'student_id' => 'sometimes|integer',
            'quiz_id' => 'sometimes|string',
            'module_id' => 'sometimes|string',
            'preliminaries' => 'sometimes|string',
            'quiz_type' => 'sometimes|string',
            'attempt' => 'sometimes|string',
            'score' => 'sometimes|integer|nullable',
            'logs' => 'sometimes|string',
            'snapshot' => 'sometimes|boolean',
            'start_time' => 'required|date',
            'end_time' => 'required|date',
        ];
    }
}
