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

router.post('/:id/complete', async (req, res) => {
  try {
    const periodKey = new Date().toISOString().split('T')[0];
    const childId = req.query.childId;

    const completion = await prisma.completion.create({
      data: {
        choreId: req.params.id,
        childId: childId,
        periodKey: periodKey
      }
    });

    const existingStreak = await prisma.streak.findUnique({
      where: { childId: childId }
    });

    if (!existingStreak) {
      // first ever completion for this child — create a new streak
      await prisma.streak.create({
        data: {
          childId: childId,
          currentStreak: 1,
          longestStreak: 1,
          lastCompletedPeriod: periodKey
        }
      });
    } else {
      const lastDate = new Date(existingStreak.lastCompletedPeriod);
      const todayDate = new Date(periodKey);
      const oneDayInMs = 1000 * 60 * 60 * 24;
      const diffInDays = (todayDate - lastDate) / oneDayInMs;

      let newCurrentStreak = existingStreak.currentStreak;

      if (diffInDays === 1) {
        newCurrentStreak = existingStreak.currentStreak + 1;
      } else if (diffInDays === 0) {
        newCurrentStreak = existingStreak.currentStreak; // unchanged
      } else {
        newCurrentStreak = 1; // streak broken, reset
      }

      const newLongestStreak = Math.max(newCurrentStreak, existingStreak.longestStreak);

      await prisma.streak.update({
        where: { childId: childId },
        data: {
          currentStreak: newCurrentStreak,
          longestStreak: newLongestStreak,
          lastCompletedPeriod: periodKey
        }
      });
    }

    res.status(201).json({ message: "Chore marked complete!", completion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get('/progress/household', verifyToken, async (req, res) => {
  try {
    const children = await prisma.user.findMany({
      where: { role: 'child', householdId: req.user.householdId }
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoKey = sevenDaysAgo.toISOString().split('T')[0];

    const results = [];

    for (const child of children) {
      const chores = await prisma.chore.findMany({
        where: { assignedTo: child.id }
      });

      let expectedTotal = 0;
      for (const chore of chores) {
        if (chore.recurrence === 'daily') expectedTotal += 7;
        if (chore.recurrence === 'weekly') expectedTotal += 1;
      }

      const completions = await prisma.completion.count({
        where: {
          childId: child.id,
          periodKey: { gte: sevenDaysAgoKey }
        }
      });

      const percentage = expectedTotal === 0 ? 0 : Math.round((completions / expectedTotal) * 100);

      results.push({
        id: child.id,
        name: child.name,
        percentage
      });
    }

    res.status(200).json({ progress: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});


module.exports = router;