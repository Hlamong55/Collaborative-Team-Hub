"use client";

import { useWorkspaceStore } from "../lib/store";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const ws = useWorkspaceStore((s) => s.currentWorkspace);
  const router = useRouter();

  return (
    <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-5 hidden md:block">
      
      {/* LOGO */}
      <h2
        onClick={() => router.push("/dashboard")}
        className="text-xl font-bold mb-6 text-purple-400 cursor-pointer"
      >
        TeamHub
      </h2>

      {/* WORKSPACE */}
      <div className="mb-6">
        <p className="text-xs text-gray-400">Workspace</p>
        <h3 className="font-semibold">
          {ws ? ws.name : "Select workspace"}
        </h3>
      </div>

      {/* NAVIGATION */}
      <nav className="space-y-3 text-gray-300">

        <p
          onClick={() => router.push("/dashboard")}
          className="hover:text-white cursor-pointer"
        >
          Dashboard
        </p>

        <p
          onClick={() => ws && router.push(`/workspace/${ws.id}`)}
          className="hover:text-white cursor-pointer"
        >
          Goals
        </p>

        <p
          onClick={() => ws && router.push(`/workspace/${ws.id}`)}
          className="hover:text-white cursor-pointer"
        >
          Tasks
        </p>

      </nav>
    </aside>
  );
}