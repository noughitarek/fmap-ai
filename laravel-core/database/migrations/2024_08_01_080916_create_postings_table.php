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
        Schema::create('postings', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->text('description')->nullable();
            $table->foreignId('postings_category_id')->constrained('postings_categories')->onDelete('cascade');
            
            $table->integer('max_per_day')->default(120);
            $table->integer('photo_per_listing')->default(1);

            $table->foreignId('accounts_group_id')->constrained('accounts_groups');
            $table->foreignId('titles_group_id')->constrained('titles_groups');
            $table->foreignId('photos_group_id')->constrained('photos_groups');
            $table->foreignId('descriptions_group_id')->nullable()->constrained('descriptions_groups');
            
            $table->integer('expire_after')->default(0);
            $table->integer('total_listings')->default(0);
            $table->integer('total_messages')->default(0);
            $table->integer('total_orders')->default(0);
            
            $table->boolean('is_active')->default(false);

            $table->foreignId('created_by')->constrained('users');
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
        Schema::dropIfExists('postings');
    }
};
