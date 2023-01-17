<?php

namespace App\Http\Requests\Core\AccountCreationRequests;

use Illuminate\Foundation\Http\FormRequest;

class CreateSingleStudentRequest extends FormRequest
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
            'id' => 'required|unique:students|integer',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'section'  => 'required|integer',
            'departments'  => 'required|string',
            'year_level'  => 'required|integer'
        ];
    }   
}
