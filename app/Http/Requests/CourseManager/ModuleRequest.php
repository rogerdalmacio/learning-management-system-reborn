<?php

namespace App\Http\Requests\CourseManager;

use Illuminate\Foundation\Http\FormRequest;

class ModuleRequest extends FormRequest
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
            'course_id' => 'required',
            'course_code' => 'required',
            'module_week' => 'required',
            'status' => 'required|boolean'
        ];
    }
}
