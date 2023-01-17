<?php

namespace App\Http\Requests\CourseManager;

use Illuminate\Foundation\Http\FormRequest;

class CourseRequest extends FormRequest
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
            'course' => 'required|string',
            'course_code' => 'required|string',
            'departments' => 'required|string',
            'approval' => 'required|boolean',
            'modules' => 'required|integer'
        ];
    }
}
