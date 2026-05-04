"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getWorkspaceById,
  getGoals,
  createGoal,
  getTasks,
  createTask,
  updateTaskStatus,
} from "../../../../lib/api";

import { useWorkspaceStore } from "../../../../lib/store";
import MemberList from "./members/MemberList";

export default function WorkspacePage() {
  const { id } = useParams();

  const {
    currentWorkspace,
    goals,
    tasks,
    setWorkspace,
    setGoals,
    setTasks,
    addGoal,
    addTask,
    updateTask,
  } = useWorkspaceStore();

  const [goalTitle, setGoalTitle] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    if (id) load();
  }, [id]);

  const load = async () => {
    const ws = await getWorkspaceById(id);
    const gs = await getGoals(id);
    const ts = await getTasks(id);

    setWorkspace(ws);
    setGoals(gs);
    setTasks(ts);
  };

  /* ================= CREATE ================= */
  const handleCreateGoal = async () => {
    if (!goalTitle.trim()) return;

    const newGoal = await createGoal(id, { title: goalTitle });
    addGoal(newGoal);
    setGoalTitle("");
  };

  const handleCreateTask = async () => {
    if (!taskTitle.trim()) return;

    const newTask = await createTask(id, { title: taskTitle });
    addTask(newTask);
    setTaskTitle("");
  };

  /* ================= UI ================= */
  return (
    <div className="text-white p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">Workspace</p>
          <h1 className="text-2xl font-bold">
            {currentWorkspace?.name || "Loading..."}
          </h1>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE (GOALS + TASKS) */}
        <div className="lg:col-span-2 space-y-6">

          {/* GOALS */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h2 className="font-semibold mb-4 text-lg">Goals</h2>

            {/* CREATE */}
            <div className="flex gap-2 mb-4">
              <input
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
                placeholder="New goal..."
                className="px-3 py-2 bg-white/10 rounded w-full outline-none"
              />
              <button
                onClick={handleCreateGoal}
                className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 rounded font-medium hover:scale-105 transition"
              >
                +Add
              </button>
            </div>

            {/* LIST */}
            <div className="space-y-3">
              {goals.map((g) => (
                <div
                  key={g.id}
                  className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-purple-500 transition"
                >
                  <div className="flex justify-between">
                    <p className="font-medium">{g.title}</p>
                    <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">
                      {g.status}
                    </span>
                  </div>

                  {g.dueDate && (
                    <p className="text-xs text-gray-400 mt-2">
                      Due: {new Date(g.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}

              {goals.length === 0 && (
                <p className="text-gray-500 text-sm italic">
                  No goals yet 🚀
                </p>
              )}
            </div>
          </div>

          {/* TASKS */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h2 className="font-semibold mb-4 text-lg">Tasks</h2>

            {/* CREATE */}
            <div className="flex gap-2 mb-4">
              <input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="New task..."
                className="px-3 py-2 bg-white/10 rounded w-full outline-none"
              />
              <button
                onClick={handleCreateTask}
                className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 rounded font-medium hover:scale-105 transition"
              >
                +Add
              </button>
            </div>

            {/* LIST */}
            <div className="space-y-3">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  onClick={async () => {
                    const newStatus =
                      t.status === "TODO" ? "DONE" : "TODO";

                    await updateTaskStatus(id, t.id, newStatus);
                    updateTask(t.id, { status: newStatus });
                  }}
                  className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-pink-500 transition cursor-pointer"
                >
                  <p
                    className={`font-medium ${
                      t.status === "DONE"
                        ? "line-through text-gray-500"
                        : "text-white"
                    }`}
                  >
                    {t.title}
                  </p>

                  <div className="flex gap-2 mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        t.status === "DONE"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {t.status}
                    </span>

                    <span className="text-xs px-2 py-1 rounded bg-pink-500/20 text-pink-400">
                      {t.priority}
                    </span>
                  </div>
                </div>
              ))}

              {tasks.length === 0 && (
                <p className="text-gray-500 text-sm italic">
                  No tasks yet 🚀
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (MEMBERS) */}
        <div className="space-y-6">
          <MemberList workspaceId={id} />
        </div>
      </div>
    </div>
  );
}