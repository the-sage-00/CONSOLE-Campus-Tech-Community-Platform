<div align="center">

<img src="https://raw.githubusercontent.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/dev/console-frontend/public/console_logo_withText.png" alt="CONSOLE Logo" width="320"/>

<br/>

[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com)

**A campus competitive programming platform — track your LeetCode and Codeforces progress, compete on a real-time leaderboard, and grow together.**

[🌐 Live Platform](https://console.net.in) · [🐛 Report a Bug](https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/issues) · [✨ Suggest a Feature](https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/issues) · [💡 Contribution Ideas](CONTRIBUTING_IDEAS.md)

</div>

---

## 📖 The Story

In **summer 2024**, Rishi and his teammates looked around and saw something missing — there was no single place where students could track each other's competitive programming journey, discover resources, and actually feel part of a tech community together.

So they built one from scratch.

By **December 2024**, CONSOLE was live — a platform where students verify their LeetCode and Codeforces accounts, appear on a real leaderboard ranked by actual platform ratings, track weekly contests, follow tech roadmaps, and work through a DSA sheet.

It was built by students, for students. No vendor. No budget. Just code.

Now it is open source — not because it is finished, but because the best features haven't been built yet. **Come build them.**

---

## 📋 Table of Contents

- [Features](#-features)
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
| 👤 **User Profiles** | Personal dashboard with verified platform stats |
| 🗺️ **Tech Roadmaps** | Curated paths for DSA, Web Dev, ML, CP, InfoSec, Web3, C++, Python |
| 📚 **DSA Sheet** | Structured problem tracker with progress |
| 🔐 **Google OAuth** | Institutional email login only |
| 👨‍💼 **Admin Panel** | User management, contest sync, participation stats |
| ⚡ **Caching** | In-memory caching for fast leaderboard loads |
| 🔄 **Auto Sync** | Weekly cron job syncs contest data automatically |

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph Client["🌐 Frontend (React + Vite)"]
        UI["Components"]
        Auth["AuthProvider Context"]
        Admin["Admin Panel"]
    end

    subgraph Server["⚙️ Backend (Node.js + Express)"]
        GAuth["Google Auth Controller"]
        AuthCtrl["Auth Controller\n(Platform Verification)"]
        LB["Leaderboard Controller"]
        Contest["Contest Controller"]
        AdminCtrl["Admin Controller"]
        Cache["Cache Service"]
        Cron["Contest Cron (weekly)"]
    end

    subgraph DB["🗄️ MongoDB Atlas"]
        Users[("Users")]
        Contests[("Contests")]
        DSA[("DSA Sheet")]
    end

    subgraph External["🌍 External APIs"]
        Google["Google Identity Services"]
        CF["Codeforces REST API"]
        LC["LeetCode GraphQL API"]
    end

    UI -->|"JWT Bearer"| Server
    Auth -->|"POST /api/auth/callback"| GAuth
    GAuth -->|"verify credential"| Google
    GAuth -->|"find/create user"| Users
    AuthCtrl -->|"verify handle"| CF
    AuthCtrl -->|"verify handle"| LC
    LB -->|"aggregation"| Users
    LB --> Cache
    Contest -->|"sync"| CF
    Contest -->|"sync"| LC
    Contest --> Contests
    Cron -->|"weekly trigger"| Contest
    AdminCtrl --> Users
    AdminCtrl --> Contests
```

### Directory Structure

```
CONSOLE-Campus-Tech-Community-Platform/
├── console-backend/
│   ├── controller/          # Route handlers
│   │   ├── googleAuthController.js   # Google OAuth
│   │   ├── authController.js         # Platform verification
│   │   ├── leaderboardController.js  # Rankings
│   │   ├── contestController.js      # Contest sync
│   │   └── adminController.js        # Admin operations
│   ├── models/              # Mongoose schemas (User, Contest, DSA)
│   ├── routes/              # Express routers
│   ├── middleware/          # userAuth, adminAuth, security
│   ├── services/            # verificationService, platformService, cacheService
│   ├── utils/               # errorHandler, identity, keepalive
│   └── schedulers/          # contestCron.js
│
└── console-frontend/
    └── src/
        ├── components/      # All UI components
        ├── admin/           # Admin panel pages
        ├── context/         # AuthProvider
        └── utils/           # api.js, logger.js
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

### Contribution Flow

```mermaid
flowchart TD
    A["⭐ Star & Fork the repo"] --> B["📖 Read CONTRIBUTING_IDEAS.md\nPick a feature you want to build"]
    B --> C["🐛 Open a GitHub Issue\nDescribe what you will build"]
    C --> D["🌿 Create a feature branch\ngit checkout -b feature/your-feature"]
    D --> E["💻 Build it"]
    E --> F["✅ Test it\nnpm run build / npm test"]
    F --> G["📤 Open a Pull Request\ntarget: dev branch"]
    G --> H["👀 Code Review"]
    H --> I["🎉 Merged!"]
```

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

| Name | Role | GitHub |
|------|------|--------|
| **Rishi Kataria** | Co-founder, Lead Developer | [@the-sage-00](https://github.com/the-sage-00) |
| **Amit Kumar** | Co-founder, Developer | [@Amit6217](https://github.com/Amit6217) |
| **Shivam Parekh** | Co-founder, Developer | — |

Started: **Summer 2024** · Launched: **December 2024**

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

You are free to use, modify, and distribute this project. If you build something with it, we'd love to hear about it.

---

<div align="center">

Built with ❤️ · [console.net.in](https://console.net.in) · ⭐ Star this repo if it helped you

</div>
