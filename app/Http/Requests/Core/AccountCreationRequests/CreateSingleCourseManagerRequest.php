<?php

namespace App\Http\Requests\Core\AccountCreationRequests;

use Illuminate\Foundation\Http\FormRequest;

class CreateSingleCourseManagerRequest extends FormRequest
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
            'id' => 'required|unique:lms_course_managers|integer',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'department' => 'required|string',
        ];
    }
}
