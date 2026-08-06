const express = require("express");
const { PrismaClient } = require("../generated/prisma");
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const prisma = new PrismaClient();

router.post('/', verifyToken, async (req, res) => {
  try {
    const result = await prisma.chore.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        recurrence: req.body.recurrence,
        assignedTo: req.body.assignedTo,
        householdId:req.user.householdId
      },
    });
    res.status(201).json({ message: "Successfully created!" }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get('/mine', async (req, res) => {
  try {
    const chores = await prisma.chore.findMany({
      where: {
        assignedTo: req.query.childId
      }
    });
    res.status(200).json({ chores });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;