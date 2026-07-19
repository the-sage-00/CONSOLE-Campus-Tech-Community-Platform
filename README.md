<div align="center">

<img src="./console-frontend/public/console_logo_withText.png" alt="CONSOLE Logo" width="320"/>

<br/>

[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com)

**A campus competitive programming platform — track your LeetCode and Codeforces progress, compete on a real-time leaderboard, and grow together.**

[🌐 Live Platform](https://console.net.in) · [🐛 Report a Bug](https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/issues) · [💡 50+ Feature Ideas](CONTRIBUTING_IDEAS.md) · [🗳️ Vote & Discuss](https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/discussions)

</div>

---

## 📖 The Story

In **summer 2024**, we looked around and saw something missing — there was no single place where students could track each other's competitive programming journey, discover resources, and actually feel part of a tech community together.

So we built one from scratch.

By **September 2024**, CONSOLE was live — a platform where students verify their LeetCode and Codeforces accounts, appear on a real leaderboard ranked by actual platform ratings, track weekly contests, follow tech roadmaps, and work through a DSA sheet.

Built by students, for students. No vendor. No budget. Just code.

Now it is open source — not because it is finished, but because the best features haven't been built yet. **Come build them.**

---

## 💥 Why Contribute to CONSOLE Instead of Building from Scratch

Everyone tells you to build projects. Nobody tells you there's a difference between building a todo app alone and shipping code to a platform that **real people use every day.**

### Your code reaches 500+ real users

CONSOLE is not a demo. It is not a portfolio project sitting on localhost.
It is a live platform with **500+ active students** using it right now.

When you merge a PR here — your feature goes live. Real students see it. Real students use it.
That is not something you get from building alone.

### Open source contributions are proof — not just claims

Anyone can write "built a leaderboard app" on their resume.

But when you contribute here, your work is **public and timestamped forever** on GitHub.
Every PR, every commit, every review comment — permanently visible.
Recruiters, seniors, and anyone who looks at your profile can see exactly what you built, how you wrote it, and how you collaborated.

That is a different level of credibility.

### You learn things lectures will never teach you

Watching a tutorial builds a feature in isolation.
Reading a real codebase teaches you how everything connects.

When you trace how a user's Codeforces rating ends up on the leaderboard here, you go through:
```
Google OAuth → JWT → MongoDB → aggregation pipeline → API → React state → UI
```
No course teaches that end-to-end on a real product. You learn it by reading real code, then changing it, then shipping it.

### You join a project — not just a repo

Every contributor gets credited permanently — in the codebase, in the commit history, on the contributors page.

If you build the AI interviewer and 500 students use it — that is **your feature** on **their platform.**
You built something that mattered. Not for a grade. For real people.

### The honest truth

Building from scratch is good. But if you build the same leaderboard that 10,000 people have already built — alone, in private, following the same YouTube tutorial — you learn the syntax but miss the experience.

Contributing to a real open source project is where you learn:
- How to read code you didn't write
- How to work in a shared codebase without breaking things
- How to get your changes reviewed, questioned, and merged
- How to ship something to real users and see them actually use it

**That process — not the certificate, not the tutorial badge — is what actually makes you a developer.**

---

## 📋 Table of Contents

- [The Story](#-the-story)
- [Why Contribute Here](#-why-contribute-to-console-instead-of-building-from-scratch)
- [Features](#-features)
- [Start Here — Pick Your Level](#-start-here--pick-your-level)
- [Vote on What Gets Built Next](#-vote-on-what-gets-built-next)
- [Architecture](#-architecture)
- [How the Leaderboard Works](#-how-the-leaderboard-works)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [Feature Ideas](#-feature-ideas)
- [Team](#-team)
- [License](#-license)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏆 **Leaderboard** | Live rankings — Codeforces rating, LeetCode contest rating, total problems solved |
| ✅ **Platform Verification** | Verify your CF and LC handles with a unique code challenge |
| 📅 **Contest Tracker** | Auto-synced weekly LeetCode and Codeforces contests |
| 👤 **User Profiles** | Rich dashboard — Google avatar, stats cards, charts, achievements, badges |
| 🗺️ **Tech Roadmaps** | Curated paths for DSA, Web Dev, ML, CP, InfoSec, Web3, C++, Python |
| 📚 **DSA Sheet** | Structured problem tracker with progress |
| 🔐 **Google OAuth** | Institutional email login only |
| 👨‍💼 **Admin Panel** | User management, contest sync, participation stats |
| ⚡ **Caching** | In-memory caching for fast leaderboard loads |
| 🔄 **Auto Sync** | Weekly cron job syncs contest data automatically |

### Recent Updates — July 2025

| Change | Description |
|--------|-------------|
| 🎨 **Profile Redesign** | New hero banner with Google avatar, quick stats cards, charts section, achievements/badges, framer-motion animations |
| 📊 **Stats Charts** | LeetCode difficulty donut chart (PieChart) + Codeforces rating progress bar + stats grid |
| 🏅 **Achievement Badges** | 8 auto-computed badges (Century Club, Double Threat, Rising Star, etc.) with locked/unlocked states |
| 🖼️ **Google Profile Picture** | Avatar now displays the Google profile image with initials fallback |
| ✏️ **LeetCode Verification UX** | Updated instruction text in the verification modal — clearer guidance for adding code to ReadMe section |

---

## 🚀 Start Here — Pick Your Level

You don't need to know everything. You just need to pick a level and start.

### 🟢 Never contributed to open source before?

**Start here — this will teach you the full workflow:**

| Step | Resource |
|------|----------|
| 1. Learn Git basics | [▶ Git & GitHub for Beginners — freeCodeCamp (1 hr)](https://www.youtube.com/watch?v=RGOj5yH7evk) |
| 2. Learn how to fork & PR | [▶ Your First Pull Request — Fireship (7 min)](https://www.youtube.com/watch?v=8lGpZkjnkt4) |
| 3. Learn how to read a codebase | [▶ How to Read Code You Didn't Write — Fireship (9 min)](https://www.youtube.com/watch?v=jM4wGDEO4o8) |
| 4. Set up and run CONSOLE locally | Follow the [Quick Start](#-quick-start) guide below |
| 5. Pick a **Tier 1** issue from [CONTRIBUTING_IDEAS.md](CONTRIBUTING_IDEAS.md) | These are good first issues — UI improvements, small features |

**Your first PR can be as small as fixing a typo or improving the mobile layout.** That counts.

---

### 🟡 Know React / Node.js but never worked on a real codebase?

1. Clone the repo, run it locally, click around the actual platform
2. Read how the leaderboard works (below) — it's the core of the app
3. Read `console-frontend/src/App.jsx` to understand all the routes
4. Read `console-backend/server.js` to understand all the APIs
5. Pick a **Tier 2** feature from [CONTRIBUTING_IDEAS.md](CONTRIBUTING_IDEAS.md)

Good starting points:
- Add a search bar to the leaderboard
- Add a graphical chart view to the leaderboard
- Build the interview experience board (full stack — schema + API + UI)

---

### 🔴 Comfortable with full-stack and want to do something ambitious?

These are the features that have never been built on any campus platform anywhere:

- 🤖 **AI Mock Interviewer** — a conversational agent that conducts a real technical interview round by round, scores you, gives feedback
- 🎮 **CP Quest Mode** — RPG-style gamified learning where your actual CF/LC submissions complete quests
- 📄 **Resume Builder** — auto-fills your CP stats from CONSOLE profile, exports a clean PDF
- 🔴 **Real-Time Leaderboard** — WebSocket-powered, ratings update live as users sync their platforms
- 🏛️ **Multi-Campus Support** — make the platform config-driven so any college can deploy their own CONSOLE

Pick one. Open an issue. Build it. **No one at your college has built this before.**

---

## 🗳️ Vote on What Gets Built Next

We use **GitHub Discussions** to vote on which features the community wants most.

→ **[Open Discussions — Vote & Suggest](https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/discussions)**

**How to vote:**
- Go to Discussions → find a feature proposal → react with 👍
- The features with the most 👍 votes get prioritized
- Don't see your idea? Open a new Discussion and propose it
- The maintainers review top-voted ideas monthly and open them as official issues

**Current open polls** (vote now):

| Feature | Vote |
|---------|------|
| AI Mock Interview Agent | [👍 Vote](https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/discussions) |
| Real-Time WebSocket Leaderboard | [👍 Vote](https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/discussions) |
| Interview Experience Board | [👍 Vote](https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/discussions) |
| Resume Builder with CP Stats | [👍 Vote](https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/discussions) |
| GitHub Activity on Profile | [👍 Vote](https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/discussions) |
| CP Quest / RPG Mode | [👍 Vote](https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/discussions) |

> All 50+ ideas are listed in [CONTRIBUTING_IDEAS.md](CONTRIBUTING_IDEAS.md) — anyone can propose a new one.

---

## 🏗️ Architecture

```
CONSOLE-Campus-Tech-Community-Platform/
│
├── console-backend/                  # Node.js + Express API
│   ├── controller/
│   │   ├── googleAuthController.js   # Google OAuth login
│   │   ├── authController.js         # Platform handle verification
│   │   ├── leaderboardController.js  # Rankings & user data
│   │   ├── contestController.js      # LeetCode + CF contest sync
│   │   └── adminController.js        # Admin operations
│   ├── models/                       # Mongoose schemas (User, Contest, DSA)
│   ├── routes/                       # Express routers
│   ├── middleware/                   # JWT auth, rate limiting, security
│   ├── services/                     # verificationService, platformService, cacheService
│   ├── utils/                        # errorHandler, identity, keepalive
│   └── schedulers/                   # Weekly contest sync cron
│
└── console-frontend/                 # React 18 + Vite
    └── src/
        ├── components/               # All UI pages and components
        ├── admin/                    # Admin panel pages
        ├── context/                  # AuthProvider (JWT + Google OAuth)
        └── utils/                   # api.js, logger.js
```

---

## 📊 How the Leaderboard Works

The leaderboard has **3 views**, all using **raw platform data** — no artificial scoring formula.

```mermaid
flowchart LR
    A["User verifies\nCF / LC handle"] --> B["Platform data\nsynced to MongoDB"]
    B --> C["GET /api/leaderboard\nlimit=1000"]
    C --> D["Frontend sorts\nclient-side"]
    D --> E1["🏅 Codeforces Tab\nRaw CF Rating"]
    D --> E2["⚡ LeetCode Tab\nRaw LC Contest Rating"]
    D --> E3["📈 Total Questions\nEasy + Medium + Hard"]
```

### Filters Available

| Filter | How It Works |
|--------|-------------|
| **Year** | Parsed from institutional email prefix (e.g. `2024xxx@...` → Year 2024) |
| **Platform** | Switch between CF rating / LC contest rating / total problems |

### Access Rules

```
Not logged in          →  Redirect to /login
Non-institutional email →  Access denied
Logged in (any)        →  Can VIEW the leaderboard
Platform verified      →  APPEARS on the leaderboard
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** (Atlas free tier works)
- **Google Cloud Console** account (for OAuth Client ID)
- **Git**

### 1. Clone

```bash
git clone https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform.git
cd CONSOLE-Campus-Tech-Community-Platform
```

### 2. Backend Setup

```bash
cd console-backend
npm install
cp .env.example .env
# Fill in your values in .env
npm run dev
```

Backend runs at: `http://localhost:5000`

### 3. Frontend Setup

```bash
# New terminal
cd console-frontend
npm install
cp .env.example .env
# Fill in your values in .env
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## ⚙️ Configuration

### Backend — `console-backend/.env`

```env
# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/console

# JWT
JWT_SECRET=your-random-secret-minimum-32-characters

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com

# Admin Login
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your-secure-password

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
```

### Frontend — `console-frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_API_URL=http://localhost:5000/api/admin
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

### Setting Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → **APIs & Services** → **Credentials**
3. Create **OAuth 2.0 Client ID** (Web application)
4. Add Authorized JavaScript origins:
   - `http://localhost:5173` (dev)
   - `https://your-frontend-domain.com` (prod)
5. Copy the **Client ID** into both `.env` files

---

## 🌐 Deployment

### Frontend → Netlify

```bash
cd console-frontend
npm run build
# Deploy the dist/ folder
```

In Netlify dashboard:
- Build command: `npm run build`
- Publish directory: `dist`
- Add all `VITE_*` environment variables

### Backend → Render

- Root directory: `console-backend`
- Build command: `npm install`
- Start command: `npm start`
- Add all environment variables from `.env`

> The `keepalive.js` utility pings the server periodically to prevent Render free-tier sleep.

---

## 📡 API Reference

### Auth & Profile

```http
POST /api/auth/callback              # Google OAuth login
GET  /api/auth/profile               # Get current user profile
PUT  /api/auth/profile               # Update profile

POST /api/auth/platform/validate     # Validate handle exists on platform
POST /api/auth/platform/submit       # Submit handle, get verification code
POST /api/auth/platform/verify       # Verify code was added to profile
POST /api/auth/platform/refresh      # Refresh platform data
POST /api/auth/platform/delete       # Remove platform handle
```

### Leaderboard

```http
GET  /api/leaderboard                # Get leaderboard
     ?platform=leetcode|codeforces|all
     &limit=1000
     &page=1
```

### Contests

```http
GET  /api/contest/recent             # Recent contests
GET  /api/contest/upcoming           # Upcoming contests
POST /api/contest/sync               # Trigger sync (admin)
```

### Admin

```http
POST /api/admin/login                # Admin login
GET  /api/admin/users                # All users
GET  /api/admin/stats                # Platform stats
POST /api/admin/sync-contests        # Sync LeetCode contests
POST /api/admin/sync-codeforces      # Sync Codeforces contests
```

---

## 🤝 Contributing

CONSOLE is open to **everyone**. You don't need to be from our campus to contribute.

Whether you fix a typo or build an entire AI interview agent — every contribution matters.

### New to Open Source?

Watch these first — they will teach you everything you need:

| Video | What You Learn |
|-------|---------------|
| [▶ Git and GitHub for Beginners (freeCodeCamp)](https://www.youtube.com/watch?v=RGOj5yH7evk) | Git basics, fork, clone, push |
| [▶ How to Make Your First Pull Request (Fireship)](https://www.youtube.com/watch?v=8lGpZkjnkt4) | Fork → branch → PR workflow |
| [▶ Contributing to Open Source for Beginners](https://www.youtube.com/watch?v=yzeVMecydCE) | How to find issues, what to build |

### How to Contribute

1. ⭐ **Star & Fork** the repo
2. 📖 **Read [CONTRIBUTING_IDEAS.md](CONTRIBUTING_IDEAS.md)** — pick a feature you want to build
3. 🐛 **Open a GitHub Issue** — describe what you'll build (so no one duplicates it)
4. 🌿 **Create a branch** — `git checkout -b feature/your-feature-name`
5. 💻 **Build it**
6. ✅ **Test it** — `npm run build` must pass
7. 📤 **Open a PR** — target the `dev` branch
8. 🎉 **Get reviewed and merged**

### Branch Rules

| Branch | Purpose |
|--------|---------|
| `main` | Production — protected, no direct pushes |
| `dev` | Active development — **all PRs target this** |
| `feature/*` | Your feature branches |

> ⚠️ Always PR into `dev`, never into `main`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines and [CONTRIBUTING_IDEAS.md](CONTRIBUTING_IDEAS.md) for **50+ feature ideas** to build.

---

## 💡 Feature Ideas

We've put together **50+ ideas** — from beginner UI improvements to advanced AI agents.

→ **[View all ideas in CONTRIBUTING_IDEAS.md](CONTRIBUTING_IDEAS.md)**

A few highlights:

- 🤖 **AI Mock Interview Agent** — conducts a real technical interview round by round
- 📄 **Resume Builder** — auto-fills CP stats from your CONSOLE profile
- 🎮 **CP Quest Mode** — RPG-style gamified DSA learning path
- 📊 **Real-Time Leaderboard** — WebSocket-powered live rank updates
- 💬 **Interview Experience Board** — crowdsourced placement interview experiences
- 🔧 **VS Code Extension** — shows your CONSOLE rank in the status bar
- 🏅 **Annual Wrapped** — your year in competitive programming

Pick one. Open an issue. Build it.

---

## 👥 Team

Built from scratch by:

| Name | GitHub |
|------|--------|
| **Rishi Kataria** | [@the-sage-00](https://github.com/the-sage-00) |
| **Amit Kumar** | [@Amit6217](https://github.com/Amit6217) |
| **Shivam Parekh** | [@2005-Shiv](https://github.com/2005-Shiv) |

Started: **Summer 2024** · Launched: **September 2024**

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

You are free to use, modify, and distribute this project. If you build something with it, we'd love to hear about it.

---

<div align="center">

Built with ❤️ · [console.net.in](https://console.net.in) · ⭐ Star this repo if it helped you

</div>
