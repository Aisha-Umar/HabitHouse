const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("../generated/prisma");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/signup", async (req, res) => {
  try {
    const emailResult = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!emailResult) {
      const household = await prisma.household.create({
        data: {
          name: req.body.householdName,
        },
      });
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const result = await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          householdId: household.id,
          role: req.body.role,
        },
      });
      res.status(201).json({ message: "Sign up successful!" });
    } else {
      res.status(400).json({ message: "Email already in use." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const passwordMatches = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatches) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;