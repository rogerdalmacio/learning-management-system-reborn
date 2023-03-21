<?php

namespace App\Http\Requests\Core;

use Illuminate\Foundation\Http\FormRequest;

class CreateAnnouncementRequest extends FormRequest
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
        'title' => 'required|unique:announcements,title',
        'body' => 'required',
        'status' => 'required|boolean',
        'tags' => 'required|string',
        'users' => 'required|string',
        'embed_link' => 'sometimes',
        ];
    }
}
