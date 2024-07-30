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
        Schema::create('remarketing_messages', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('remarketing')->constrained('remarketings');
            $table->foreignId('templates_group')->nullable()->constrained('templates_groups');
            $table->foreignId('template')->nullable()->constrained('templates');
            $table->foreignId('facebook_conversation')->constrained('facebook_conversations');

            $table->boolean('archived')->default(false);

            $table->timestamp('send_at');
            $table->timestamp('sent_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('remarketing_messages');
    }
};
