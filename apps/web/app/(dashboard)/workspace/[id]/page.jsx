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

export default function WorkspacePage() {
  const { id } = useParams();

  const [workspace, setWorkspace] = useState(null);
  const [goals, setGoals] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [goalTitle, setGoalTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [goalId, setGoalId] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) load();
  }, [id]);

  const load = async () => {
    try {
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

  // CREATE GOAL
  const handleCreateGoal = async () => {
    if (!goalTitle) return;

    try {
      await createGoal(id, {
        title: goalTitle,
        dueDate,
      });

      setGoalTitle("");
      setDueDate("");
      load();
    } catch (err) {
      console.log(err);
    }
  };

  // CREATE TASK
  const handleCreateTask = async () => {
    if (!taskTitle) return;

    try {
      await createTask(id, {
        title: taskTitle,
        priority,
        goalId,
      });

      setTaskTitle("");
      setGoalId("");
      load();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div className="text-white p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6">
        {workspace?.name}
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* GOALS */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h2 className="font-semibold mb-4">Goals</h2>

          {/* CREATE */}
          <div className="flex flex-col gap-2 mb-4">
            <input
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              placeholder="New goal..."
              className="px-3 py-2 bg-white/10 rounded"
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-3 py-2 bg-white/10 rounded"
            />

            <button
              onClick={handleCreateGoal}
              className="bg-purple-600 hover:bg-purple-700 py-2 rounded font-semibold"
            >
              +Add Goal
            </button>
          </div>

          {/* LIST */}
          <div className="space-y-3">
            {goals.map((g) => (
              <div
                key={g.id}
                className="bg-white/5 p-4 rounded-xl border border-white/10"
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
                No goals yet — create your first goal 🚀
              </p>
            )}
          </div>
        </div>

        {/* TASKS */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h2 className="font-semibold mb-4">Tasks</h2>

          {/* CREATE */}
          <div className="flex flex-col gap-2 mb-4">

            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="New task..."
              className="px-3 py-2 bg-white/10 rounded"
            />

            {/* PRIORITY */}
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-3 py-2 bg-white/10 rounded"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>

            {/* GOAL LINK */}
            <select
              value={goalId}
              onChange={(e) => setGoalId(e.target.value)}
              className="px-3 py-2 bg-white/10 rounded"
            >
              <option value="">No Goal</option>
              {goals.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title}
                </option>
              ))}
            </select>

            <button
              onClick={handleCreateTask}
              className="bg-purple-600 hover:bg-purple-700 py-2 rounded font-semibold"
            >
              +Add Task
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
                  load();
                }}
                className="bg-white/5 p-4 rounded-xl border border-white/10 cursor-pointer"
              >
                <p
                  className={`font-medium ${
                    t.status === "DONE"
                      ? "line-through text-gray-500"
                      : ""
                  }`}
                >
                  {t.title}
                </p>

                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                    {t.status}
                  </span>

                  <span className="text-xs px-2 py-1 rounded bg-pink-500/20 text-pink-400">
                    {t.priority}
                  </span>
                </div>

                {t.goal && (
                  <p className="text-xs text-purple-400 mt-1">
                    Goal: {t.goal.title}
                  </p>
                )}
              </div>
            ))}

            {tasks.length === 0 && (
              <p className="text-gray-500 text-sm italic">
                No tasks yet — add your first task 🚀
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}