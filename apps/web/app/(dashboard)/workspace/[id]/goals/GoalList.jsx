"use client";

import { useWorkspaceStore } from "../../../../../lib/store";

export default function GoalList() {
  const { goals } = useWorkspaceStore();

  if (!goals || goals.length === 0) {
    return (
      <p className="text-gray-400 text-sm">
        No goals yet
      </p>
    );
  }

  return (
    <div className="space-y-4">

      {goals.map((g) => {
        const total = g.milestones?.length || 0;
        const done =
          g.milestones?.filter((m) => m.status === "DONE").length || 0;

        const progress =
          total === 0 ? 0 : Math.round((done / total) * 100);

        return (
          <div
            key={g.id}
            className="bg-white/5 p-4 rounded-xl border border-white/10"
          >
            {/* TITLE */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{g.title}</h3>

              <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">
                {g.status}
              </span>
            </div>

            {/* PROGRESS */}
            <div className="mt-3">
              <p className="text-xs text-gray-400 mb-1">
                Progress
              </p>

              <div className="w-full bg-white/10 h-2 rounded">
                <div
                  className="h-2 rounded bg-purple-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-xs text-right text-gray-400 mt-1">
                {progress}%
              </p>
            </div>

            {/* MILESTONES */}
            <div className="mt-3 space-y-2">
              {g.milestones?.map((m) => (
                <div
                  key={m.id}
                  className="flex justify-between text-xs bg-white/5 px-3 py-2 rounded"
                >
                  <span>{m.title}</span>
                  <span>{m.status}</span>
                </div>
              ))}

              {g.milestones?.length === 0 && (
                <p className="text-gray-400 text-xs">
                  No milestones
                </p>
              )}
            </div>
          </div>
        );
      })}

    </div>
  );
}