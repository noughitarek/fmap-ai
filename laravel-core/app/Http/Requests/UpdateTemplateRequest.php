<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTemplateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->Has_Permissions('edit_templates');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'group_id' => 'required|exists:templates_groups,id',
            'photo.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'video.*' => 'nullable|file|mimes:mp4,avi,mov,wmv|max:20480',
            'audio.*' => 'nullable|file|mimes:mp3,wav|max:10240',
            'message' => 'nullable|string',
        ];
    }
}
