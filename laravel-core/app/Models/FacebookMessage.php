<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FacebookMessage extends Model
{
    use HasFactory;
    protected $fillable = ["facebook_conversation_id", "facebook_message_id", "sented_from", "message", "created_at"];

    /**
     * Create or update a Facebook message.
     *
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Model
     */
    public static function createOrUpdate(array $datas)
    {
        $messages = [];
        foreach($datas as $data)
        {
            if (!isset($data['facebook_message_id'])) {
                throw new InvalidArgumentException('Required data keys are missing.');
            }

            $message = self::where('facebook_message_id', $data['facebook_message_id'])->first();
            
            if($message){
                $message->update($data);
            }else{
                $message = self::create($data);
            }
            $messages[] = $message;
        }
        return $messages;
    }
    public function facebook_conversation()
    {
        return $this->belongsTo(FacebookConversation::class, 'facebook_conversation_id', 'facebook_conversation_id');
    }
}
