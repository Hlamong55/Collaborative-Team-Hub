"use client";

import { useWorkspaceStore } from "../../../../../lib/store";
import { updateTaskStatus } from "../../../../../lib/api";

export default function TaskList() {
  const { tasks, currentWorkspace, updateTask } =
    useWorkspaceStore();

  if (!tasks || tasks.length === 0) {
    return (
      <p className="text-gray-400 text-sm">
        No tasks yet
      </p>
    );
  }

  const handleToggle = async (t) => {
    const newStatus = t.status === "TODO" ? "DONE" : "TODO";

    try {
      const updated = await updateTaskStatus(
        currentWorkspace.id,
        t.id,
        newStatus
      );

      updateTask(updated);
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="space-y-3">

      {tasks.map((t) => (
        <div
          key={t.id}
          onClick={() => handleToggle(t)}
          className="bg-white/5 p-4 rounded-xl border border-white/10 cursor-pointer hover:border-purple-500 transition"
        >
          <p className="font-medium">{t.title}</p>

          <div className="flex gap-2 mt-2 text-xs">

            <span
              className={`px-2 py-1 rounded ${
                t.status === "DONE"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {t.status}
            </span>

            <span className="bg-pink-500/20 text-pink-400 px-2 py-1 rounded">
              {t.priority}
            </span>

            {t.goal && (
              <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                {t.goal.title}
              </span>
            )}

          </div>
        </div>
      ))}

    </div>
  );
}