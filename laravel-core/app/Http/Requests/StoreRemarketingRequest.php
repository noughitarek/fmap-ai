<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class StoreRemarketingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->Has_Permissions('create_remarketings');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'description' => 'nullable|string',
            "category" => 'required|exists:remarketings_categories,id',
            "facebook_page_id" => 'required|exists:facebook_pages,id',
            "programs_group_id" => 'required|exists:programs_groups,id',
            "templates_group_id" => 'required|exists:templates_groups,id',
        ];
    }
}
