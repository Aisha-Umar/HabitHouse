const express = require("express");
const { PrismaClient } = require("../generated/prisma");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
const prisma = new PrismaClient();

router.get('/children', verifyToken, async (req, res) => {
  try {
    const children = await prisma.user.findMany({
      where: {
        role: 'child',
        householdId: req.user.householdId
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    res.status(200).json({ children });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;