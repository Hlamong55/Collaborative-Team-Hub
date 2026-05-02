"use client";

import { useWorkspaceStore } from "../lib/store";

export default function Sidebar() {
  const ws = useWorkspaceStore((s) => s.currentWorkspace);

  return (
    <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-5 hidden md:block">
      <h2 className="text-xl font-bold mb-6 text-purple-400">
        TeamHub
      </h2>

      <div className="mb-6">
        <p className="text-xs text-gray-400">Workspace</p>
        <h3 className="font-semibold">
          {ws ? ws.name : "Select workspace"}
        </h3>
      </div>

      <nav className="space-y-3 text-gray-300">
        <p className="hover:text-white cursor-pointer">Dashboard</p>
        <p className="hover:text-white cursor-pointer">Goals</p>
        <p className="hover:text-white cursor-pointer">Tasks</p>
      </nav>
    </aside>
  );
}