"use client";

import { useWorkspaceStore } from "../lib/store";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const ws = useWorkspaceStore((s) => s.currentWorkspace);

  const router = useRouter();
  const path = usePathname();

  const accent = ws?.color || "#8b5cf6";

  /* ================= ACTIVE ================= */

  const isActive = (route) => {

  if (!ws) return false;
  const workspaceBase = `/workspace/${ws.id}`;

  if (route === "") {
    return path === workspaceBase;
  }

  return path === `${workspaceBase}/${route}`;
};

  /* ================= NAV ITEM ================= */

  const navItem = (label, route) => {
    const active = isActive(route);

    const href = ws
      ? route
        ? `/workspace/${ws.id}/${route}`
        : `/workspace/${ws.id}`
      : "/dashboard";

    return (
      <div
        onClick={() => {
          if (!ws) return;

          router.push(href);
        }}
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
        className={`
          px-4
          py-2
          rounded-lg
          cursor-pointer
          transition-all
          duration-300
          border

          ${
            active
              ? "font-semibold"
              : "border-transparent text-gray-300 hover:bg-white/10 hover:text-white "
          }
        `}
      >
        {label}
      </div>
    );
  };

  return (
    <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-5 hidden md:flex flex-col">
      {/* ================= LOGO ================= */}

      <div className="mb-10">
        <h2
          className="
            text-4xl
            font-extrabold
            tracking-tight
            bg-gradient-to-r
            from-purple-700
            to-pink-700
            bg-clip-text
            text-transparent
          "
        >
          TeamHub
        </h2>

        <p className="text-xs text-gray-300 mt-1 ml-1.5">
          Team collaboration platform
        </p>
      </div>

      {/* ================= BACK ================= */}

      <button
        onClick={() => router.push("/dashboard")}
        className="
          mb-5
          text-sm
          text-gray-400
          hover:text-white
          transition
          text-left
          hover:underline
        "
      >
        ← All Workspaces
      </button>

      {/* ================= WORKSPACE INFO ================= */}

      <div
        className="
          mb-6
          bg-white/5
          border
          rounded-2xl
          p-4
        "
        style={{
          borderColor: accent,
        }}
      >
        <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">
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
          </div>
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}

      <nav className="space-y-1 font-medium">
        {/* OVERVIEW */}
        {navItem("Overview", "")}

        {/* DASHBOARD */}
        {navItem("Dashboard", "dashboard")}

        {/* GOALS */}
        {navItem("Goals", "goals")}

        {/* TASKS */}
        {navItem("Tasks", "tasks")}

        {/* ANNOUNCEMENTS */}
        {navItem("Announcements", "announcements")}
      </nav>
    </aside>
  );
}
