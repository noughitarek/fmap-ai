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
        Schema::create('remarketings', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->text('description')->nullable();
            
            $table->string('facebook_page_id')->index();
            $table->foreignId('programs_group_id')->constrained('programs_groups');
            $table->foreignId('templates_group_id')->constrained('templates_groups');

            $table->foreignId('category')->constrained('remarketings_categories');
            $table->boolean('is_active')->default(false);

            $table->foreignId('created_by')->nullable()->constrained('users');
            $table->foreignId('updated_by')->nullable()->constrained('users');
            $table->foreignId('deleted_by')->nullable()->constrained('users');
            $table->timestamp('deleted_at')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('remarketings');
    }
};
