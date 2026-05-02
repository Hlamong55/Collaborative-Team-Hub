"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getWorkspaceById } from "../../../../lib/api";
import { useWorkspaceStore } from "../../../../lib/store";

export default function WorkspacePage() {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);

  const setWorkspaceGlobal = useWorkspaceStore((s) => s.setWorkspace);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getWorkspaceById(id);
        setWorkspace(data);
        setWorkspaceGlobal(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) load();
  }, [id]);

  if (loading) {
    return <div className="text-white p-6">Loading...</div>;
  }

  if (!workspace) {
    return <div className="text-white p-6">Not found</div>;
  }

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-2">
        {workspace.name}
      </h1>

      <p className="text-gray-400 text-sm mb-6">
        Created:{" "}
        {workspace.createdAt
          ? new Date(workspace.createdAt).toLocaleDateString()
          : "N/A"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h2 className="font-semibold mb-2">Goals</h2>
          <p className="text-gray-400 text-sm">No goals yet</p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h2 className="font-semibold mb-2">Tasks</h2>
          <p className="text-gray-400 text-sm">No tasks yet</p>
        </div>
      </div>
    </div>
  );
}