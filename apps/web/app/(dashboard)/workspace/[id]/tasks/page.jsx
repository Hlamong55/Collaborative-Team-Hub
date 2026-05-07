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
          className="font-semibold bg-purple-700 px-3.5 py-1 rounded-lg hover:bg-purple-600 hover:scale-105 transition"
        >
          {view === "list" ? "Kanban" : "List"}
        </button>
      </div>

      {view === "list" ? <TaskList /> : <KanbanBoard />}
    </div>
  );
}