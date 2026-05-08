"use client";

import { useEffect, useState } from "react";
import {
  getAnnouncements,
  createAnnouncement,
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

  return (
    <div className="text-white p-6">

      <h1 className="text-xl font-bold mb-4">
        Announcements
      </h1>

      {/* create */}
      <div className="flex gap-2 mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write announcement..."
          className="flex-1 px-3 py-2.5 bg-white/15 rounded"
        />
        <button
          onClick={handleCreate}
          className="bg-purple-700 font-medium px-6 rounded hover:bg-purple-600 hover:scale-105 transition"
        >
          Post
        </button>
      </div>

      {/* list */}
      <div className="space-y-4">
        {posts.map((p) => (
          <div
            key={p.id}
            className="bg-white/5 p-4 rounded border border-white/10"
          >
            <p className="font-medium">{p.content}</p>
            <p className="text-xs text-gray-400 mt-2">
              by {p.author?.name}
            </p>
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