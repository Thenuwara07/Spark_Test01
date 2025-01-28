<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    public function run()
    {
        $users = [];

        for ($i = 1; $i <= 10; $i++) {
            $users[] = [
                'name'              => 'User ' . $i,
                'email'             => 'user' . $i . '@example.com',
                'email_verified_at' => $i % 2 == 0 ? Carbon::now() : null, // Verify every other user
                'password'          => Hash::make('123456AA'), // Default password for all users
                'remember_token'    => Str::random(10),
                'created_at'        => Carbon::now(),
                'updated_at'        => Carbon::now(),
            ];
        }

        DB::table('users')->insert($users);
    }
}
