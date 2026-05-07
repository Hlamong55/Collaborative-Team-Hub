"use client";

import TaskList from "./TaskList";
import KanbanBoard from "./KanbanBoard";
import { useState } from "react";

export default function TasksPage() {
  const [view, setView] = useState("list");

  return (
    <div className="text-white p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Tasks</h1>

        <button
          onClick={() =>
            setView(view === "list" ? "kanban" : "list")
          }
          className="bg-purple-600 px-3 py-1 rounded"
        >
          {view === "list" ? "Kanban" : "List"}
        </button>
      </div>

      {view === "list" ? <TaskList /> : <KanbanBoard />}
    </div>
  );
}