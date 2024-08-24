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
        Schema::create('listings_photos', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('photo_id')->constrained('photos');
            $table->foreignId('listing_id')->constrained('listings');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listings_photos');
    }
};
