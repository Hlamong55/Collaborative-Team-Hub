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
  const { title, assigneeId, priority } = req.body;

  const task = await prisma.actionItem.create({
    data: {
      title,
      status: "TODO",
      priority: priority || "MEDIUM",
      assigneeId,
      workspaceId,
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
      assignee: { select: { id: true, name: true, email: true } },
    },
  });

  res.json(tasks);
};