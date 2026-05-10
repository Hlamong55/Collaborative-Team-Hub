"use client";

export default function WorkspaceCard({
  ws,
  onClick,
}) {
  const accent = ws.color || "#8b5cf6";

  return (
    <div
      onClick={onClick}
      style={{
        borderColor: accent,
        boxShadow: `0 0 0px ${accent}00`,
      }}
      className="group relative bg-white/5 p-6 rounded-2xl border 
      hover:scale-[1.02] hover:-translate-y-1
      transition-all duration-300 cursor-pointer overflow-hidden"
    >

      {/* HOVER GLOW */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `linear-gradient(to right, ${accent}15, #ec489915)`,
        }}
      />

      {/* COLOR GLOW */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 blur-3xl opacity-20 group-hover:opacity-40 transition"
        style={{
          backgroundColor: accent,
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* TOP */}
        <div className="flex items-start justify-between">

          <div>

            <h2
              className="font-bold text-xl transition"
              style={{
                color: accent,
              }}
            >
              {ws.name}
            </h2>

            {/* DESCRIPTION */}
            {ws.description && (
              <p className="text-gray-400 text-sm font-medium mt-2.5 line-clamp-2">
                {ws.description}
              </p>
            )}

          </div>

          {/* COLOR BADGE */}
          <div
            className="w-5 h-5 rounded-full mt-1"
            style={{
              backgroundColor: accent,
            }}
          />

        </div>

        {/* DATE */}
        <p className="text-gray-400 text-xs mt-5">
          Created:{" "}
          {ws.createdAt
            ? new Date(ws.createdAt).toLocaleDateString()
            : "No date"}
        </p>

        {/* FOOTER */}
        <div className="mt-5 flex justify-between items-center text-sm opacity-0 group-hover:opacity-100 transition duration-300">

          <span className="text-gray-200">
            Open workspace
          </span>

          <span
            className="text-2xl font-extrabold"
          >
            →
          </span>

        </div>

      </div>
    </div>
  );
}