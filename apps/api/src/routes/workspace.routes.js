const router = require("express").Router();
const auth = require("../middleware/auth.middleware");

const {
  createWorkspace,
  getMyWorkspaces,
  addMember,
  getMembers,
  changeRole,
  removeMember
} = require("../controllers/workspace.controller");

// Create workspace
router.post("/", auth, createWorkspace);

// Get my workspaces
router.get("/", auth, getMyWorkspaces);

// Add member
router.post("/:workspaceId/members", auth, addMember);

// Get members
router.get("/:workspaceId/members", auth, getMembers);

// Change role
router.patch("/:workspaceId/members/:memberId", auth, changeRole);

// Remove member
router.delete("/:workspaceId/members/:memberId", auth, removeMember);

module.exports = router;