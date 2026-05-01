const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  createWorkspace,
} = require("../controllers/workspace.controller");

router.post("/", auth, createWorkspace);

module.exports = router;