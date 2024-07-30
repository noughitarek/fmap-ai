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
        Schema::create('program_records', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('template_id')->nullable()->constrained('templates');
            $table->foreignId('templates_group_id')->nullable()->constrained('templates_groups');
            $table->foreignId('program_id')->constrained('programs')->onDelete('cascade');
            $table->integer('send_after')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_records');
    }
};
