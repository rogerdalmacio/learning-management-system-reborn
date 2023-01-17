<?php

namespace App\Http\Requests\CourseDeveloper;

use Illuminate\Foundation\Http\FormRequest;

class QuizRequest extends FormRequest
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
            'module_id' => 'required',
            'quiz_info' => 'required',
            'preliminaries' => 'required',
            'quiz_type' => 'required',
        ];
    }
}
