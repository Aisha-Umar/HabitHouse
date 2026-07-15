const express = require("express");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
//  id        String   @id @default(uuid())
//   name      String
//   createdAt DateTime @default(now())
//   users     User[]
//   chores    Chore[]
    const household = await prisma.household.create(
        {
            data: {
                name:req.body.householdName
            }
        }
    )
  //check if email already exists
  const emailResult = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  })
  if (!emailResult) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const result = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        household : household,
        role: req.body.role,
      },
    })
  } else {
    res.send("Email already in use.")
  }
})
