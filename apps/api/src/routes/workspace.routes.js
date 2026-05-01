const router = require("express").Router();
const auth = require("../middleware/auth.middleware");

const {
  createWorkspace,
  getMyWorkspaces,
  addMember,
  getMembers,
} = require("../controllers/workspace.controller");

// Create workspace
router.post("/", auth, createWorkspace);

// Get my workspaces
router.get("/", auth, getMyWorkspaces);

// Add member
router.post("/:workspaceId/members", auth, addMember);

// Get members
router.get("/:workspaceId/members", auth, getMembers);

module.exports = router;