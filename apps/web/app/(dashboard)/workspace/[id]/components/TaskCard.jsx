"use client";

export default function TaskCard({ t, onToggle }) {

  const priorityColor =
    t.priority === "HIGH"
      ? "bg-red-500/20 text-red-400"
      : t.priority === "MEDIUM"
        ? "bg-yellow-500/20 text-yellow-400"
        : "bg-green-500/20 text-green-400";

  return (
    <div
      onClick={onToggle}
      className="bg-white/5 p-4 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition"
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

      <div className="flex flex-wrap gap-2 mt-2">

        {/* STATUS */}
        <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
          {t.status}
        </span>

        {/* PRIORITY */}
        <span
          className={`text-xs px-2 py-1 rounded ${priorityColor}`}
        >
          {t.priority}
        </span>

      </div>

      {/* GOAL */}
      {t.goal && (
        <p className="text-xs text-purple-400 mt-2">
          Goal: {t.goal.title}
        </p>
      )}

    </div>
  );
}