"use client";

export default function GoalCard({ g }) {
  return (
    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
      <div className="flex justify-between">
        <p className="font-medium">{g.title}</p>
        <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">
          {g.status}
        </span>
      </div>

      {g.dueDate && (
        <p className="text-xs text-gray-400 mt-2">
          Due: {new Date(g.dueDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}