<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;

class ActivityResultRequest extends FormRequest
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
            'file' => 'required|mimes:docx,pdf|max:5000',
            'student_id' => 'required|integer',
            'activity_id' => 'required|string',
            'module_id'  => 'required|string',
            'activity_type'  => 'required|string',
            'terms'  => 'required',
            'attempt'  => 'required',
            'score'  => 'required|nullable'
        ];
    }
}
