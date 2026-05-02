export default function DashboardPage() {
  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-4">
        Dashboard 🚀
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
          Total Goals: 5
        </div>

        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
          Tasks Completed: 12
        </div>

        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
          Overdue: 2
        </div>
      </div>
    </div>
  );
}