<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class StoreProgramRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->Has_Permissions('create_programs');
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
            'group_id' => 'required|exists:programs_groups,id',
            'reuse_after' => 'nullable|integer',
            'unit_of_time' => 'nullable|integer|in:0,1,60,3600,86400',
            'program_records' => 'array'
        ];
    }
}
