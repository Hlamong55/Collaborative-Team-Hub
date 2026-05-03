const router = require("express").Router();
const auth = require("../middleware/auth.middleware");

const {
  createGoal,
  getGoals,
  createTask,
  getTasks,
  updateTaskStatus,
  createMilestone,
  updateMilestone,
} = require("../controllers/goal.controller");

/* ================= GOALS ================= */
router.post("/:workspaceId/goals", auth, createGoal);
router.get("/:workspaceId/goals", auth, getGoals);

/* ================= TASKS ================= */
router.post("/:workspaceId/tasks", auth, createTask);
router.get("/:workspaceId/tasks", auth, getTasks);
router.patch("/:workspaceId/tasks/:taskId", auth, updateTaskStatus);

/* ================= MILESTONES ================= */
router.post("/milestones/:goalId", auth, createMilestone);
router.patch("/milestones/:milestoneId", auth, updateMilestone);

module.exports = router;