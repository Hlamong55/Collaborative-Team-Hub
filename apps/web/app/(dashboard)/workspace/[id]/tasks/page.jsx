"use client";

import TaskList from "../tasks/TaskList";

export default function TasksPage() {
  return (
    <div className="text-white p-6">
      <h1 className="text-xl font-bold mb-4">Tasks</h1>
      <TaskList />
    </div>
  );
}