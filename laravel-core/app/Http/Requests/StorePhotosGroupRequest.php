<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class StorePhotosGroupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->Has_Permissions('create_photos');
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
            'photos' => 'required_without:videos|array|min:1',
            'photos.*' => 'required|array|min:1',
            'photos.*.*' => 'required|file|image',
            'videos' => 'required_without:photos|array|min:1',
            'videos.*' => 'required|array|min:1',
            'videos.*.*' => 'required|file|mimetypes:video/avi,video/mpeg,video/mp4,video/quicktime',
        ];
    }
}
