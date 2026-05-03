const prisma = require("../utils/prisma");

/* ================= GOALS ================= */

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
      owner: {
        select: { id: true, name: true, email: true },
      },
      milestones: true, 
    },
  });

  res.json(goals);
};

/* ================= TASKS ================= */

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
      goalId: goalId || null,
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
      goal: true,
    },
  });

  res.json(tasks);
};

// Update Task Status
exports.updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  const updated = await prisma.actionItem.update({
    where: { id: taskId },
    data: { status },
  });

  res.json(updated);
};

/* ================= MILESTONES ================= */

// Create Milestone
exports.createMilestone = async (req, res) => {
  const { goalId } = req.params;
  const { title } = req.body;

  const milestone = await prisma.milestone.create({
    data: {
      title,
      status: "TODO",
      goalId,
    },
  });

  res.json(milestone);
};

// Update Milestone
exports.updateMilestone = async (req, res) => {
  const { milestoneId } = req.params;
  const { status } = req.body;

  const updated = await prisma.milestone.update({
    where: { id: milestoneId },
    data: { status },
  });

  res.json(updated);
};