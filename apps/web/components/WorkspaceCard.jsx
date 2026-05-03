"use client";

export default function WorkspaceCard({ ws, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ borderColor: ws.color || "#8b5cf6" }} // 🔥 accent color
      className="group relative bg-white/5 p-6 rounded-2xl border 
      hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden"
    >
      {/* glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
        style={{
          background: `linear-gradient(to right, ${
            ws.color || "#8b5cf6"
          }20, #ec489920)`,
        }}
      />

      {/* content */}
      <div className="relative z-10">
        <h2
          className="font-semibold text-lg transition"
          style={{ color: ws.color || "#a78bfa" }}
        >
          {ws.name}
        </h2>

        {/* 🔥 description */}
        {ws.description && (
          <p className="text-gray-400 text-sm mt-1 line-clamp-2">
            {ws.description}
          </p>
        )}

        <p className="text-gray-500 text-xs mt-2">
          Created:{" "}
          {ws.createdAt
            ? new Date(ws.createdAt).toLocaleDateString()
            : "No date"}
        </p>

        {/* bottom hint */}
        <div className="mt-4 flex justify-between items-center text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition">
          <span>Open workspace</span>
          <span
            className="text-lg font-bold"
            style={{ color: ws.color || "#a78bfa" }}
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}