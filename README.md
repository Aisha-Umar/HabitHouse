# HabitHouse

**Where good habits start at home.**

HabitHouse is a full-stack family chore-tracking app that helps parents assign chores to their children, and helps kids build consistency through streaks and weekly progress tracking.

## Features

- **Auth** — parent signup/login with bcrypt password hashing and JWT-based sessions
- **Household management** — parents can add children to their household
- **Chore management** — parents can create chores (daily/weekly recurrence) and assign them to specific children
- **Chore completion** — children can view their assigned chores and mark them done
- **Streak tracking** — tracks consecutive days of activity per child, with automatic reset on missed days
- **Weekly progress** — calculates each child's completion percentage for the week, accounting for chore recurrence
- **Household progress view** — parents can see a weekly report across all their children

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS, React Router |
| Backend | Node.js, Express |
| Database | PostgreSQL (hosted on Neon) |
| ORM | Prisma |
| Auth | JWT (jsonwebtoken), bcryptjs |

## Architecture

HabitHouse is built as a **REST API + SPA**, not traditional MVC — the Express backend only ever returns JSON (no server-rendered views), and the React frontend owns all UI rendering and client-side routing.

```
Frontend (React/Vite)  →  fetch()  →  Express API  →  Prisma  →  PostgreSQL (Neon)
                       ←  JSON     ←              ←         ←
```

Auth is handled via JWTs: on login, the server signs a token containing `userId`, `role`, and `householdId`. Protected routes use a `verifyToken` middleware that validates the token and attaches the decoded payload to `req.user`, so downstream route handlers always know which household is making the request without trusting client-supplied IDs.

## Data Model

```
Household
  └── User (parent | child)
        └── Chore (daily | weekly)
              └── Completion (one row per mark-done, tagged with a periodKey)
        └── Streak (one per child — tracks currentStreak, longestStreak, lastCompletedPeriod)
```

Streak and weekly-completion calculations are derived from `Completion` records rather than stored as simple flags, which is what allows a chore to be "completed" repeatedly over time (once per day/week) rather than just toggled on/off.

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Parent signup (creates household + user) |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/household/children` | List children in the logged-in parent's household |
| POST | `/api/household/children` | Add a child to the household |
| POST | `/api/chores` | Create a chore, assigned to a child |
| GET | `/api/chores/mine?childId=` | Get chores assigned to a specific child |
| POST | `/api/chores/:id/complete?childId=` | Mark a chore complete (updates streak) |
| GET | `/api/chores/progress/household` | Weekly completion % for every child in the household |

## Getting Started

**Backend:**
```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

**Frontend:**
```bash
npm install
npm run dev
```

Requires a `.env` file in `server/` with `DATABASE_URL`, `DIRECT_URL` (Neon pooled + direct connection strings), and `JWT_SECRET`.

## Notes / Known Limitations

- Children don't yet have independent login — chore assignment and viewing currently happen via a parent-selected child context (a lightweight PIN or name-based child login is a natural next step)
- Streaks are tracked per-child rather than per-chore
- `periodKey` uses a simplified daily-date string for all recurrence types; a fully recurrence-aware period key (e.g. ISO week format for weekly chores) is a possible refinement

## Roadmap

- Points/badges for streak milestones
- Photo proof on completion
- Chore templates by age group
- Co-parent access
