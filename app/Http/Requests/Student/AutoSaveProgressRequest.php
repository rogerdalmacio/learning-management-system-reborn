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
            'quiz_result_id' => 'required|unique:auto_save_progress',
            'answers' => 'sometimes|string',
            'logs' => 'sometimes|string',
            'snapshot' => 'sometimes|boolean',
            'start_time' => 'required|date',
            'end_time' => 'required|date',
        ];
    }
}
