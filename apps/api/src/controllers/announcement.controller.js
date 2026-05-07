const prisma = require("../utils/prisma");

// CREATE
exports.createAnnouncement = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { content } = req.body;

    const post = await prisma.announcement.create({
      data: {
        content,
        workspaceId,
        authorId: req.user.id,
      },
    });

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create failed" });
  }
};

// GET ALL
exports.getAnnouncements = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const posts = await prisma.announcement.findMany({
      where: { workspaceId },
      include: {
        author: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

// ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const { text } = req.body;

    const c = await prisma.comment.create({
      data: {
        text,
        userId: req.user.id,
        announcementId,
      },
    });

    res.json(c);
  } catch (err) {
    res.status(500).json({ message: "Comment failed" });
  }
};

// GET COMMENTS
exports.getComments = async (req, res) => {
  try {
    const { announcementId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { announcementId },
      include: {
        user: { select: { id: true, name: true } },
      },
    });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Fetch comments failed" });
  }
};