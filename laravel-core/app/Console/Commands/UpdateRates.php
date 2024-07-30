<?php

namespace App\Console\Commands;

use App\Models\Program;
use App\Models\Template;
use App\Models\ProgramsGroup;
use App\Models\TemplatesGroup;
use Illuminate\Console\Command;
use App\Models\RemarketingMessage;
use App\Models\FacebookConversation;
use App\Models\FacebookMessage; // Import FacebookMessage model

class UpdateRates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-rates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update remarketing message and template group statistics';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Fetch all Facebook messages matching the given pattern
        $orders_messages = FacebookMessage::with('facebook_conversation')
        ->where('message', 'like', '%سجلت الطلبية تاعك خلي برك الهاتف مفتوح باه يعيطلك الليفرور و ما تنساش الطلبية على خاطر رانا نخلصو عليها جزاك الله%')
        ->get();


        Template::query()->update(['total_used' => 0, 'total_orders' => 0]);
        Program::query()->update(['total_used' => 0, 'total_orders' => 0]);
        
        // Loop through each order message
        foreach ($orders_messages as $order_message) {
            // Get the most recent remarketing message before the order
            $remarketing_message = RemarketingMessage::where('facebook_conversation', $order_message->facebook_conversation->id) // Match the same Facebook conversation
                ->where('sent_at', '<', $order_message->created_at) // Sent before the order message creation time
                ->orderBy('sent_at', 'desc') // Order by sent_at in descending order to get the most recent one
                ->first(); // Get the first result (most recent)*/

            // If a remarketing message is found, increment the total orders
            if ($remarketing_message) {
                $remarketing_message->template_row->total_orders += 1;
                $remarketing_message->template_row->save(); // Save the updated total_orders value

                
                $remarketing_message->conversation->program->total_orders += 1;
                $remarketing_message->conversation->program->save();
            }
        }

        $this->UpdateTemplates();
        $this->UpdatePrograms();
    }
    
    public function UpdatePrograms(){
        // Fetch all progrm groups that are not deleted
        $groups = ProgramsGroup::whereNull('deleted_by')
            ->whereNull('deleted_at')
            ->get();

        // Loop through each group
        foreach ($groups as $group) {
            $totalGrp = 0;
            $totalOrdsGrp = 0;

            // Loop through each program in the group
            foreach ($group->programs as $program) {
                // Fetch all remarketing messages for the program that have been sent
                $conversations_ids = FacebookConversation::where('program_id', $program->id)->pluck('id');
                $messages = RemarketingMessage::whereIn('facebook_conversation', $conversations_ids)
                ->whereNotNull('sent_at')
                ->get();

                $total = $messages->count();
                $totalOrds = $program->total_orders;

                // Update the total used for the program
                $program->total_used = $total;
                $program->save(); // Save the updated total_used value

                $totalGrp += $total;
                $totalOrdsGrp += $totalOrds;
            }

            // Update the totals for the group
            $group->total_used = $totalGrp;
            $group->total_orders = $totalOrdsGrp;
            $group->save(); // Save the updated totals for the group
        }
    }

    public function UpdateTemplates(){
        // Fetch all template groups that are not deleted
        $groups = TemplatesGroup::whereNull('deleted_by')
            ->whereNull('deleted_at')
            ->get();

        // Loop through each group
        foreach ($groups as $group) {
            $totalGrp = 0;
            $totalOrdsGrp = 0;

            // Loop through each template in the group
            foreach ($group->templates as $template) {
                // Fetch all remarketing messages for the template that have been sent
                $messages = RemarketingMessage::where('template', $template->id)
                    ->whereNotNull('sent_at')
                    ->get();

                $total = $messages->count();
                $totalOrds = $template->total_orders;

                // Update the total used for the template
                $template->total_used = $total;
                $template->save(); // Save the updated total_used value

                $totalGrp += $total;
                $totalOrdsGrp += $totalOrds;
            }

            // Update the totals for the group
            $group->total_used = $totalGrp;
            $group->total_orders = $totalOrdsGrp;
            $group->save(); // Save the updated totals for the group
        }
    }
}
