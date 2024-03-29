<?php

namespace App\Http\Requests\Core\SubjectTaggingRequests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class SingleCourseDeveloperSubjectTaggingRequest extends FormRequest
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
            'id' => [
                'required',
                Rule::exists('lms_course_developers', 'id')
            ],
            'subjects' => 'required'
        ];
    }
}
