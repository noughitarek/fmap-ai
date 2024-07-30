<?php

namespace App\Console\Commands;

use App\Models\Template;
use App\Models\Remarketing;
use App\Models\TemplatesGroup;
use Illuminate\Console\Command;
use App\Models\RemarketingMessage;
use App\Models\FacebookConversation;

class AssignTemplates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:assign-templates';

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

        $currentTimePlus120Seconds = now()->addSeconds(120);
        foreach($remarketings as $remarketing){
            $messages = RemarketingMessage::where('remarketing', $remarketing->id)
            ->whereNull('sent_at')
            ->where('send_at', "<", $currentTimePlus120Seconds)
            ->get();

            foreach($messages as $message){
                if($message->template == null){
                    $this->pick_template($message);
                }
            }

        }
    }
    public function pick_template($message)
    {
        $min_pourc = config('settings.minimum_pourcentage');
        
        $used_templates = RemarketingMessage::where('facebook_conversation', $message->facebook_conversation)
        ->whereNotNull('template')
        ->where('archived', 0)
        ->pluck('template');
        
        $templates = Template::whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->where('group_id', $message->templates_group)
        ->whereNotIn('id', $used_templates)
        ->get();

        $total_orders = $templates->sum('total_orders');
        $total_templates = $templates->count();

        if ($total_templates > 0) {
            if($total_templates*$min_pourc > 100){
                $min_pourc = 75/$total_templates;
            }
            
            $templatesPourcentage = [];
            foreach($templates as $template){
                $templatePourcentage = [];
                $templatePourcentage['template'] = $template->id;
                if($total_orders == 0){
                    $templatePourcentage['pourcentage'] = 100/$total_templates;;
                }else{
                    $templatePourcentage['pourcentage'] = $min_pourc + (100 - $total_templates * $min_pourc) * $template->total_orders / $total_orders;
                }
                $templatesPourcentage[] = $templatePourcentage;
            }

            $random = rand(0, 100);
            $cumulativePercentage = 0;

            foreach ($templatesPourcentage as $templatePourcentage) {
                $cumulativePercentage += $templatePourcentage['pourcentage'];
                if ($random <= $cumulativePercentage) {
                    $message->template = $templatePourcentage['template'];
                    break;
                }
            }

        }else {
            $message->template = null;
        }
        $message->save();
    }
}
