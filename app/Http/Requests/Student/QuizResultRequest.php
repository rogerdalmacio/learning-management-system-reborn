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
            'student_id' => 'required|integer',
            'quiz_id' => 'required|integer',
            'module_id' => 'required|string',
            'preliminaries' => 'required|string',
            'quiz_type' => 'required|string',
            'attempt' => 'required|string',
            'score' => 'required|integer|nullable',
            'snapshot' => 'required|boolean',
            'logs' => 'required|string',
            'answers' => 'required|string',
        ];
    }
}
