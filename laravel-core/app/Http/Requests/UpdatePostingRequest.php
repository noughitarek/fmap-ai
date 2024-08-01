<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePostingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->Has_Permissions('edit_postings');
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
            "postings_category_id" => 'required|exists:postings_categories,id',
            "accounts_group_id" => 'required|exists:accounts_groups,id',
            "titles_group_id" => 'required|exists:titles_groups,id',
            "photos_group_id" => 'required|exists:photos_groups,id',
            "descriptions_group_id" => 'nullable|exists:descriptions_groups,id',
        ];
    }
}
