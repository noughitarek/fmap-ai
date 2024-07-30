<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FacebookConversation extends Model
{
    use HasFactory;
    protected $fillable = ["facebook_user_id", "facebook_conversation_id", "facebook_page_id", "name", "email", "can_reply", "program_id", "last_from", "started_at", "ended_at", "last_from_page_at", "last_from_user_at"];
    
    /**
     * Create or update a Facebook conversation.
     *
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Model
     */
    public static function createOrUpdate(array $data)
    {
        if (!isset($data['facebook_user_id']) || !isset($data['facebook_conversation_id'])) {
            throw new InvalidArgumentException('Required data keys are missing.');
        }
        
        $conversation = self::where('facebook_user_id', $data['facebook_user_id'])->where('facebook_conversation_id', $data['facebook_conversation_id'])->first();
        
        if($conversation){
            $conversation->update($data);
        }else{
            $conversation = self::create($data);
        }

        return $conversation;
    }
    public function program()
    {
        return $this->belongsTo(Program::class, 'program_id');
    }
    public function page()
    {
        return $this->belongsTo(FacebookPage::class, 'facebook_page_id', 'facebook_page_id');
    }
    public function remarketing_messages()
    {
        return $this->hasMany(RemarketingMessage::class, 'facebook_conversation')->orderby('send_at', 'asc');
    }

}
