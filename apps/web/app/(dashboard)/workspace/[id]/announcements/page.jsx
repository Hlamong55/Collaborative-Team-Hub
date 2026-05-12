"use client";

import { useEffect, useState } from "react";
import {
  getAnnouncements,
  createAnnouncement,
  pinAnnouncement
} from "../../../../../lib/api";
import { useWorkspaceStore } from "../../../../../lib/store";

export default function AnnouncementPage() {
  const { currentWorkspace } = useWorkspaceStore();

  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  const load = async () => {
    const data = await getAnnouncements(currentWorkspace.id);
    setPosts(data);
  };

  useEffect(() => {
    if (currentWorkspace) load();
  }, [currentWorkspace]);

  const handleCreate = async () => {
    if (!text.trim()) return;

    await createAnnouncement(currentWorkspace.id, {
      content: text,
    });

    setText("");
    load();
  };

  const handlePin = async (id) => {
    await pinAnnouncement(id);
    load();
  };

  return (
    <div className="text-white p-6">

      <h1 className="text-xl font-bold mb-4">
        Announcements
      </h1>

      {/* CREATE */}
      <div className="flex gap-3 mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write announcement..."
          className="flex-1 px-3 py-2.5 bg-white/10 rounded outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleCreate}
          className="bg-purple-700 font-medium px-6 rounded hover:bg-purple-600 hover:scale-105 transition"
        >
          Post
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {posts.map((p) => (
          <div
            key={p.id}
            className={`p-4 rounded border transition
              ${
                p.pinned
                  ? "bg-purple-600/10 border-purple-500/40"
                  : "bg-white/5 border-white/10"
              }`}
          >
            {/* TOP */}
            <div className="flex justify-between items-start">

              <p className="font-medium">{p.content}</p>

              {/* PIN BUTTON */}
              <button
                onClick={() => handlePin(p.id)}
                className="rounded-xl p-1 hover:bg-gray-700 hover:scale-105 transition"
                title="Pin"
              >
                📌
              </button>

            </div>

            {/* META */}
            <div className="flex justify-between items-center mt-3">

              <p className="text-xs text-gray-300">
                 From: {p.user?.name || "Unknown"}
              </p>

              {p.pinned && (
                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                  Pinned
                </span>
              )}

            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="text-gray-400 text-sm mt-8">
            No announcements yet!
          </p>
        )}
      </div>

    </div>
  );
}