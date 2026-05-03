"use client";

export default function TaskCard({ t, onToggle }) {
  return (
    <div
      onClick={onToggle}
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
        <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
          {t.status}
        </span>

        <span className="text-xs px-2 py-1 bg-pink-500/20 text-pink-400 rounded">
          {t.priority}
        </span>
      </div>

      {t.goal && (
        <p className="text-xs text-purple-400 mt-1">
          Goal: {t.goal.title}
        </p>
      )}
    </div>
  );
}