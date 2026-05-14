"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../../lib/axios";
import {
  getWorkspaceById,
  getGoals,
  createGoal,
  getTasks,
  createTask,
  updateTaskStatus,
} from "../../../../lib/api";

import { useWorkspaceStore, useAuthStore } from "../../../../lib/store";
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

  const user = useAuthStore((s) => s.user);

  const [goalTitle, setGoalTitle] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [taskGoalId, setTaskGoalId] = useState("");

  // ✅ NEW
  const [taskPriority, setTaskPriority] = useState("MEDIUM");

  const [loading, setLoading] = useState(true);
  const [myRole, setMyRole] = useState(null);

  useEffect(() => {
    if (id) {
      load();
      loadRole();
    }
  }, [id]);

  /* ================= LOAD DATA ================= */
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
      console.error(err);
      alert("Failed to load workspace");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOAD ROLE ================= */
  const loadRole = async () => {
    try {
      const res = await api.get(`/workspaces/${id}/members`);

      const me = res.data.find((m) => m.user.id === user?.id);

      setMyRole(me?.role);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= CREATE ================= */

  const handleCreateGoal = async () => {
    if (!goalTitle.trim()) return;

    try {
      const newGoal = await createGoal(id, {
        title: goalTitle,
      });

      addGoal(newGoal);
      setGoalTitle("");
    } catch (err) {
      alert("Goal create failed");
    }
  };

  const handleAddTask = async () => {
    try {
      if (!taskTitle.trim()) return;

      const t = await createTask(id, {
        title: taskTitle,
        goalId: taskGoalId || null,

        // ✅ NEW
        priority: taskPriority,
      });

      addTask(t);

      setTaskTitle("");
      setTaskGoalId("");

      // ✅ RESET
      setTaskPriority("MEDIUM");

    } catch (err) {
      alert("Task create failed");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="text-white p-6">
        <p className="text-xl text-gray-400 animate-pulse">
          Loading workspace...
        </p>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="text-white p-6 space-y-6">

      {/* HEADER */}
      <div>
        <p className="text-sm text-gray-400">
          Workspace
        </p>

        <h1 className="text-2xl font-bold">
          {currentWorkspace?.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* GOALS */}
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10">

            <h2 className="mb-4 text-lg font-semibold">
              Goals
            </h2>

            {/* CREATE */}
            <div className="flex gap-2 mb-4">

              <input
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
                placeholder="New goal..."
                className="px-3 py-3 bg-white/10 rounded-lg w-full"
              />

              <button
                onClick={handleCreateGoal}
                className="bg-purple-600 px-4 rounded-lg disabled:opacity-50 hover:bg-purple-700 hover:scale-105 transition"
              >
                Create
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
                        x.id === goalId
                          ? { ...x, ...updated }
                          : x
                      ),
                    );
                  }}
                />
              ))}

            </div>

          </div>

          {/* TASKS */}
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10">

            <h2 className="mb-4 text-lg font-semibold">
              Tasks
            </h2>

            {/* CREATE */}
            <div className="flex gap-2 flex-col sm:flex-row">

              <input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="New task..."
                className="flex-1 px-3 py-2 bg-white/10 rounded-lg"
              />

              {/* GOAL SELECT */}
              <select
                value={taskGoalId}
                onChange={(e) => setTaskGoalId(e.target.value)}
                className="p-2 bg-slate-800 rounded-lg"
              >
                <option value="">
                  No Goal
                </option>

                {goals.map((g) => (
                  <option
                    key={g.id}
                    value={g.id}
                  >
                    {g.title}
                  </option>
                ))}
              </select>

              {/* ✅ PRIORITY SELECT */}
              <select
                value={taskPriority}
                onChange={(e) =>
                  setTaskPriority(e.target.value)
                }
                className="px-3 py-2 bg-slate-800 rounded-lg"
              >
                <option value="LOW">
                  Low
                </option>

                <option value="MEDIUM">
                  Medium
                </option>

                <option value="HIGH">
                  High
                </option>
              </select>

              <button
                onClick={handleAddTask}
                className="bg-purple-600 px-4 rounded-lg disabled:opacity-50 hover:bg-purple-700 hover:scale-105 transition"
              >
                Create
              </button>

            </div>

            {/* LIST */}
            <div className="space-y-3 mt-4">

              {tasks.map((t) => (

                <div
                  key={t.id}
                  onClick={async () => {

                    const next =
                      t.status === "TODO"
                        ? "IN_PROGRESS"
                        : t.status === "IN_PROGRESS"
                          ? "DONE"
                          : "TODO";

                    const updated =
                      await updateTaskStatus(
                        id,
                        t.id,
                        next,
                      );

                    updateTask(t.id, updated);

                  }}
                  className="bg-white/5 p-4 rounded-xl border cursor-pointer hover:bg-white/10 transition"
                >

                  <p className="font-medium">
                    {t.title}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3 text-xs">

                    {/* STATUS */}
                    <span className="px-2 py-1 rounded bg-slate-700">
                      {t.status}
                    </span>

                    {/* GOAL */}
                    {t.goal && (
                      <span className="px-2 py-1 rounded bg-purple-600/20 text-purple-300">
                        {t.goal.title}
                      </span>
                    )}

                    {/* ✅ PRIORITY */}
                    <span
                      className={`px-2 py-1 rounded font-medium
                      ${
                        t.priority === "HIGH"
                          ? "bg-red-500/20 text-red-400"
                          : t.priority === "MEDIUM"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {t.priority}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div>
          <MemberList
            workspaceId={id}
            myRole={myRole}
          />
        </div>

      </div>

    </div>
  );
}