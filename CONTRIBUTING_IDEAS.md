# 🚀 CONSOLE — Open Source Feature Roadmap

> Built at MNIT Jaipur. Open to all. Come build something real.
>
> This is not a list of tasks. This is a list of **problems worth solving.**
> Each one is a real project. Pick one. Build it. Ship it.

---

## Table of Contents

- [Tier 1 — Good First Issues](#-tier-1--good-first-issues)
- [Tier 2 — Intermediate Full-Stack](#-tier-2--intermediate-full-stack)
- [Tier 3 — Advanced / System Design](#-tier-3--advanced--system-design)
- [AI & Agents](#-ai--agents)
- [Resume & Career Tools](#-resume--career-tools)
- [Campus Life Features](#-campus-life-features)
- [Developer Tools & Extensions](#-developer-tools--extensions)
- [Creative / Experimental](#-creative--experimental)
- [Quick Fire Ideas](#-quick-fire-ideas)

---

## 🟢 Tier 1 — Good First Issues

### 1. Leaderboard Graphical View
**What**: Bar chart / line graph alongside the table. Show rating over time for top 10 users.
**Build with**: Recharts or Chart.js
**Learn**: Data visualization, React state, responsive design
**Challenge**: How do you show CF rating, LC contest rating, and total questions on the same graph when they are totally different scales?

---

### 2. User Profile Stats Dashboard
**What**: Transform the flat profile page into a real dashboard.
Include: GitHub-style streak calendar, rating history graph, difficulty breakdown pie chart, rank badges.
**Build with**: Recharts / D3.js + React
**Learn**: Complex UI composition, data transformation, SVG animations
**Challenge**: What do you show when a user has verified LC but not CF?

---

### 3. Dark / Light Mode Toggle
**What**: App is dark-only. Add theme toggle persisting across sessions.
**Build with**: React Context + CSS variables + localStorage
**Learn**: Theming systems, custom properties, context patterns

---

### 4. Mobile-First Leaderboard
**What**: Current table breaks on phones. Build a card layout for mobile, table for desktop.
**Build with**: TailwindCSS responsive utilities
**Learn**: Responsive design, conditional rendering

---

### 5. Real-Time Leaderboard Search
**What**: Search by name and instantly jump to your rank — no scrolling.
**Build with**: Frontend debounce hook + filter
**Learn**: Debouncing, UX patterns, controlled inputs

---

## 🟡 Tier 2 — Intermediate Full-Stack

### 6. Interview Experience Board
**What**: Students share real placement / internship interview experiences.

Schema:
```
InterviewExperience {
  author, company, role, type (on-campus/off-campus/PPO),
  year, rounds: [{ name, description, questions }],
  verdict, tips, upvotes, isAnonymous, createdAt
}
```

**Features**: Filter by company / role / year. Upvote. Anonymous mode.
**Challenge**: How do you prevent fake experiences? How do you handle moderation?

---

### 7. Campus Interview Questions Bank
**What**: Crowdsourced bank of actual interview questions seen at MNIT placements.
**Features**: Tag by company + topic. "I was asked this" button. Search. Upvote.
**Challenge**: Duplicate detection. How do you verify authenticity without gatekeeping?

---

### 8. Roadmap Progress Tracker
**What**: Tick off topics in the existing tech roadmaps. See % completion. Resume from where you left off.
**Build with**: Per-user per-topic progress in MongoDB
**Challenge**: Roadmap content can change over time — how do you handle progress for deleted topics?

---

### 9. GitHub Activity Integration
**What**: Link your GitHub. Show contribution heatmap, top repos, languages used — alongside CP stats.
**Build with**: GitHub public REST API
**Challenge**: 60 req/hour unauthenticated rate limit. Design a caching strategy that works for 500+ users.

---

### 10. Codeforces Problem Tracker
**What**: Problems a verified CF user solved, filterable by tag / difficulty. "Want to revisit" bookmark.
**Build with**: CF submissions API + MongoDB
**Challenge**: CF returns all submissions including WA. How do you efficiently extract only AC unique problems?

---

### 11. Contest Reminder Notifications
**What**: Browser push notifications before CF / LC contests. User sets reminder time (15min / 1hr / 1day before).
**Build with**: Web Push API + service worker
**Challenge**: Timezone handling. How do you store and trigger reminders for 500+ users without missing any?

---

### 12. Weekly Digest Email
**What**: Every Monday: your rank, rank change from last week, who overtook you, contests this week.
**Build with**: node-cron (already in project) + Resend or Mailgun
**Challenge**: Bulk email without hitting rate limits. How do you compute rank diff across 1000 users efficiently?

---

### 13. Community Challenge — Problem of the Week
**What**: Admins post one problem per week. Users submit solution links. First-to-solve leaderboard. Discussion thread.
**Challenge**: Verifying someone solved the problem without storing code. Time-based resets. Anti-gaming.

---

## 🔴 Tier 3 — Advanced / System Design

### 14. Real-Time Leaderboard via WebSockets
**What**: Ratings update live — no refresh. When a user's platform data syncs, everyone sees it instantly.
**Build with**: Socket.io
**Challenge**: 1000 concurrent users on leaderboard page. How do you push updates without DB hammering?

---

### 15. Redis Caching Layer
**What**: Replace in-memory node-cache with Redis. Makes backend horizontally scalable.
**Learn**: Redis fundamentals, cache invalidation, TTL design, pub/sub
**Challenge**: What is your invalidation strategy? When a user refreshes platform data, which cache keys expire?

---

### 16. Public REST API with API Keys
**What**: Public endpoints for CONSOLE leaderboard data. Rate-limited. API key per user.
**So others can build**: Chrome extensions, VS Code extensions, Discord bots, mobile apps — all reading CONSOLE data.
**Challenge**: Design the API so it exposes useful public data without leaking private user info. Versioning strategy?

---

### 17. Advanced Admin Analytics
**What**: Charts for: user growth over time, CF vs LC adoption rate, contest participation trends, retention.
**Build with**: MongoDB aggregation + Recharts
**Challenge**: Aggregation queries are expensive. How do you pre-compute and store daily/weekly snapshots?

---

### 18. Peer Study Group Matching
**What**: Users fill: topics I'm strong at, topics I need help in, available time slots. Algorithm matches compatible partners.
**Challenge**: Define "compatibility." Handle inactive users. Prevent the same people always being matched.

---

### 19. Contest Performance Analytics
**What**: For each contest: percentile rank, problems solved vs missed, time per problem, performance trend over contests.
**Build with**: CF standings API + LC GraphQL
**Challenge**: CF standings have 20,000+ participants. How do you compute percentile without fetching everything every time?

---

---

## 🤖 AI & Agents

### 20. AI Code Review Bot
**What**: User pastes a LeetCode solution. An AI reviews it — time complexity, space complexity, edge cases missed, cleaner approaches.
**Build with**: Gemini / GPT-4o API + streaming response
**Learn**: LLM API integration, prompt engineering, streaming UI
**Challenge**: Prompt it to give educational feedback, not just rewrite the code. How do you prevent hallucinated complexity analysis?

---

### 21. AI Interview Preparation Agent
**What**: A conversational agent that conducts mock technical interviews.
User says "interview me for SDE-1 at a product company." Agent asks DSA questions round by round, evaluates verbal answers, gives a scorecard at the end.
**Build with**: LLM with multi-turn conversation memory + speech-to-text optional
**Learn**: Agent design, conversation state management, evaluation rubrics
**Challenge**: How do you make the agent adaptive — harder questions if user is doing well, easier if struggling?

---

### 22. AI DSA Hint System
**What**: User is stuck on a problem. They describe it in plain English. AI gives progressive hints — not the solution, just the next nudge.
**Build with**: Gemini API with carefully crafted system prompts
**Learn**: Prompt engineering, few-shot prompting, guardrails
**Challenge**: How do you prevent the AI from just solving it for them? Design a "hint level 1, 2, 3" system with increasing specificity.

---

### 23. AI-Powered Campus Placement Predictor
**What**: Based on a student's CP rating (CF/LC), CGPA, skills, and past MNIT placement data — predict shortlisting probability for specific companies.
**Build with**: ML model trained on anonymized historical MNIT placement data + simple frontend form
**Learn**: ML pipeline, feature engineering, model serving, ethical AI (bias in predictions)
**Challenge**: Data is limited and biased. How do you communicate uncertainty to the user so they don't treat it as a guarantee?

---

### 24. AI Roadmap Generator
**What**: User says "I want to become a backend developer in 6 months, I know basic Python." AI generates a personalized week-by-week roadmap and saves it to their profile.
**Build with**: LLM + structured output (JSON roadmap) + existing roadmap UI
**Learn**: Structured LLM outputs, prompt engineering for long-form planning, UI for dynamic content
**Challenge**: Generic advice is useless. How do you ground the roadmap in what's actually on the platform vs what the LLM hallucinates?

---

### 25. AI Contest Strategy Advisor
**What**: Before a CF/LC contest: given user's past performance and weak topics, AI suggests which problem types to attempt first and which to skip.
After the contest: AI analyses what went wrong.
**Build with**: CF / LC history + LLM analysis layer
**Learn**: Context window management, analytical prompting, combining structured data with LLM reasoning

---

### 26. AI-Powered Code Explainer
**What**: Paste any algorithm code. AI explains it line by line in plain English, draws the mental model, shows trace through an example.
**Build with**: Gemini API + syntax highlighting + animated trace UI
**Learn**: Code-to-explanation prompting, UI design for technical explanations

---

### 27. Discord / Slack AI Bot for CONSOLE
**What**: A bot in the campus Discord server. Commands like `/rank @username`, `/upcoming-contests`, `/problem easy dp`, `/mock-interview`.
**Build with**: Discord.js + CONSOLE public API + LLM for conversational commands
**Learn**: Bot development, slash commands, webhook integrations, rate limiting
**Challenge**: How do you keep the bot fast when CONSOLE API calls add latency?

---

### 28. AI Resume Feedback Agent
**What**: User uploads resume PDF. AI gives specific, actionable feedback — weak action verbs, missing metrics, ATS score, how to reframe a project description.
**Build with**: PDF parsing + LLM + structured feedback output
**Learn**: Document parsing (pdf-parse), prompt chaining, structured output
**Challenge**: Generic feedback ("use action verbs") is useless. How do you make it comment on the specific lines of the actual resume?

---

---

## 📄 Resume & Career Tools

### 29. MNIT Resume Template Builder
**What**: A structured resume builder pre-loaded with the MNIT standard template format.
User fills fields: personal info, education (auto-filled from profile), skills, projects, experience, achievements (CP ratings auto-pulled from CONSOLE profile).
Exports a clean PDF.
**Build with**: React form + jsPDF or Puppeteer PDF generation
**Learn**: PDF generation, form state management, template systems
**Challenge**: Resume formatting is pixel-precise. How do you handle long project descriptions without breaking layout?

---

### 30. CP Achievements Auto-Export to Resume
**What**: One-click add to resume: "Codeforces Expert — Rating 1643 (Top 12% globally)" or "LeetCode — 847 problems solved."
Generates a formatted achievement line ready to paste into any resume.
**Build with**: Template strings from live CONSOLE profile data
**Learn**: Data formatting, copy-to-clipboard UX

---

### 31. Project Showcase Portfolio
**What**: Each user gets a public `/u/username` portfolio page — shows their CP stats, GitHub activity, projects they list, skills.
A shareable link they can put in their resume instead of a plain GitHub link.
**Build with**: Public-facing user page (no auth required to view) + custom OG meta tags for LinkedIn previews
**Learn**: Public vs private data design, SEO, Open Graph protocol
**Challenge**: User controls what is visible. Design privacy settings — what is public, what is private?

---

### 32. Placement Season Timeline Tracker
**What**: During placement season, students track: which companies visited, which rounds they cleared, final outcome.
Aggregate view shows which companies are visiting MNIT this season and what their process looks like.
**Build with**: User placement tracker + aggregated anonymous stats
**Learn**: Time-series data, aggregated anonymous reporting
**Challenge**: This is sensitive data. How do you aggregate usefully while protecting individual privacy?

---

### 33. Skill Gap Analyzer
**What**: User picks a target company (Google, Uber, etc.) and target role. System shows: what skills are typically required, which ones user already demonstrates (from CP stats + projects), what the gap is, and what to study.
**Build with**: Curated skills database + user profile matching + gap visualization
**Learn**: Data modeling for skills, matching algorithms, UI for gap analysis

---

---

## 🏫 Campus Life Features

### 34. Campus Event Aggregator
**What**: A single feed of all tech events happening on campus — hackathons, talks, workshops, club events — from all clubs and departments.
Admins from each club can post. Students follow topics and get notified.
**Build with**: Multi-admin posting system + notification subscriptions
**Learn**: Multi-role systems, event schema design, notification architecture
**Challenge**: Events come from many clubs. How do you give clubs posting access without giving them full admin access?

---

### 35. Anonymous Campus Q&A
**What**: "Ask seniors anything" — anonymous questions, answered by verified seniors.
Example: "What's the placement process at Microsoft like?" "How to get an internship in 2nd year?"
**Build with**: Anonymous post system + verified answerer roles + upvote ranking
**Learn**: Anonymity implementation (store author but don't display), role-based permissions
**Challenge**: Anonymity can be abused. How do you allow anonymous questions while still being able to moderate/remove harmful content?

---

### 36. Mess / Canteen Menu + Rating System
**What**: Daily mess menu (posted by admin), students rate each meal. Weekly trend of best and worst meals. Feedback forwarded to mess management.
**Build with**: Simple CRUD + daily rating aggregation
**Learn**: Time-based data aggregation, admin post systems, feedback loops
**Fun challenge**: Can you predict tomorrow's menu quality based on historical ratings?

---

### 37. Lost & Found Board
**What**: Students post lost/found items with description and optional photo. Claim system with verification.
**Build with**: Image upload (Cloudinary) + post + claim flow
**Learn**: Image upload, claim/verification flows, time-based post expiry
**Challenge**: How do you verify the claimant is the actual owner without being invasive?

---

### 38. Study Spot Availability Map
**What**: Real-time map of campus — library sections, labs, reading rooms. Students mark spots as occupied/free. Heatmap of busy times.
**Build with**: Campus map SVG + real-time updates + crowdsourced availability
**Learn**: SVG interaction, real-time data, crowdsourced trust problems
**Challenge**: Data accuracy depends on students updating it honestly. How do you incentivize correct updates?

---

### 39. Campus Carpool / Ride Share Board
**What**: Students going home for holidays or traveling to the same city coordinate carpooling.
**Build with**: Post system (from-to-date-seats) + contact reveal after match
**Learn**: Privacy-first contact systems (reveal email/phone only after both parties agree)

---

---

## 🧰 Developer Tools & Extensions

### 40. VS Code Extension — CONSOLE Rank in Status Bar
**What**: Shows your current CONSOLE rank in VS Code status bar. Click to open leaderboard.
**Build with**: VS Code Extension API + CONSOLE public API
**Learn**: VS Code extension development, extension publishing to marketplace
**Challenge**: Needs CONSOLE to have a public API first (see Feature 16). Good example of features building on each other.

---

### 41. Chrome Extension — CONSOLE Overlay on LeetCode/CF
**What**: On a LeetCode or Codeforces profile page — shows that person's CONSOLE rank if they are a verified CONSOLE user.
**Build with**: Chrome extension content scripts + CONSOLE public API
**Learn**: Browser extensions, content scripts, cross-origin API calls from extensions

---

### 42. CLI Tool for CONSOLE
**What**: `console-cli rank` — shows leaderboard in terminal.
`console-cli my-stats` — shows your profile.
`console-cli upcoming` — shows upcoming contests.
**Build with**: Node.js CLI (commander.js) + CONSOLE public API
**Learn**: CLI tool development, npm package publishing, terminal UI (chalk, ora)

---

### 43. GitHub Action — Auto-Update CONSOLE Stats in README
**What**: Like the popular "github-readme-stats" — a GitHub Action that updates a README section with your current CONSOLE rank + stats.
**Build with**: GitHub Actions + CONSOLE public API + SVG generation
**Learn**: GitHub Actions, SVG image generation, dynamic badges
**Viral potential**: If it works well, every MNIT developer will add it to their GitHub profile.

---

### 44. Telegram Bot
**What**: `/rank username`, `/contests`, `/problem`, `/mockinterview`
**Build with**: python-telegram-bot or node-telegram-bot-api + CONSOLE API
**Learn**: Bot development, webhook vs polling, Telegram API

---

---

## 🎨 Creative / Experimental

### 45. "Typing Speed Affects Your Rank" — Typing Race Mini-Game
**What**: A fun mini-game where students race to type a code snippet. Typing speed + accuracy gives bonus points visible on a separate "typing leaderboard."
Completely optional and fun — not part of main rankings.
**Build with**: Real-time typing race (WebSockets), WPM calculation, code snippet database
**Learn**: Real-time multiplayer logic, WebSockets, race condition handling

---

### 46. CP Story Mode — "The Algorithm Quest"
**What**: Gamified DSA learning path styled like an RPG. Complete "quests" (solve specific problem types). Earn XP. Level up. Unlock new quest lines (trees → graphs → DP).
CONSOLE tracks which quests you complete via your actual CF/LC submission history.
**Build with**: Game state in MongoDB + CF/LC API for quest completion verification + RPG-style UI
**Learn**: Game design principles applied to education, complex state machines, creative UI
**Challenge**: How do you make it genuinely motivating and not just a skin over a TODO list?

---

### 47. Code Golf Leaderboard
**What**: Weekly "code golf" challenge — solve a problem in the fewest characters possible. Separate leaderboard ranked by character count.
**Build with**: Problem posting + code submission (count characters, don't execute) + weekly reset

---

### 48. "Roast My Code" Feature
**What**: Submit your solution. Community roasts it (good-natured) — flags things like unnecessary variables, O(n^2) when O(n) was possible, naming your variable `x` when it's clearly `totalStudents`.
**Build with**: Community post + threaded comments + upvote funniest roast
**Learn**: Threaded comment systems, content moderation, community features

---

### 49. Campus Tech Podcast / Talk Archive
**What**: Archive of tech talks, alumni sessions, placement experiences as audio/video. Transcribed with AI. Searchable.
**Build with**: Video/audio storage (Cloudinary or S3) + Whisper API for transcription + search
**Learn**: Media storage, AI transcription APIs, search indexing

---

### 50. Competitive Programming "War Room" — Real-Time Contest Together
**What**: During a live CF/LC contest, a shared virtual room for batchmates. See who solved which problem in real-time. React with emojis. Shared countdown timer. No cheating — no code sharing, just status.
**Build with**: WebSockets + real-time presence + CF/LC submission feed integration
**Learn**: Real-time collaborative features, presence systems, event streaming

---

---

## ⚡ Quick Fire Ideas

| Idea | Difficulty | What You Learn |
|------|:----------:|----------------|
| Badge / achievement system | 🟡 Medium | Event-driven systems, gamification |
| "Who solved this?" — find batchmates who solved same LC problem | 🟡 Medium | LC API, social graphs |
| CP Blog — write about your approach | 🟢 Easy | Rich text editor (TipTap) |
| Follow system — track specific people's ratings | 🟡 Medium | Social graph, feed design |
| Random problem button by tag + rating | 🟢 Easy | Filter UI |
| Admin announcement banners | 🟢 Easy | Admin CRUD |
| PWA support — installable on phone | 🟡 Medium | Service workers |
| Multi-campus support (config-driven, not MNIT-hardcoded) | 🔴 Hard | Multi-tenancy |
| "Currently coding" status (like Spotify but for problems) | 🟡 Medium | Real-time presence |
| Leaderboard time-travel — see how rankings looked 1 month ago | 🔴 Hard | Historical snapshots, time-series |
| Automated YouTube playlist recommender by topic | 🟢 Easy | YouTube Data API |
| Peer code review request board | 🟡 Medium | Request/response system, notifications |
| CP flashcard system — spaced repetition for algorithms | 🟡 Medium | SRS algorithm, spaced repetition |
| "I'm available for mock interview" board | 🟢 Easy | Availability scheduling |
| Annual wrapped — your year in code (Spotify Wrapped style) | 🟡 Medium | Annual data aggregation, shareable cards |

---

## 🎓 Skills Map — What You Learn Here

| Skill | Where You Practice It |
|-------|-----------------------|
| React + hooks | Any frontend feature |
| MongoDB aggregation | Leaderboard, analytics, career tools |
| REST + WebSocket API design | Public API, real-time features |
| Redis caching | Tier 3 backend |
| LLM/AI API integration | Any AI feature |
| Prompt engineering | AI interview agent, code reviewer |
| PDF generation | Resume builder |
| Browser extensions | Chrome extension, VS Code extension |
| CLI tool development | Console CLI |
| Service workers / PWA | Notifications, offline mode |
| Discord / Telegram bots | Bot features |
| System design thinking | Every Tier 3 and AI feature |
| Open source workflow | All of the above |

---

## 🛠️ How to Contribute

```bash
# 1. Fork the repo
# 2. Clone your fork
git clone https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform

# 3. Read AGENT_IMPLEMENTATION_GUIDE.md first — understand the codebase
# 4. Pick ONE idea from this file
# 5. Open a GitHub Issue: describe what you want to build and your approach
# 6. Build on a feature branch
git checkout -b feature/your-feature-name
# 7. Submit a PR with screenshots or demo video
```

> **One rule**: Open an issue before building — so two people do not build the same thing simultaneously.

---

## 📣 The Point

You don't grow by copying what exists in secret.

You grow by reading real code, understanding how it works,  
and making it better — then shipping that improvement where everyone can see it.

Every feature you add here is a real project on your resume.  
Every PR you merge proves you can work on a production codebase.  
Every issue you open proves you can think about real problems clearly.

The platform is open. The ideas are here. The codebase is real.

**Come build. Don't just copy.**
