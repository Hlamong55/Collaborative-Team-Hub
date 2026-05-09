"use client";

import { useWorkspaceStore } from "../lib/store";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const ws = useWorkspaceStore((s) => s.currentWorkspace);

  const router = useRouter();
  const path = usePathname();

  const isWorkspacePage =
    path.includes("/workspace/");

  const isActive = (route) =>
    isWorkspacePage && path.includes(route);

  const accent = ws?.color || "#8b5cf6";

  const navItem = (label, route) => {
    const active = isActive(route);

    return (
      <div
        onClick={() =>
          ws &&
          router.push(`/workspace/${ws.id}/${route}`)
        }
        style={
          active
            ? {
                backgroundColor: `${accent}25`,
                borderColor: accent,
                color: accent,
                boxShadow: `0 0 20px ${accent}20`,
              }
            : {}
        }
        className={`px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 border
          
          ${
            active
              ? "font-semibold"
              : "border-transparent text-gray-300 hover:bg-white/10 hover:text-white hover:translate-x-1"
          }
        `}
      >
        {label}
      </div>
    );
  };

  return (
    <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-5 hidden md:flex flex-col">

      {/* LOGO */}
      <div className="mb-8">

        <h2
          className="text-3xl font-extrabold tracking-tight"
          style={{
            color: accent,
          }}
        >
          TeamHub
        </h2>

        <p className="text-xs text-gray-500 mt-1">
          Team collaboration platform
        </p>

      </div>

      {/* BACK */}
      <button
        onClick={() => router.push("/dashboard")}
        className="mb-7 text-sm text-gray-400 hover:text-white transition text-left"
      >
        ← All Workspaces
      </button>

      {/* WORKSPACE INFO */}
      <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-4">

        <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
          Current Workspace
        </p>

        <div className="flex items-center gap-3">

          {/* COLOR DOT */}
          <div
            className="w-4 h-4 rounded-full"
            style={{
              backgroundColor: accent,
            }}
          />

          <div>

            <h3 className="font-semibold text-white">
              {ws ? ws.name : "Select workspace"}
            </h3>

            <p className="text-xs text-gray-400">
              Active workspace
            </p>

          </div>

        </div>

      </div>

      {/* NAVIGATION */}
      <nav className="space-y-2 font-medium">

        {navItem("Dashboard", "dashboard")}

        {navItem("Goals", "goals")}

        {navItem("Tasks", "tasks")}

        {navItem("Announcements", "announcements")}

      </nav>

      {/* BOTTOM */}
      <div className="mt-auto pt-8">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

          <p className="text-xs text-gray-400 mb-2">
            Workspace Theme
          </p>

          <div className="flex gap-2 items-center">

            <div
              className="w-5 h-5 rounded-full"
              style={{
                backgroundColor: accent,
              }}
            />

            <span className="text-sm text-white">
              {accent}
            </span>

          </div>

        </div>

      </div>

    </aside>
  );
}