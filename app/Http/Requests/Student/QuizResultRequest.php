<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;

class QuizResultRequest extends FormRequest
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
            'file' => 'required|mimetypes:jpg,png|max:5000',
            'student_id' => 'required|integer',
            'quiz_id' => 'required|string',
            'module_id' => 'require|string',
            'preliminaries' => 'required|string',
            'quiz_type' => 'required|string',
            'terms' => 'required|string',
            'attempt' => 'required|string',
            'score' => 'required|integer|nullable',
            'logs' => 'required|string',
            'snapshot' => 'required|boolean'
        ];
    }
}
