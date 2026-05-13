"use client";

import {
  useWorkspaceStore,
} from "../../../../../lib/store";

import {
  updateTaskStatus,
} from "../../../../../lib/api";

export default function TaskList() {

  const {
    tasks,
    currentWorkspace,
    updateTask,
  } = useWorkspaceStore();

  /* ================= STATUS ================= */

  const handleStatus = async (task) => {

    const next =
      task.status === "TODO"
        ? "IN_PROGRESS"
        : task.status === "IN_PROGRESS"
        ? "DONE"
        : "TODO";

    try {

      const updated =
        await updateTaskStatus(
          currentWorkspace.id,
          task.id,
          next
        );

      updateTask(task.id, updated);

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  /* ================= EMPTY ================= */

  if (!tasks.length) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">

        <p className="text-gray-400">
          No tasks yet 📝
        </p>

      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="space-y-4">

      {tasks.map((task) => (

        <div
          key={task.id}
          className="
            bg-white/5
            border
            border-white/10
            rounded-2xl
            p-5
            hover:bg-white/10
            transition
          "
        >

          {/* TOP */}
          <div className="flex justify-between items-start gap-4">

            <div>

              <h2 className="font-semibold text-lg">
                {task.title}
              </h2>

              <div className="flex flex-wrap gap-2 mt-3">

                {/* STATUS */}
                <span
                  className={`
                    text-xs
                    px-3
                    py-1
                    rounded-full
                    font-medium

                    ${
                      task.status === "TODO"
                        ? "bg-blue-500/20 text-blue-300"
                        : task.status === "IN_PROGRESS"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-green-500/20 text-green-300"
                    }
                  `}
                >
                  {task.status}
                </span>

                {/* PRIORITY */}
                <span
                  className={`
                    text-xs
                    px-3
                    py-1
                    rounded-full
                    font-medium

                    ${
                      task.priority === "HIGH"
                        ? "bg-red-500/20 text-red-300"
                        : task.priority === "MEDIUM"
                        ? "bg-orange-500/20 text-orange-300"
                        : "bg-gray-500/20 text-gray-300"
                    }
                  `}
                >
                  {task.priority}
                </span>

                {/* GOAL */}
                {task.goal && (
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
                    {task.goal.title}
                  </span>
                )}

              </div>

            </div>

            {/* ACTION */}
            <button
              onClick={() =>
                handleStatus(task)
              }

              className="
                bg-gradient-to-r
                from-purple-600
                to-pink-600
                px-4
                py-2
                rounded-xl
                text-sm
                font-medium
                hover:scale-105
                transition
              "
            >
              Move
            </button>

          </div>

          {/* BOTTOM */}
          <div className="flex justify-between items-center mt-5 text-xs text-gray-400">

            <div>

              {task.assignee?.name
                ? `Assigned to ${task.assignee.name}`
                : "Unassigned"}

            </div>

            <div>
              {new Date(
                task.createdAt
              ).toLocaleDateString()}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}