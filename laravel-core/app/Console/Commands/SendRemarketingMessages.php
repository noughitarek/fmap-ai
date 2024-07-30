<?php

namespace App\Console\Commands;

use App\Models\Remarketing;
use Illuminate\Console\Command;
use App\Models\RemarketingMessage;

class SendRemarketingMessages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-remarketing-messages';

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
            $currentTimePlus60Seconds = now()->addSeconds(60);
            $messages = RemarketingMessage::with('conversation', 'template_row')->where('remarketing', $remarketing->id)
            ->whereNull('sent_at')
            ->whereNotNull('template')
            ->where('send_at', "<", $currentTimePlus60Seconds)
            ->get();
            
            foreach($messages as $message){
                if($message->conversation->page->Send_Template($message->template_row, $message->conversation)){
                    $message->sent_at = now();
                    $message->save();
                }
            }
        }
    }
}
