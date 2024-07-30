<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Inbound;
use App\Models\Product;
use App\Models\Service;
use App\Models\Outbound;
use App\Models\Rubrique;
use App\Models\Supplier;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'System',
            'email' => 'noughitarek@gmail.com',
            'role' => 'System',
            'password' => Hash::make('password2'),
        ]);
        User::factory()->create([
            'name' => 'Younes',
            'email' => 'younes@gmail.com',
            'role' => 'Manager',
            'password' => Hash::make('password'),
        ]);
    }

}
