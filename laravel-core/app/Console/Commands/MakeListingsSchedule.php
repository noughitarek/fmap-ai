<?php

namespace App\Console\Commands;

use App\Models\Photo;
use App\Models\Title;
use App\Models\Account;
use App\Models\Listing;
use App\Models\Posting;
use App\Models\Description;
use App\Models\ListingsPhoto;
use App\Models\PostingsPrices;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MakeListingsSchedule extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:make-listings-schedule';

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
        DB::beginTransaction();
        
        try{
            $postings = Posting::with("accounts")
            ->whereNull("deleted_at")
            ->whereNull("deleted_by")
            ->where("is_active", 1)
            ->get();
            
            foreach($postings as $posting){

                foreach($posting->accountsGroup->accounts as $account){
                    
                    $posting = Posting::with(
                        "titlesGroup",
                        "postingPrices",
                        "descriptionsGroup",
                        "photosGroup"
                    )->find($posting->id);

                    $account = Account::find($account->id);
                    
                    $stills = $posting->max_per_day - Listing::where("account_id", $account->id)
                    ->where("posting_id", $posting->id)
                    ->where("post_at", "<", now()->addDay())
                    ->count();
                    
                    while($stills > 0){
                        
                        $listing = Listing::create([
                            "posting_id" => $posting->id,
                            "account_id" => $account->id,
                            "title_id" => Title::whereIn("id", $posting->titlesGroup->titles()->pluck("id"))->inRandomOrder()->first()->id,
                            "postings_price_id" => PostingsPrices::whereIn("id", $posting->postingPrices()->pluck("id"))->inRandomOrder()->first()->id,
                            "description_id" => $posting->descriptionsGroup?Description::whereIn("id", $posting->descriptionsGroup->descriptions()->pluck("id"))->inRandomOrder()->first()->id:null,
                            "post_at" => now()->addMinutes(5),
                        ]);
                        
                        if($listing){
                            
                            for($i=0;$i<$posting->photo_per_listing;$i++){
                                $postedPhotos = ListingsPhoto::whereIn('listing_id', Listing::where('account_id', $listing->account_id)->pluck('id'))->pluck('photo_id');
                                $groupPhotos = $posting->photosGroup->photos()->pluck("id");

                                $photo = Photo::whereIn("id", $groupPhotos)
                                ->whereNotIn("id", $postedPhotos)   
                                ->inRandomOrder()
                                ->first()
                                ->id;
                                if($photo){
                                    ListingsPhoto::create([
                                        "photo_id" => $photo,
                                        "listing_id" => $listing->id,
                                    ]);
                                }else{
                                    continue;
                                }
                            }

                            $stills = $posting->max_per_day - Listing::where("account_id", $account->id)
                            ->where("posting_id", $posting->id)
                            ->where("post_at", "<", now()->addDay())
                            ->count();

                        } else {
                            DB::rollBack();
                            return $this->error('Group of photos could not be created.');
                        }
                    }
                }
            }
            DB::commit();
            return $this->info('Group of photos created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error in MakeListingsSchedule command: ' . $e->getMessage());
            return $this->error('An error occurred while creating listings.'."\n".$e->getMessage());
        }
    }
}
