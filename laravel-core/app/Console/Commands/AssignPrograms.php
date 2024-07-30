<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Remarketing;
use Illuminate\Console\Command;
use App\Models\RemarketingMessage;
use App\Models\FacebookConversation;

class AssignPrograms extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:assign-programs';

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
        $min_pourc = config('settings.minimum_pourcentage');

        $remarketings = Remarketing::whereNull('deleted_at')->whereNull('deleted_by')->where('is_active', true)->take(config('settings.max_per_minute'))->get();
        
        foreach($remarketings as $remarketing){
            $conversations = FacebookConversation::whereNull('program_id')
            ->where('facebook_page_id', $remarketing->facebookPage->facebook_page_id)
            ->where('started_at', '>', $remarketing->created_at)
            ->get();
            
            foreach($conversations as $conversation){

                $programs = $remarketing->programsGroup->programs;
                $total_orders = $programs->sum('total_orders');
                $total_programs = $programs->count();
                
                if ($total_programs > 0) {
                    if($total_programs*$min_pourc > 100){
                        $min_pourc = 75/$total_programs;
                    }
                    
                    $programsPourcentage = [];
                    foreach($programs as $program){
                        $programPourcentage = [];
                        $programPourcentage['program'] = $program->id;
                        if($total_orders == 0){
                            $programPourcentage['pourcentage'] = 100/$total_programs;;
                        }else{
                            $programPourcentage['pourcentage'] = $min_pourc + (100 - $total_programs * $min_pourc) * $program->total_orders / $total_orders;
                        }
                        $programsPourcentage[] = $programPourcentage;
                    }

                    $random = rand(0, 100);
                    $cumulativePercentage = 0;

                    foreach ($programsPourcentage as $programPourcentage) {
                        $cumulativePercentage += $programPourcentage['pourcentage'];
                        if ($random <= $cumulativePercentage) {
                            $conversation->program_id = $programPourcentage['program'];
                            break;
                        }
                    }

                }else {
                    $conversation->program_id = null;
                }
                $conversation->save();
                $this->schudle_messages($remarketing, $conversation);
            }
        }

    }
    private function schudle_messages(Remarketing $remarketing, FacebookConversation $conversation)
    {
        foreach($conversation->program->records as $record)
        {
            $startedAt = Carbon::parse($conversation->started_at);
            $sendAt = $startedAt->copy()->addSeconds($record->send_after);
            
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
