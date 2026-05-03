const prisma = require("../utils/prisma");

// Create Goal
exports.createGoal = async (req, res) => {
  const { workspaceId } = req.params;
  const { title, dueDate } = req.body;

  const goal = await prisma.goal.create({
    data: {
      title,
      status: "PENDING",
      dueDate: dueDate ? new Date(dueDate) : null,
      ownerId: req.user.id,
      workspaceId,
    },
  });

  res.json(goal);
};

// Get Goals
exports.getGoals = async (req, res) => {
  const { workspaceId } = req.params;

  const goals = await prisma.goal.findMany({
    where: { workspaceId },
    include: {
      owner: { select: { id: true, name: true, email: true } },
    },
  });

  res.json(goals);
};

// Create Task 
exports.createTask = async (req, res) => {
  const { workspaceId } = req.params;
  const { title, assigneeId, priority, goalId } = req.body;

  const task = await prisma.actionItem.create({
    data: {
      title,
      status: "TODO",
      priority: priority || "MEDIUM",
      assigneeId,
      workspaceId,
      goalId: goalId || null, // 🔥 link
    },
  });

  res.json(task);
};

// Get Tasks
exports.getTasks = async (req, res) => {
  const { workspaceId } = req.params;

  const tasks = await prisma.actionItem.findMany({
    where: { workspaceId },
    include: {
      assignee: {
        select: { id: true, name: true },
      },
      goal: true, // 🔥 include goal
    },
  });

  res.json(tasks);
};

// Update Task
exports.updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  const updated = await prisma.actionItem.update({
    where: { id: taskId },
    data: { status },
  });

  res.json(updated);
};