<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Remarketing;
use Illuminate\Console\Command;
use App\Models\RemarketingMessage;
use App\Models\FacebookConversation;

class ReschudleMessages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:reschudle-messages';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {

        $remarketings = Remarketing::whereNull('deleted_at')->whereNull('deleted_by')->where('is_active', true)->get();
        
        foreach($remarketings as $remarketing){


            $conversations = FacebookConversation::whereNotNull('program_id')
            ->where('facebook_page_id', $remarketing->facebookPage->facebook_page_id)
            ->get();
            foreach($conversations as $conversation){

                $maxSendAt = RemarketingMessage::where('facebook_conversation', $conversation->id)->max("send_at");

                $maxSendAt = Carbon::parse($maxSendAt);
                $program = $conversation->program;

                if (now()->greaterThan($maxSendAt->copy()->addSeconds($conversation->program->reuse_after))) {

                    RemarketingMessage::where('facebook_conversation', $conversation->id)
                    ->update(['archived' => true]);
                    foreach($conversation->program->records as $record){
                        $sendAt = now()->addSeconds($record->send_after);
                        
                        RemarketingMessage::create([
                            "remarketing" => $remarketing->id,
                            "template" => $record->template->id??null,
                            "templates_group" => $record->group->id??$remarketing->templates_group_id,
                            "facebook_conversation" => $conversation->id,
                            "send_at" => $sendAt,
                            "sent_at" => null
                        ]);
                    }
                }
            }
        }
    }
}
