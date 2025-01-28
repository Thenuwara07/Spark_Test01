<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;
use Illuminate\Routing\Controllers\HasMiddleware; 
use Illuminate\Routing\Controllers\Middleware;
class TaskController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return[
            new Middleware('auth:sanctum', except: ['index', 'show', 'status'])
        ];
    }
    //Display task list
    public function index()
    {
        // return Post::all();
        return Task::with('user')->where('user_id', auth()->id())->latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'task_name' => 'required|max:255',
        ]);
        // Task::create($fields);
        // return $fields;

        $task = $request->user()->tasks()->create($fields);

        return  ['task' => $task, 'user' => $task->user];
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return  ['task' => $task, 'user' => $task->user];

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $fields = $request->validate([
            'task_name' => 'required|max:255',
        ]);

        $task ->update($fields);

        return $task;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return [
            'message' => 'Task deleted successfully'
        ];
    }

    public function status($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Perform the desired "out" logic, e.g., marking the user as inactive.
        if ($task->status == 'pending') {
            $task->status = 'done';
        }

        $task->save();

        return response()->json(['message' => 'task status updated to done', 'task' => $task]);
    }
}
