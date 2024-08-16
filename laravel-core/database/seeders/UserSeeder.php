<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
