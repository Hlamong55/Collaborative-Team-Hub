"use client";

import { useEffect, useState } from "react";
import api from "../../../../../lib/axios";
import { useWorkspaceStore } from "../../../../../lib/store";

export default function MemberList({ workspaceId }) {
  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState("");

  const user = useWorkspaceStore((s) => s.user); // optional if you store auth

  const loadMembers = async () => {
    try {
      const res = await api.get(
        `/workspaces/${workspaceId}/members`
      );
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (workspaceId) loadMembers();
  }, [workspaceId]);

  const handleAdd = async () => {
    if (!email.trim()) return;

    try {
      await api.post(`/workspaces/${workspaceId}/members`, {
        email,
      });
      setEmail("");
      loadMembers();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleRemove = async (id) => {
    try {
      await api.delete(
        `/workspaces/${workspaceId}/members/${id}`
      );
      loadMembers();
    } catch (err) {
      alert("Remove failed");
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

      {/* Header */}
      <h2 className="text-lg font-semibold mb-4 text-white">
        Members
      </h2>

      {/* Add Member */}
      <div className="flex gap-2 mb-5">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="flex-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
        />
        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded font-medium hover:scale-105 transition"
        >
          Add
        </button>
      </div>

      {/* Member List */}
      <div className="space-y-3">
        {members.map((m) => (
          <div
            key={m.id}
            className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl p-3"
          >
            <div>
              <p className="font-medium text-white">
                {m.user.name || "No Name"}
              </p>
              <p className="text-xs text-gray-400">
                {m.user.email}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-2 py-1 rounded ${
                  m.role === "ADMIN"
                    ? "bg-purple-600/20 text-purple-400"
                    : "bg-gray-500/20 text-gray-300"
                }`}
              >
                {m.role}
              </span>

              <button
                onClick={() => handleRemove(m.id)}
                className="text-red-400 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {members.length === 0 && (
          <p className="text-gray-400 text-sm">
            No members yet
          </p>
        )}
      </div>
    </div>
  );
}