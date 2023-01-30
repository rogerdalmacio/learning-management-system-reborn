<?php

namespace App\Http\Requests\CourseDeveloper;

use Illuminate\Foundation\Http\FormRequest;

class LessonRequest extends FormRequest
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
            'preliminaries' => 'required',
            'title' => 'required',
            'embed_links' => 'sometimes',
        ];
    }
}
