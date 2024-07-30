<?php

namespace App\Models;

use App\Models\Template;
use App\Models\FacebookConversation;
use Illuminate\Support\Facades\Http;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FacebookPage extends Model
{
    use HasFactory;
    protected $fillable = ["facebook_page_id", "name", "access_token", "type", "expired_at"];
    
    public function Send_Template(Template $template, FacebookConversation $conversation)
    {
        try{
            if($template->message != null){
                $response = Http::post('https://graph.facebook.com/v19.0/me/messages', [
                    'access_token' => $this->access_token,
                    'messaging_type' => 'MESSAGE_TAG',
                    'recipient' => ['id' => $conversation->facebook_user_id],
                    'message' => ['text' => $template->message],
                    'tag' => 'ACCOUNT_UPDATE'
                ]);
            }
            $send = [];

            if ($template->photos != null) {
                foreach (explode(',', $template->photos) as $photo) {
                    $send[] = ["type" => "image", "content" => $photo];
                }
            }
    
            if ($template->videos != null) {
                foreach (explode(',', $template->videos) as $video) {
                    $send[] = ["type" => "video", "content" => $video];
                }
            }
    
            if ($template->audios != null) {
                foreach (explode(',', $template->audios) as $audio) {
                    $send[] = ["type" => "audio", "content" => $audio];
                }
            }

            foreach($send as $data){
                $response = Http::post('https://graph.facebook.com/v19.0/me/messages', [
                    'access_token' => $this->access_token,
                    'messaging_type' => 'MESSAGE_TAG',
                    'recipient' => ['id' => $conversation->facebook_user_id],
                    'message' => [
                        'attachment' => [
                            'type' =>  $data['type'],
                            "payload" => [
                                'url' => $data['content'],
                            ],
                        ]
                    ],
                    'tag' => 'ACCOUNT_UPDATE'
                ]);
            }
            return true;
            
        } catch (\Exception $e) {
            \Log::error('Failed to send template: ' . $e->getMessage());
            return false;
        }
    }
}
