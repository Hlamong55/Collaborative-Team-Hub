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
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const setWorkspace = useWorkspaceStore((s) => s.setWorkspace);

  const load = async () => {
    const data = await getWorkspaces();
    setWorkspaces(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;
    await createWorkspace({ name });
    setName("");
    setOpen(false);
    load();
  };

  return (
    <div className="text-white">

      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Workspaces</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg font-medium hover:scale-105 transition"
        >
          + New
        </button>
      </div>

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

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h2 className="text-lg font-bold mb-4">
            Create Workspace
          </h2>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded bg-white/10"
          />

          <button
            onClick={handleCreate}
            className="bg-purple-600 px-4 py-2 rounded"
          >
            Create
          </button>
        </Modal>
      )}
    </div>
  );
}