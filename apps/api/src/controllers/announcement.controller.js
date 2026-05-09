const prisma = require("../utils/prisma");

// create
exports.createAnnouncement = async (req, res) => {
  const { workspaceId } = req.params;
  const { content } = req.body;

  const a = await prisma.announcement.create({
    data: {
      content,
      workspaceId,
      userId: req.user.id,
    },
  });

  res.json(a);
};

// get
exports.getAnnouncements = async (req, res) => {
  const { workspaceId } = req.params;

  const data = await prisma.announcement.findMany({
    where: { workspaceId },
    orderBy: [
      { pinned: "desc" },
      { createdAt: "desc" },
    ],
    include: {
      user: { select: { name: true } },
    },
  });

  res.json(data);
};

// pin
exports.togglePin = async (req, res) => {
  const { id } = req.params;

  const existing = await prisma.announcement.findUnique({
    where: { id },
  });

  const a = await prisma.announcement.update({
    where: { id },
    data: {
      pinned: !existing.pinned,
    },
  });

  res.json(a);
};

// add comment
exports.addComment = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const { text } = req.body;

    const comment = await prisma.comment.create({
      data: {
        text,
        announcementId,
        userId: req.user.id,
      },
    });

    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Comment failed",
    });
  }
};

// get comments
exports.getComments = async (req, res) => {
  try {
    const { announcementId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { announcementId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to fetch comments",
    });
  }
};