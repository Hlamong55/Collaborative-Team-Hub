const prisma = require("../utils/prisma");

exports.createWorkspace = async (req, res) => {
  const { name } = req.body;

  const workspace = await prisma.workspace.create({
    data: {
      name,
      members: {
        create: {
          userId: req.user.id,
          role: "ADMIN",
        },
      },
    },
  });

  res.json(workspace);
};