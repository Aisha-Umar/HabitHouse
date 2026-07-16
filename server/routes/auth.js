const express = require("express");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/signup", async (req, res) => {
  //  id        String   @id @default(uuid())
  //   name      String
  //   createdAt DateTime @default(now())
  //   users     User[]
  //   chores    Chore[]

  //check if email already exists
  const emailResult = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!emailResult) {
    const household = await prisma.household.create({
      data: {
        household: req.body.householdName,
      },
    });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const result = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        household: household.id,
        role: req.body.role,
      },
    });
    res.send("Sign up successful!");
  } else {
    res.send("Email already in use.");
  }
});
