<?php

namespace App\Http\Requests\Core\SubjectTaggingRequests;

use Illuminate\Foundation\Http\FormRequest;

class TagSubjectsRequest extends FormRequest
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
            'file' => 'required|file|mimes:csv|size:25000'
        ];
    }
}
