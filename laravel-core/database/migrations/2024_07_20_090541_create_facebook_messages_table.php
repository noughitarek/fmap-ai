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
        Schema::create('facebook_messages', function (Blueprint $table) {
            $table->id();

            $table->string('facebook_conversation_id')->index();
            $table->string('facebook_message_id')->unique()->index();

            $table->string('sented_from');
            $table->text('message');

            $table->timestamps();

            $table->fullText('message');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facebook_messages');
    }
};
