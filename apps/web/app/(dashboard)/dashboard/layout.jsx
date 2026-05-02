export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-5">
        <h2 className="text-xl font-bold mb-8 text-purple-400">
          TeamHub
        </h2>

        <nav className="space-y-4 text-gray-300">
          <p className="hover:text-white cursor-pointer">Dashboard</p>
          <p className="hover:text-white cursor-pointer">Workspaces</p>
          <p className="hover:text-white cursor-pointer">Goals</p>
          <p className="hover:text-white cursor-pointer">Tasks</p>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-white/5 backdrop-blur">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <button className="bg-purple-600 px-4 py-1 rounded-lg">
            + New
          </button>
        </header>

        {/* Content */}
        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}