<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if(!Schema::hasTable('listings')){
            Schema::create('listings', function (Blueprint $table) {
                $table->id();

                $table->foreignId('posting_id')->constrained('postings');
                $table->foreignId('commune_id')->constrained('communes')->nullable();
                
                $table->foreignId('account_id')->constrained('accounts');
                $table->foreignId('title_id')->constrained('titles');
                $table->foreignId('postings_price_id')->constrained('postings_prices');
                $table->foreignId('description_id')->nullable()->constrained('descriptions');
                
                $table->timestamp('post_at');
                $table->timestamp('posted_at')->nullable();

                $table->timestamps();
            });
        }else{
            Schema::table('listings', function (Blueprint $table) {
                if (!Schema::hasColumn('listings', 'commune_id')) {
                    $table->foreignId('commune_id')->constrained('communes')->after('posting_id')->nullable();
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listings');
    }
};
