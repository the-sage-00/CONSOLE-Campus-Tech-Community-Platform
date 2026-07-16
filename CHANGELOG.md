# Changelog

All notable changes to CONSOLE are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased] — Open Source Launch

### Added
- `CONTRIBUTING_IDEAS.md` — 50+ feature ideas for contributors (AI agents, resume tools, campus life features, developer extensions)
- `CONTRIBUTING.md` — Full contributor guide with beginner video links and PR workflow
- Open source public release

### Planned by Community
See [CONTRIBUTING_IDEAS.md](CONTRIBUTING_IDEAS.md) for the full roadmap.

---

## [2.1.0] — July 2026 · Open Source Cleanup

### Removed (Dead Code)
- `authControllerNew.js` — legacy OTP/password registration controller
- `authControllerV2.js` — legacy auth iteration
- `routes/authRoutes.js`, `routes/authRoutesV2.js` — dead routes (never imported)
- `models/PendingUser.js` — OTP-based temp user model
- `models/PasswordReset.js` — password reset token model
- `services/emailService.js` — SendGrid OTP email service
- `utils/scoreCalculator.js` — dead scoring formula (frontend never used it)
- `Register.jsx`, `OTPVerification.jsx`, `ForgotPassword.jsx` — dead auth UI
- `LeaderboardTable.jsx`, `LeaderboardAnalytics.jsx` — old leaderboard pages
- `ScoreCalculationDropdown.jsx`, `AddUserForm.jsx`, `AddMultiUserForm.jsx` — unused components
- All migration and debug scripts (`migrate-*.js`, `check-mongo.js`, etc.)
- All internal dev fix docs (`REGISTRATION_FLOW_UPDATE.md`, `SESSION_MANAGEMENT_FIX.md`, etc.)
- Committed `.env` file (contained real secrets — removed from git history)

### Added
- `.github/workflows/ci.yml` — GitHub Actions CI (lint backend, build frontend, run tests)
- `.github/ISSUE_TEMPLATE/` — Bug report and feature request templates
- `.github/PULL_REQUEST_TEMPLATE.md` — PR checklist template
- `.eslintrc.cjs` — ESLint configuration for ES modules

### Changed
- `LeaderboardProtected.jsx` — removed mandatory platform verification gate (login only now required to view leaderboard)
- `authController.js` — removed dead `register`, `login`, `verifyEmail`, `resendVerificationEmail` functions and legacy imports
- `User.js` — removed `password`, `bcrypt`, `platforms` legacy fields and dead methods (`comparePassword`, `calculateTotalScore`, `getBestPlatform`, `getNormalizedScores`)
- `leaderboardController.js` — removed dead formula aggregation (frontend sorts client-side with raw data)
- `package.json` (backend) — removed `@sendgrid/mail`, `bcrypt`, `nodemailer`, `readline-sync`
- `README.md` — complete rewrite with real team info, architecture diagrams, leaderboard explanation

---

## [2.0.0] — December 2024 · Platform Launch

### Added
- **Google OAuth** — institutional email login, replaces all password-based auth
- **Platform Verification** — unique code challenge to verify CF and LC handles
- **Unified Leaderboard** — three views: CF rating, LC contest rating, total problems solved
- **Year-wise filtering** — filter leaderboard by batch year (parsed from email)
- **Contest Tracker** — LeetCode and Codeforces weekly contest sync
- **Admin Dashboard** — user management, contest sync triggers, participation stats
- **DSA Sheet** — structured problem tracker with per-user progress
- **Tech Roadmaps** — paths for DSA, Web Dev, ML, CP, InfoSec, Web3, C++, Python
- **User Profile** — personal stats dashboard with verified platform data
- **Keep-alive system** — prevents server sleep on free-tier hosting
- **In-memory caching** — node-cache for leaderboard performance
- **Weekly cron job** — auto-syncs contest data every Sunday

### Changed
- Migrated fully from email/password to Google OAuth
- Leaderboard redesigned around raw platform ratings (no formula)

---

## [1.0.0] — Summer 2024 · Prototype

### Added
- Initial concept and architecture design
- Basic leaderboard with manual data entry
- LeetCode and Codeforces API integration proof-of-concept
- Core Express backend + React frontend scaffolding

---

## Contributors

| Name | GitHub |
|------|--------|
| Rishi Kataria | [@the-sage-00](https://github.com/the-sage-00) |
| Amit Kumar | [@Amit6217](https://github.com/Amit6217) |
| Shivam Parekh | — |

[View all contributors](https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/graphs/contributors)
