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
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->longText('description')->nullable();
            $table->foreignId('accounts_group_id')->constrained('accounts_groups')->onDelete('cascade');

            $table->string('facebook_user_id')->index();
            
            $table->string('username')->index();
            $table->string('password');
            
            $table->integer('total_listings')->default(0);
            $table->integer('total_messages')->default(0);
            $table->integer('total_orders')->default(0);

            $table->timestamp('drop_listings_at')->nullable();

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
        Schema::dropIfExists('accounts');
    }
};
