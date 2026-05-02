const prisma = require("../utils/prisma");

// Create Workspace
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

// Get My Workspaces
exports.getMyWorkspaces = async (req, res) => {
  const members = await prisma.workspaceMember.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      workspace: true,
    },
  });

  const workspaces = members.map((m) => m.workspace);

  res.json(workspaces);
};

// Add Member
exports.addMember = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { email, role = "MEMBER" } = req.body;

    // Check admin
    const me = await prisma.workspaceMember.findFirst({
      where: { workspaceId, userId: req.user.id },
    });

    if (!me || me.role !== "ADMIN") {
      return res.status(403).json({ message: "Only admin can add members" });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent duplicate
    const exists = await prisma.workspaceMember.findFirst({
      where: { workspaceId, userId: user.id },
    });

    if (exists) {
      return res.status(400).json({ message: "Already a member" });
    }

    // Create member
    const member = await prisma.workspaceMember.create({
      data: {
        workspaceId,
        userId: user.id,
        role,
      },
    });

    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Add member failed" });
  }
};

//  Get Members
exports.getMembers = async (req, res) => {
  const { workspaceId } = req.params;

  const members = await prisma.workspaceMember.findMany({
    where: { workspaceId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  res.json(members);
};

//  Change Role
exports.changeRole = async (req, res) => {
  const { workspaceId, memberId } = req.params;
  const { role } = req.body;

  const me = await prisma.workspaceMember.findFirst({
    where: { workspaceId, userId: req.user.id },
  });

  if (!me || me.role !== "ADMIN") {
    return res.status(403).json({ message: "Only admin can change role" });
  }

  const updated = await prisma.workspaceMember.update({
    where: { id: memberId },
    data: { role },
  });

  res.json(updated);
};

//  Remove Member
exports.removeMember = async (req, res) => {
  const { workspaceId, memberId } = req.params;

  const me = await prisma.workspaceMember.findFirst({
    where: { workspaceId, userId: req.user.id },
  });

  if (!me || me.role !== "ADMIN") {
    return res.status(403).json({ message: "Only admin can remove members" });
  }

  await prisma.workspaceMember.delete({
    where: { id: memberId },
  });

  res.json({ message: "Member removed" });
};