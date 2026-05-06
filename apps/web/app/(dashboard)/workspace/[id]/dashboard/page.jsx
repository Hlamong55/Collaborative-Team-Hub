"use client";

import { useEffect, useState } from "react";
import { getGoals, getTasks } from "../../../../../lib/api";
import { useParams } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsPage() {
  const { id } = useParams();

  const [goals, setGoals] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const g = await getGoals(id);
        const t = await getTasks(id);

        setGoals(g);
        setTasks(t);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-400">
        Loading analytics...
      </div>
    );
  }

  // 📊 CALCULATIONS
  const completedGoals = goals.filter((g) => g.status === "DONE").length;
  const pendingGoals = goals.length - completedGoals;

  const completedTasks = tasks.filter((t) => t.status === "DONE").length;
  const pendingTasks = tasks.length - completedTasks;

  // 📊 CHART DATA
  const goalData = [
    { name: "Completed", value: completedGoals },
    { name: "Pending", value: pendingGoals },
  ];

  const taskData = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks },
  ];

  const COLORS = ["#22c55e", "#ef4444"]; // green / red

  return (
    <div className="text-white p-6 space-y-8">

      <h1 className="text-2xl font-bold">Analytics</h1>

      {/* 🔢 STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <p className="text-sm text-gray-400">Total Goals</p>
          <h2 className="text-xl font-bold">{goals.length}</h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <p className="text-sm text-gray-400">Completed Goals</p>
          <h2 className="text-xl font-bold text-green-400">
            {completedGoals}
          </h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <p className="text-sm text-gray-400">Total Tasks</p>
          <h2 className="text-xl font-bold">{tasks.length}</h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <p className="text-sm text-gray-400">Completed Tasks</p>
          <h2 className="text-xl font-bold text-green-400">
            {completedTasks}
          </h2>
        </div>

      </div>

      {/* 📊 CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* GOAL CHART */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h2 className="mb-4 font-semibold">Goal Status</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={goalData}
                dataKey="value"
                outerRadius={90}
              >
                {goalData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* TASK CHART */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h2 className="mb-4 font-semibold">Task Status</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={taskData}
                dataKey="value"
                outerRadius={90}
              >
                {taskData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}