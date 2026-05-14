"use client";

import { useEffect, useState } from "react";

import {
  getGoals,
  createGoal,
  createMilestone,
  updateMilestone,
} from "../../../../../lib/api";

import { useWorkspaceStore } from "../../../../../lib/store";

export default function GoalsPage() {
  const { currentWorkspace } = useWorkspaceStore();

  const [goals, setGoals] = useState([]);

  const [goalTitle, setGoalTitle] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [milestoneInputs, setMilestoneInputs] = useState({});

  /* ================= LOAD ================= */

  const loadGoals = async () => {
    if (!currentWorkspace) return;

    const data = await getGoals(currentWorkspace.id);

    setGoals(data);
  };

  useEffect(() => {
    loadGoals();
  }, [currentWorkspace]);

  /* ================= CREATE GOAL ================= */

  const handleCreateGoal = async () => {
    if (!goalTitle.trim()) return;

    await createGoal(currentWorkspace.id, {
      title: goalTitle,
      dueDate,
    });

    setGoalTitle("");
    setDueDate("");

    loadGoals();
  };

  /* ================= CREATE MILESTONE ================= */

  const handleAddMilestone = async (goalId) => {
    const title = milestoneInputs[goalId];

    if (!title?.trim()) return;

    await createMilestone(goalId, { title });

    setMilestoneInputs((prev) => ({
      ...prev,
      [goalId]: "",
    }));

    loadGoals();
  };

  /* ================= TOGGLE ================= */

  const handleToggleMilestone = async (milestone) => {
    await updateMilestone(
      milestone.id,

      milestone.status === "DONE" ? "TODO" : "DONE",
    );

    loadGoals();
  };

  /* ================= UI ================= */

  return (
    <div className="text-white p-6">
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Goals</h1>

        <p className="text-gray-400 mt-1">
          Track project progress and milestones
        </p>
      </div>

      {/* CREATE */}

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">
        <h2 className="font-semibold mb-4">Create Goal</h2>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            value={goalTitle}
            onChange={(e) => setGoalTitle(e.target.value)}
            placeholder="Goal title..."
            className="
              flex-1
              bg-white/10
              px-4
              py-3
              rounded-xl
              outline-none
            "
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="
              bg-white/10
              px-4
              py-3
              rounded-xl
              outline-none
            "
          />

          <button
            onClick={handleCreateGoal}
            className="
              bg-gradient-to-r
              from-purple-600
              to-pink-600
              px-6
              rounded-xl
              font-semibold
              hover:scale-105
              transition
            "
          >
            Create
          </button>
        </div>
      </div>

      {/* GOALS */}

      <div className="space-y-6">
        {goals.map((g) => {
          const total = g.milestones?.length || 0;

          const done =
            g.milestones?.filter((m) => m.status === "DONE").length || 0;

          const progress = total === 0 ? 0 : Math.round((done / total) * 100);

          return (
            <div
              key={g.id}
              className="
                bg-white/5
                border
                border-white/10
                rounded-2xl
                p-5
                hover:border-purple-500/40
                transition
              "
            >
              {/* TOP */}

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">{g.title}</h2>

                  <div className="flex flex-wrap gap-8 mt-3 text-sm text-gray-400">
                    {/* STATUS */}

                    <span>
                      Status:{" "}
                      <span
                        className={`
                          px-2
                          py-1
                          rounded-lg
                          text-xs
                          font-medium

                          ${
                            progress === 100
                              ? "bg-green-500/20 text-green-400"
                              : progress > 0
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }
                        `}
                      >
                        {progress === 100
                          ? "DONE"
                          : progress > 0
                            ? "IN_PROGRESS"
                            : "PENDING"}
                      </span>
                    </span>

                    {/* DATE */}

                    {g.dueDate && (
                      <span>
                        Due: {new Date(g.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* PROGRESS */}

                <div className="text-right">
                  <p className="text-sm text-gray-400 mb-1">Progress</p>

                  <p className="text-3xl font-bold text-green-400">
                    {progress}%
                  </p>
                </div>
              </div>

              {/* BAR */}

              <div className="mt-5">
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="
                      h-full
                      bg-gradient-to-r
                      from-purple-500
                      to-pink-500
                      transition-all
                      duration-500
                    "
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* MILESTONES */}

              <div className="mt-7">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Milestones</h3>

                  <span className="text-xs font-medium text-gray-300">
                    {done}/{total} completed
                  </span>
                </div>

                <div className="space-y-2">
                  {g.milestones?.map((m) => (
                    <div
                      key={m.id}
                      className="
                          flex
                          items-center
                          justify-between
                          bg-white/5
                          border
                          border-white/10
                          px-4
                          py-3
                          rounded-xl
                        "
                    >
                      <div className="flex items-center gap-3">
                        {/* TOGGLE */}

                        <button
                          onClick={() => handleToggleMilestone(m)}
                          className={`
                              w-6
                              h-6
                              rounded-full
                              border
                              flex
                              items-center
                              justify-center
                              transition

                              ${
                                m.status === "DONE"
                                  ? "bg-green-500 border-green-500"
                                  : "border-gray-400"
                              }
                            `}
                        >
                          {m.status === "DONE" && "✓"}
                        </button>

                        {/* TITLE */}

                        <p
                          className={
                            m.status === "DONE"
                              ? "line-through text-gray-500"
                              : ""
                          }
                        >
                          {m.title}
                        </p>
                      </div>

                      {/* BADGE */}

                      <span
                        className={`
                            text-xs
                            px-2
                            py-1
                            rounded

                            ${
                              m.status === "DONE"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }
                          `}
                      >
                        {m.status}
                      </span>
                    </div>
                  ))}

                  {/* EMPTY */}

                  {g.milestones?.length === 0 && (
                    <p className="text-sm text-gray-400 italic">No milestones yet</p>
                  )}
                </div>

                {/* ADD */}

                <div className="flex gap-2 mt-4">
                  <input
                    value={milestoneInputs[g.id] || ""}
                    onChange={(e) =>
                      setMilestoneInputs((prev) => ({
                        ...prev,
                        [g.id]: e.target.value,
                      }))
                    }
                    placeholder="Add milestone..."
                    className="
                      flex-1
                      bg-white/10
                      px-4
                      py-3
                      rounded-xl
                      outline-none
                    "
                  />

                  <button
                    onClick={() => handleAddMilestone(g.id)}
                    className="
                      bg-purple-600
                      hover:bg-purple-700 hover:scale-105
                      px-4
                      rounded-xl
                      font-medium
                      transition
                    "
                  >
                    +Add
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* EMPTY */}

        {goals.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
            <p className="text-gray-400">No goals created yet 🚀</p>
          </div>
        )}
      </div>
    </div>
  );
}
