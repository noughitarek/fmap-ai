<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramRecord extends Model
{
    use HasFactory;
    protected $fillable = ["template_id", "templates_group_id", "program_id", "send_after"];

    public function template()
    {
        return $this->belongsTo(Template::class, 'template_id');
    }
    public function group()
    {
        return $this->belongsTo(TemplatesGroup::class, 'templates_group_id');
    }
    public function program()
    {
        return $this->belongsTo(Program::class, 'program_id');
    }
}
