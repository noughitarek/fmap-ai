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
        Schema::create('facebook_pages', function (Blueprint $table) {
            $table->id();
            $table->string('facebook_page_id')->unique()->index();
            
            $table->integer('total_user_messages')->nullable()->default(0);
            $table->integer('total_page_messages')->nullable()->default(0);
            $table->integer('total_conversations')->nullable()->default(0);
            $table->integer('total_orders')->nullable()->default(0);

            $table->string('name')->nullable();
            $table->string('type');
            
            $table->text('access_token');
            $table->timestamp('expired_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facebook_pages');
    }
};
