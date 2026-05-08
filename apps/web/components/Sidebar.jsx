"use client";

import { useWorkspaceStore } from "../lib/store";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const ws = useWorkspaceStore((s) => s.currentWorkspace);
  const router = useRouter();
  const path = usePathname();

  const isWorkspacePage = path.includes("/workspace/");

  const isActive = (route) =>
    isWorkspacePage && path.includes(route);

  const navItem = (label, route) => (
    <div
      onClick={() => ws && router.push(`/workspace/${ws.id}/${route}`)}
      className={`px-3 py-2 rounded-lg cursor-pointer transition
        ${
          isActive(route)
            ? "bg-purple-600/30 text-purple-200 border border-purple-500/70"
            : "hover:bg-white/10 hover:text-white text-gray-300"
        }`}
    >
      {label}
    </div>
  );

  return (
    <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-5 hidden md:block">
      
      <h2 className="text-2xl font-bold mb-6 text-purple-500">
        TeamHub
      </h2>

      {/* BACK */}
      <p
        onClick={() => router.push("/dashboard")}
        className="cursor-pointer text-sm text-gray-400 hover:text-white mb-6 hover:underline"
      >
        ← All Workspaces
      </p>

      {/* WORKSPACE */}
      <div className="mb-6">
        <p className="text-xs text-gray-300 underline">Workspace</p>
        <h3 className="font-semibold">
          {ws ? ws.name : "Select workspace"}
        </h3>
      </div>

      {/* NAV */}
      <nav className="space-y-2 font-medium">
        {navItem("Dashboard", "dashboard")}
        {navItem("Goals", "goals")}
        {navItem("Tasks", "tasks")}
        {navItem("Announcements", "announcements")}
      </nav>
    </aside>
  );
}