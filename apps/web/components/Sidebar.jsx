"use client";

import { useWorkspaceStore } from "../lib/store";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const ws = useWorkspaceStore((s) => s.currentWorkspace);
  const router = useRouter();
  const path = usePathname();

  const isActive = (p) => path.includes(p);

  return (
    <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-5 hidden md:block">
      
      <h2 className="text-2xl font-bold mb-6 text-purple-500">
        TeamHub
      </h2>

      <div className="mb-6">
        <p className="text-xs text-gray-400">Workspace</p>
        <h3 className="font-semibold">
          {ws ? ws.name : "Select workspace"}
        </h3>
      </div>

      <nav className="space-y-3 text-gray-300">

        <p
          onClick={() => ws && router.push(`/workspace/${ws.id}/dashboard`)}
          className={`cursor-pointer ${
            isActive("dashboard") ? "text-white font-semibold" : ""
          }`}
        >
          Dashboard
        </p>

        <p
          onClick={() => ws && router.push(`/workspace/${ws.id}/goals`)}
          className={`cursor-pointer ${
            isActive("goals") ? "text-white font-semibold" : ""
          }`}
        >
          Goals
        </p>

        <p
          onClick={() => ws && router.push(`/workspace/${ws.id}/tasks`)}
          className={`cursor-pointer ${
            isActive("tasks") ? "text-white font-semibold" : ""
          }`}
        >
          Tasks
        </p>

      </nav>
    </aside>
  );
}