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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

export default function AnalyticsPage() {

  const { id } = useParams();

  const [goals, setGoals] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD ================= */

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

  /* ================= LOADING ================= */

  if (loading) {

    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-400">

        Loading analytics...

      </div>
    );
  }

  /* ================= GOALS ================= */

  const completedGoals = goals.filter((g) => {

    const total =
      g.milestones?.length || 0;

    const done =
      g.milestones?.filter(
        (m) => m.status === "DONE"
      ).length || 0;

    return total > 0 && done === total;

  }).length;

  const pendingGoals =
    goals.length - completedGoals;

  /* ================= TASKS ================= */

  const completedTasks =
    tasks.filter(
      (t) => t.status === "DONE"
    ).length;

  const todoTasks =
    tasks.filter(
      (t) => t.status === "TODO"
    ).length;

  const progressTasks =
    tasks.filter(
      (t) =>
        t.status === "IN_PROGRESS"
    ).length;

  /* ================= COMPLETION RATE ================= */

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks /
            tasks.length) *
            100
        );

  /* ================= PIE DATA ================= */

  const goalData = [
    {
      name: "Completed",
      value: completedGoals,
    },

    {
      name: "Pending",
      value: pendingGoals,
    },
  ];

  const taskData = [
    {
      name: "TODO",
      value: todoTasks,
    },

    {
      name: "IN_PROGRESS",
      value: progressTasks,
    },

    {
      name: "DONE",
      value: completedTasks,
    },
  ];

  /* ================= GOAL PROGRESS ================= */

  const goalProgressData =
    goals.map((g) => {

      const total =
        g.milestones?.length || 0;

      const done =
        g.milestones?.filter(
          (m) => m.status === "DONE"
        ).length || 0;

      const progress =
        total === 0
          ? 0
          : Math.round(
              (done / total) * 100
            );

      return {
        name: g.title,
        progress,
      };
    });

  /* ================= COLORS ================= */

  const goalColors = [
    "#22c55e",
    "#ef4444",
  ];

  const taskColors = [
    "#3b82f6",
    "#f59e0b",
    "#22c55e",
  ];

  /* ================= UI ================= */

  return (
    <div className="text-white p-6 space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="text-gray-400 mt-1">
          Workspace performance overview
        </p>

      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">

        {/* TOTAL GOALS */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">

          <p className="text-sm text-gray-400">
            Total Goals
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {goals.length}
          </h2>

        </div>

        {/* COMPLETED GOALS */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">

          <p className="text-sm text-gray-400">
            Completed Goals
          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {completedGoals}
          </h2>

        </div>

        {/* TOTAL TASKS */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">

          <p className="text-sm text-gray-400">
            Total Tasks
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {tasks.length}
          </h2>

        </div>

        {/* COMPLETED TASKS */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">

          <p className="text-sm text-gray-400">
            Completed Tasks
          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {completedTasks}
          </h2>

        </div>

        {/* COMPLETION RATE */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">

          <p className="text-sm text-gray-400">
            Completion Rate
          </p>

          <h2 className="text-3xl font-bold text-purple-400 mt-2">
            {completionRate}%
          </h2>

        </div>

      </div>

      {/* ================= CHARTS ================= */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* GOAL STATUS */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

          <h2 className="mb-5 text-lg font-semibold">
            Goal Status
          </h2>

          <ResponsiveContainer width="100%" height={280}>

            <PieChart>

              <Pie
                data={goalData}
                dataKey="value"
                outerRadius={90}
                innerRadius={50}
              >

                {goalData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        goalColors[index]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* TASK STATUS */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

          <h2 className="mb-5 text-lg font-semibold">
            Task Status
          </h2>

          <ResponsiveContainer width="100%" height={280}>

            <PieChart>

              <Pie
                data={taskData}
                dataKey="value"
                outerRadius={90}
                innerRadius={50}
              >

                {taskData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        taskColors[index]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* ================= GOAL PROGRESS ================= */}

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-lg font-semibold">
            Goal Progress
          </h2>

          <span className="text-sm text-gray-400">
            Milestone completion percentage
          </span>

        </div>

        <ResponsiveContainer width="100%" height={350}>

          <BarChart
            data={goalProgressData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#333"
            />

            <XAxis
              dataKey="name"
            />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="progress"
              fill="#8b5cf6"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}