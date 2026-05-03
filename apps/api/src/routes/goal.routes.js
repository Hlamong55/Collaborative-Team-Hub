const router = require("express").Router();
const auth = require("../middleware/auth.middleware");

const {
  createGoal,
  getGoals,
  createTask,
  getTasks,
  updateTaskStatus
} = require("../controllers/goal.controller");

// Goals
router.post("/:workspaceId/goals", auth, createGoal);
router.get("/:workspaceId/goals", auth, getGoals);

// Tasks
router.post("/:workspaceId/tasks", auth, createTask);
router.get("/:workspaceId/tasks", auth, getTasks);
router.patch("/:workspaceId/tasks/:taskId", auth, updateTaskStatus);

module.exports = router;