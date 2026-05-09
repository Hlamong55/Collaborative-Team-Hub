const router = require("express").Router();
const auth = require("../middleware/auth.middleware");

const {
  createAnnouncement,
  getAnnouncements,
  togglePin,
  addComment,
  getComments,
} = require("../controllers/announcement.controller");

// create + get
router.post("/:workspaceId", auth, createAnnouncement);
router.get("/:workspaceId", auth, getAnnouncements);

// pin
router.patch("/pin/:id", auth, togglePin);

// comments
router.post("/:announcementId/comments", auth, addComment);
router.get("/:announcementId/comments", auth, getComments);

module.exports = router;