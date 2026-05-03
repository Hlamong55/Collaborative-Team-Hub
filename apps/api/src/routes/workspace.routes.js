const router = require("express").Router();
const auth = require("../middleware/auth.middleware");

const {
  createWorkspace,
  getMyWorkspaces,
  addMember,
  getMembers,
  changeRole,
  removeMember,
  getWorkspaceById,
} = require("../controllers/workspace.controller");

// Create workspace
router.post("/", auth, createWorkspace);

// Get my workspaces
router.get("/", auth, getMyWorkspaces);

// Get single workspace
router.get("/single/:id", auth, getWorkspaceById);

// Members
router.post("/:workspaceId/members", auth, addMember);
router.get("/:workspaceId/members", auth, getMembers);
router.patch("/:workspaceId/members/:memberId", auth, changeRole);
router.delete("/:workspaceId/members/:memberId", auth, removeMember);

module.exports = router;