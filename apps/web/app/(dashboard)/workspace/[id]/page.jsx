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
import GoalCard from "./components/GoalCard";

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
  const [loading, setLoading] = useState(true);
  const [taskGoalId, setTaskGoalId] = useState("");

  useEffect(() => {
    if (id) load();
  }, [id]);

  const load = async () => {
    try {
      setLoading(true);

      const ws = await getWorkspaceById(id);
      const gs = await getGoals(id);
      const ts = await getTasks(id);

      setWorkspace(ws);
      setGoals(gs);
      setTasks(ts);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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

  const handleAddTask = async () => {
    try {
      if (!taskTitle.trim()) return;

      const t = await createTask(workspaceId, {
        title: taskTitle,
        goalId: taskGoalId || null,
      });

      setTasks([...tasks, t]);
      setTaskTitle("");
      setTaskGoalId("");
    } catch (err) {
      alert("Task create failed");
    }
  };

  /* ================= UI ================= */
  if (loading) {
    return (
      <div className="text-white p-6">
        <p className="text-xl font-medium text-gray-400 animate-pulse">
          Loading workspace...
        </p>
      </div>
    );
  }

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
            <div className="space-y-4">
              {goals.map((g) => (
                <GoalCard
                  key={g.id}
                  goal={g}
                  onUpdate={(goalId, updated) => {
                    setGoals(
                      goals.map((x) =>
                        x.id === goalId ? { ...x, ...updated } : x,
                      ),
                    );
                  }}
                />
              ))}

              {goals.length === 0 && (
                <p className="text-gray-500 text-sm italic">No goals yet 🚀</p>
              )}
            </div>
          </div>

          {/* TASKS */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h2 className="font-semibold mb-4 text-lg">Tasks</h2>

            {/* CREATE */}
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="New task..."
                className="flex-1 px-3 py-2 rounded bg-white/10 outline-none"
              />

              {/* GOAL DROPDOWN */}
              <select
                value={taskGoalId}
                onChange={(e) => setTaskGoalId(e.target.value)}
                className="px-3 py-2 rounded bg-slate-800 text-white border border-white/10 outline-none"
              >
                <option value="" className="bg-slate-800 text-white">
                  No Goal
                </option>

                {goals.map((g) => (
                  <option
                    key={g.id}
                    value={g.id}
                    className="bg-slate-800 text-white"
                  >
                    {g.title}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddTask}
                className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 rounded"
              >
                +Add
              </button>
            </div>

            {/* LIST */}
            <div className="space-y-3 mt-4">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() =>
                    updateTaskStatus(
                      workspaceId,
                      t.id,
                      t.status === "TODO" ? "DONE" : "TODO",
                    )
                  }
                  className="bg-white/5 p-4 rounded-xl border border-white/10 cursor-pointer hover:border-purple-400 transition"
                >
                  <p className="font-medium">{t.title}</p>

                  <div className="flex gap-2 mt-2 text-xs">
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {t.status}
                    </span>

                    <span className="bg-pink-500/20 text-pink-400 px-2 py-1 rounded">
                      {t.priority}
                    </span>

                    {/* 🔥 GOAL TAG */}
                    {t.goal && (
                      <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                        {t.goal.title}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {tasks.length === 0 && (
                <p className="text-gray-500 text-sm italic">No tasks yet 🚀</p>
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
