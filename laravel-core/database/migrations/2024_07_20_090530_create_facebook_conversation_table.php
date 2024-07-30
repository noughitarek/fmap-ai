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
        Schema::create('facebook_conversations', function (Blueprint $table) {
            $table->id();
            $table->string('facebook_user_id')->unique()->index();
            $table->string('facebook_conversation_id')->unique()->index();
            $table->string('facebook_page_id')->nullable()->index();

            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->boolean('can_reply');
            
            $table->foreignId('program_id')->nullable()->constrained('programs');

            $table->string('last_from');

            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->timestamp('last_from_page_at')->nullable();
            $table->timestamp('last_from_user_at')->nullable();
            
            $table->integer('total_user_messages')->nullable()->default(0);
            $table->integer('total_page_messages')->nullable()->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facebook_conversations');
    }
};
