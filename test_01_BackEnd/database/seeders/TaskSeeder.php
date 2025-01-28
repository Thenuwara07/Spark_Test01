<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TaskSeeder extends Seeder
{
    public function run()
    {
        $tasks = [];

        for ($i = 1; $i <= 10; $i++) {
            $tasks[] = [
                'user_id'    => rand(1, 5), // Assign task to random user (assuming 5 users exist)
                'task_name'  => 'Task ' . $i,
                'status'     => $i % 2 == 0 ? 'done' : 'pending', // Alternate between "pending" and "done"
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        DB::table('tasks')->insert($tasks);
    }
}
