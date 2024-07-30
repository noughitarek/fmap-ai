<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RemarketingMessage extends Model
{
    use HasFactory;
    protected $fillable = ["archived", "remarketing", "template", "templates_group", "facebook_conversation", "send_at", "sent_at"];

    public function template_row()
    {
        return $this->belongsTo(Template::class, 'template');
    }
    public function templates_group()
    {
        return $this->belongsTo(TemplatesGroup::class, 'templates_group');
    }
    public function remarketing()
    {
        return $this->belongsTo(Remarketing::class, 'remarketing');
    }
    public function conversation()
    {
        return $this->belongsTo(FacebookConversation::class, 'facebook_conversation');
    }
    
}
