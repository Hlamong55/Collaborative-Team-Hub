"use client";

import GoalList from "../goals/GoalList";

export default function GoalsPage() {
  return (
    <div className="text-white p-6">
      <h1 className="text-xl font-bold mb-4">Goals</h1>
      <GoalList />
    </div>
  );
}