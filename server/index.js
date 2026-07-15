// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const authRoutes = require('./routes/auth');
// const choresRoutes = require('./routes/chores');
// const householdRoutes = require('./routes/household');
// const progressRoutes = require('./routes/progress');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// make prisma available to routes if you want (optional pattern)
app.locals.prisma = prisma;

app.use('/api/auth', authRoutes);
// app.use('/api/chores', choresRoutes);
// app.use('/api/household', householdRoutes);
// app.use('/api/progress', progressRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});