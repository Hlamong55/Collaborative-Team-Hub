"use client";

export default function WorkspaceCard({ ws, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white/5 p-6 rounded-2xl border border-white/10 
      hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 
      transition duration-300 cursor-pointer overflow-hidden"
    >
      {/* glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-purple-500/10 to-pink-500/10" />

      {/* content */}
      <div className="relative z-10">
        <h2 className="font-semibold text-lg group-hover:text-purple-400 transition">
          {ws.name}
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          Created:{" "}
          {ws.createdAt
            ? new Date(ws.createdAt).toLocaleDateString()
            : "No date"}
        </p>

        {/* bottom hint */}
        <div className="mt-4 flex justify-between items-center text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition">
          <span>Open workspace</span>
          <span className="text-purple-400 text-lg font-bold">→</span>
        </div>
      </div>
    </div>
  );
}