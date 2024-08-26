<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePhotosGroupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->Has_Permissions('edit_photos');
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

            'photos' => 'required_without_all:old_photos,videos,old_videos|array|min:1',
            'photos.*' => 'required|array|min:1',
            'photos.*.*' => 'required|file|image',
            'old_photos' => 'required_without_all:photos,videos,old_videos|array',
            'old_photos.*' => 'nullable|string',

            'videos' => 'required_without_all:photos,old_photos,old_videos|array|min:1',
            'videos.*' => 'required|array|min:1',
            'videos.*.*' => 'required|file|mimetypes:video/avi,video/mpeg,video/mp4,video/quicktime',
            'old_videos' => 'required_without_all:photos,old_photos,videos|array',
            'old_videos.*' => 'nullable|string',

        ];
    }
}
