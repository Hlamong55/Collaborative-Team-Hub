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

  const router = useRouter();
  const setWorkspace = useWorkspaceStore((s) => s.setWorkspace);

  const load = async () => {
    try {
      const data = await getWorkspaces();
      setWorkspaces(data);
    } catch (err) {
      console.log(err);
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
      await createWorkspace({
        name,
        description: desc,
        color,
      });

      setName("");
      setDesc("");
      setColor("#8b5cf6");
      setOpen(false);
      load();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div className="text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Workspaces</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg font-medium hover:scale-105 transition"
        >
          + New
        </button>
      </div>

      {/* Empty state */}
      {workspaces.length === 0 && (
        <p className="text-gray-400 mb-6">
          No workspace yet — create your first 🚀
        </p>
      )}

      {/* Grid */}
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

      {/* Modal */}
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h2 className="text-lg font-bold mb-4">
            Create Workspace
          </h2>

          {/* Name */}
          <input
            placeholder="Workspace name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 px-3 py-2 rounded bg-white/10 outline-none"
          />

          {/* Description */}
          <input
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full mb-3 px-3 py-2 rounded bg-white/10 outline-none"
          />

          {/* Color */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 mb-1 block">
              Accent Color
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>

          <button
            onClick={handleCreate}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg font-medium hover:scale-105 transition"
          >
            Create Workspace
          </button>
        </Modal>
      )}
    </div>
  );
}