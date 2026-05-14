"use client";

import { useState } from "react";
import { createMilestone, updateMilestone } from "../../../../../lib/api";

export default function GoalCard({ goal, onUpdate }) {
  const [title, setTitle] = useState("");

  const milestones = goal.milestones || [];

  const done = milestones.filter((m) => m.status === "DONE").length;
  const total = milestones.length;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  const handleAdd = async () => {
    if (!title.trim()) return;

    const newMilestone = await createMilestone(goal.id, { title });

    onUpdate(goal.id, {
      milestones: [...milestones, newMilestone],
    });

    setTitle("");
  };

  const toggle = async (m) => {
    const newStatus = m.status === "TODO" ? "DONE" : "TODO";

    await updateMilestone(m.id, newStatus);

    const updated = milestones.map((x) =>
      x.id === m.id ? { ...x, status: newStatus } : x,
    );

    onUpdate(goal.id, { milestones: updated });
  };

  return (
    <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-5">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <p className="font-semibold">{goal.title}</p>
        <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">
          {goal.status}
        </span>
      </div>

      {/* PROGRESS BAR */}
      <div>
        <div className="flex justify-between text-xs text-gray-300 mb-1.5">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full h-2 bg-white/10 rounded">
          <div
            className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ADD */}
      <div className="flex gap-2.5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add milestone..."
          className="flex-1 px-2 py-2.5 bg-white/10 rounded text-sm outline-none"
        />
        <button
          onClick={handleAdd}
          className="text-xs bg-purple-600 px-3.5 rounded hover:bg-purple-700 hover:scale-105 transition"
        >
          +Add
        </button>
      </div>

      {/* LIST */}
      <div className="">
        {milestones.map((m) => (
          <div
            key={m.id}
            onClick={() => toggle(m)}
            className="flex justify-between items-center text-sm bg-white/5 px-3 py-2 rounded cursor-pointer hover:border-purple-400 border border-transparent transition"
          >
            <p
              className={
                m.status === "DONE"
                  ? "line-through text-gray-500"
                  : "text-white"
              }
            >
              {m.title}
            </p>

            <span
              className={`text-xs px-2 py-1 rounded ${
                m.status === "DONE"
                  ? "opacity-60 scale-[0.98]"
                  : "hover:scale-[1.01]"
              }`}
            >
              {m.status}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}
