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

  const a = await prisma.announcement.update({
    where: { id },
    data: {
      pinned: true,
    },
  });

  res.json(a);
};