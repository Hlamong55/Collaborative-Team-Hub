"use client";

import { useEffect, useState } from "react";
import { getWorkspaces, createWorkspace } from "../../../lib/api";
import { useRouter } from "next/navigation";
import { useWorkspaceStore } from "../../../lib/store";
import WorkspaceCard from "../../../components/WorkspaceCard";
import Modal from "../../../components/Modal";

export default function DashboardPage() {
  const [workspaces, setWorkspaces] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("#8b5cf6");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const router = useRouter();
  const setWorkspace = useWorkspaceStore((s) => s.setWorkspace);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getWorkspaces();
      setWorkspaces(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load workspaces");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;

    try {
      setCreating(true);

      const newWs = await createWorkspace({
        name,
        description: desc,
        color,
      });

      // reset
      setName("");
      setDesc("");
      setColor("#8b5cf6");
      setOpen(false);

      // auto enter workspace 🔥
      setWorkspace(newWs);
      router.push(`/workspace/${newWs.id}`);

    } catch (err) {
      console.error(err);
      alert("Workspace creation failed");
    } finally {
      setCreating(false);
    }
  };

  // 🔥 LOADING UI
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-white">
        <p className="text-gray-400 animate-pulse">
          Loading workspaces...
        </p>
      </div>
    );
  }

  return (
    <div className="text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Workspaces</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg font-medium hover:scale-105 transition"
        >
          + New
        </button>
      </div>

      {/* EMPTY STATE */}
      {workspaces.length === 0 && (
        <p className="text-gray-400 mb-6">
          🚀 No workspace yet — create your first
        </p>
      )}

      {/* GRID */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {workspaces.map((ws) => (
          <WorkspaceCard
            key={ws.id}
            ws={ws}
            onClick={() => {
              setWorkspace(ws);
              router.push(`/workspace/${ws.id}`);
            }}
          />
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div className="space-y-4">

            <h2 className="text-lg font-bold">
              Create Workspace
            </h2>

            {/* NAME */}
            <input
              placeholder="Workspace name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded bg-white/10 outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* DESCRIPTION */}
            <input
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-3 py-2 rounded bg-white/10 outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* COLOR */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Accent Color
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-10 rounded cursor-pointer border border-white/10"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 bg-gray-600/50 px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>

              <button
                disabled={creating}
                onClick={handleCreate}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg font-medium hover:scale-105 transition disabled:opacity-50"
              >
                {creating ? "Creating..." : "Create"}
              </button>
            </div>

          </div>
        </Modal>
      )}
    </div>
  );
}