const router = require("express").Router();
const auth = require("../middleware/auth.middleware");

const {
  createAnnouncement,
  getAnnouncements,
  addComment,
  getComments,
} = require("../controllers/announcement.controller");

// create + list
router.post("/:workspaceId", auth, createAnnouncement);
router.get("/:workspaceId", auth, getAnnouncements);

// comments
router.post("/:announcementId/comments", auth, addComment);
router.get("/:announcementId/comments", auth, getComments);

module.exports = router;