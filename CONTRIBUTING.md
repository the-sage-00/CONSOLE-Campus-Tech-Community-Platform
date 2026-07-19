# Contributing to Console

First off, thank you for considering contributing to Console! 🎉

It's people like you that make Console such a great tool for the tech community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Environment Variables Guide](#environment-variables-guide)
- [MongoDB Atlas Setup Guide](#mongodb-atlas-setup-guide)
- [Google OAuth Credentials Guide](#google-oauth-credentials-guide)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Contribution Workflow](#contribution-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Common Errors & Solutions](#common-errors--solutions)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- **Be Respectful**: Treat everyone with respect and kindness
- **Be Collaborative**: Work together and help each other
- **Be Professional**: Keep discussions focused and constructive
- **Be Inclusive**: Welcome newcomers and diverse perspectives

## Prerequisites

Before setting up the project, ensure you have the following installed and configured.

### 1. Node.js (v18 or higher)

Console requires **Node.js v18 or later**. Check your current version:

```bash
node -v
npm -v
```

If you don't have Node.js installed or need to upgrade:

- **Download**: [https://nodejs.org/](https://nodejs.org/) (download the LTS version)
- **Using nvm (recommended)** — allows you to switch between Node versions easily:
  - **Windows**: [nvm-windows](https://github.com/coreybutler/nvm-windows)
  - **macOS/Linux**: [nvm-sh](https://github.com/nvm-sh/nvm)
  ```bash
  nvm install 18
  nvm use 18
  ```

📺 **Tutorial**: [How to Install Node.js and npm](https://www.youtube.com/watch?v=4FSpV0YmrNc)

### 2. Git

Check if Git is installed:

```bash
git --version
```

If not installed:

- **Download**: [https://git-scm.com/downloads](https://git-scm.com/downloads)
- **Windows**: Download the installer and run it. Make sure to select "Git from the command line and also from 3rd-party software" during installation.
- **macOS**: `brew install git` or download from the website
- **Linux**: `sudo apt install git` (Debian/Ubuntu) or `sudo dnf install git` (Fedora)

📺 **Tutorial**: [Git Basics for Beginners](https://www.youtube.com/watch?v=HkdAHXoRtos)

### 3. MongoDB

You have two options for MongoDB:

#### Option A: MongoDB Atlas (Cloud — Recommended for Beginners)
A free cloud-hosted MongoDB database. No installation needed. See the [MongoDB Atlas Setup Guide](#mongodb-atlas-setup-guide) below.

#### Option B: Local MongoDB Installation
- **Windows**: Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- **macOS**: `brew install mongodb-community`
- **Linux**: Follow the [official installation guide](https://www.mongodb.com/docs/manual/installation/)

📺 **Tutorial**: [MongoDB Atlas Setup Tutorial](https://www.youtube.com/watch?v=rPqRyYJmx2g)

### 4. Google Cloud Console Account

You need a Google Cloud project with OAuth credentials to enable Google Sign-In. See the [Google OAuth Credentials Guide](#google-oauth-credentials-guide) below.

📺 **Tutorial**: [Google OAuth Setup for Web Apps](https://www.youtube.com/watch?v=HtJKUQX9Xo4)

## Project Setup

### Step 1: Fork the Repository

1. Go to the [Console repository](https://github.com/ORIGINAL-OWNER/myconsole)
2. Click the **Fork** button (top-right corner)
3. This creates a copy of the repository under your GitHub account

![Fork button location](https://docs.github.com/assets/cb-20363/images/help/repository/fork_button.png)

> 💡 **Tip**: If you've already forked before, make sure your fork is up to date. See [Keeping Your Fork Updated](#keeping-your-fork-updated).

### Step 2: Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/myconsole.git
cd myconsole
```

Replace `YOUR-USERNAME` with your GitHub username.

### Step 3: Add Upstream Remote

This allows you to sync your fork with the original repository:

```bash
git remote add upstream https://github.com/ORIGINAL-OWNER/myconsole.git
```

Verify the remotes:

```bash
git remote -v
# origin    https://github.com/YOUR-USERNAME/myconsole.git (fetch)
# origin    https://github.com/YOUR-USERNAME/myconsole.git (push)
# upstream  https://github.com/ORIGINAL-OWNER/myconsole.git (fetch)
# upstream  https://github.com/ORIGINAL-OWNER/myconsole.git (push)
```

### Step 4: Install Backend Dependencies

```bash
cd console-backend
npm install
```

#### Troubleshooting Backend Installation

| Issue | Solution |
|-------|----------|
| `node-gyp` errors | Install build tools: `npm install -g windows-build-tools` (Windows) or `xcode-select --install` (macOS) |
| `Python not found` | Install Python 3.x from [python.org](https://www.python.org/downloads/) |
| `npm ERR! code ENOENT` | Make sure you're in the `console-backend` directory |
| Permission errors | On Linux/macOS, try `sudo npm install` or fix npm permissions |
| `node: --experimental-vm-modules` warning | This is expected — Jest uses it for ES module support |

### Step 5: Install Frontend Dependencies

```bash
cd ../console-frontend
npm install
```

> **Note**: The frontend uses Vite + React. If you get dependency conflicts, try `npm install --legacy-peer-deps`.

### Step 6: Set Up Environment Variables

```bash
# Backend
cd ../console-backend
cp .env.example .env

# Frontend
cd ../console-frontend
cp .env.example .env
```

Edit both `.env` files with your configuration. See the [Environment Variables Guide](#environment-variables-guide) for detailed explanations.

### Step 7: Start Development Servers

Open **two terminal windows**:

```bash
# Terminal 1 — Backend (http://localhost:5000)
cd console-backend
npm run dev

# Terminal 2 — Frontend (http://localhost:5173)
cd console-frontend
npm run dev
```

The frontend should automatically open in your browser. If not, visit `http://localhost:5173`.

## Environment Variables Guide

### Backend (`console-backend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGO_URI` | ✅ | — | MongoDB connection string. For local: `mongodb://localhost:27017/console`. For Atlas, see [MongoDB Atlas Setup](#mongodb-atlas-setup-guide). |
| `JWT_SECRET` | ✅ | — | Random string at least 32 characters long used to sign JWT tokens. Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `GOOGLE_CLIENT_ID` | ✅ | — | Your Google OAuth Client ID (ends with `.apps.googleusercontent.com`). See [Google OAuth Guide](#google-oauth-credentials-guide). |
| `ADMIN_EMAIL` | ✅ | `admin@example.com` | Email address that gets admin privileges on registration. |
| `ADMIN_PASSWORD` | ✅ | — | Password for the admin account. Use a strong password. |
| `PORT` | ❌ | `5000` | Port the backend server runs on. Change if port 5000 is in use. |
| `NODE_ENV` | ❌ | `development` | `development` or `production`. Controls error messages, CORS, and other behaviors. |
| `FRONTEND_URL` | ✅ | `http://localhost:5173` | The URL of your frontend (for CORS). In production, set to your deployed frontend URL. |
| `BACKEND_URL` | ❌ | `http://localhost:5000` | The public URL of your backend (used for keep-alive pings on free hosting). |

#### Full Example Backend `.env`

```bash
# MongoDB
MONGO_URI=mongodb+srv://myuser:mypassword@cluster0.abcde.mongodb.net/console

# JWT Authentication
JWT_SECRET=my-super-secure-random-jwt-secret-key-32chars+

# Google OAuth
GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=MySecureAdminPass123!

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Keep Alive (for Render/free tier hosting)
BACKEND_URL=http://localhost:5000
```

### Frontend (`console-frontend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | ✅ | `http://localhost:5000/api` | Backend API base URL. Must match your backend's URL + `/api`. |
| `VITE_ADMIN_API_URL` | ✅ | `http://localhost:5000/api/admin` | Backend admin API base URL. |
| `VITE_GOOGLE_CLIENT_ID` | ✅ | — | Same Google OAuth Client ID as the backend. Must match exactly. |

#### Full Example Frontend `.env`

```bash
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_API_URL=http://localhost:5000/api/admin
VITE_GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
```

> ⚠️ **Important**: The `GOOGLE_CLIENT_ID` in both `.env` files must be identical.

## MongoDB Atlas Setup Guide

Follow these steps to set up a free cloud MongoDB database.

### Step 1: Create a MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up using your email (or Google/GitHub account)
3. Verify your email address

📺 **Video Guide**: [How to Create MongoDB Atlas Account](https://www.youtube.com/watch?v=rPqRyYJmx2g)

### Step 2: Create a Cluster

1. After logging in, click **"Create Cluster"** or **"Build a Database"**
2. Select the **FREE (M0)** shared cluster tier
3. Choose a cloud provider (AWS, GCP, or Azure) — any works
4. Select a region closest to you (e.g., `Mumbai` for Asia, `Virginia` for US East)
5. Click **"Create Cluster"** (takes 1-3 minutes to provision)

![Create free cluster](https://www.mongodb.com/docs/atlas/images/atlas-create-cluster.png)

### Step 3: Create a Database User

1. In the left sidebar, go to **"Database Access"** under Security
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method
4. Enter a **username** and **password** (save these — you'll need them)
5. Set **"Database User Privileges"** to **"Read and write to any database"**
6. Click **"Add User"**

### Step 4: Configure Network Access

1. In the left sidebar, go to **"Network Access"** under Security
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
4. Click **"Confirm"**
5. For production, add only your server's IP address instead

> ⚠️ **Security Note**: Allowing access from anywhere is fine for development, but restrict to specific IPs in production.

### Step 5: Get Connection String

1. Click **"Clusters"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Click **"Connect your application"**
4. Copy the connection string — it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/console
   ```
5. Replace `<username>` and `<password>` with the database user credentials from Step 3
6. Paste this string into your backend `.env` as `MONGO_URI`

## Google OAuth Credentials Guide

Console uses Google Sign-In for authentication. You need to create OAuth credentials.

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top and select **"New Project"**
3. Enter a name (e.g., "Console Campus App") and click **"Create"**
4. Select your new project from the project dropdown

📺 **Video Guide**: [Google OAuth Setup Tutorial](https://www.youtube.com/watch?v=HtJKUQX9Xo4)

### Step 2: Configure OAuth Consent Screen

1. In the left sidebar, go to **"APIs & Services"** → **"OAuth consent screen"**
2. Select **"External"** user type (unless you're in a Google Workspace)
3. Fill in the required fields:
   - **App name**: "Console Campus Tech Community"
   - **User support email**: Your email
   - **Developer contact information**: Your email
4. Click **"Save and Continue"**
5. On Scopes page, click **"Add or Remove Scopes"** and add:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
6. Click **"Save and Continue"**
7. On Test users page, you can add your email for testing
8. Click **"Save and Continue"**, then **"Back to Dashboard"**

> **Note**: While in testing mode, only added test users can sign in. When ready for production, click **"Publish App"** to make it available to everyone.

### Step 3: Create OAuth 2.0 Credentials

1. In the left sidebar, go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. Select **"Web application"** as the application type
4. Set a name (e.g., "Console Web Client")

### Step 4: Add Authorized JavaScript Origins

Under **"Authorized JavaScript origins"**, click **"Add URI"** and add:

| Environment | URI |
|-------------|-----|
| Development | `http://localhost:5173` |
| Production | `https://your-netlify-app.netlify.app` |

### Step 5: Add Authorized Redirect URIs

Under **"Authorized redirect URIs"**, click **"Add URI"** and add:

| Environment | URI |
|-------------|-----|
| Development | `http://localhost:5173` |
| Production | `https://your-netlify-app.netlify.app` |

> Note: The redirect URI is handled by the frontend (Vite dev server or Netlify), not the backend.

### Step 6: Copy Client ID

1. After creating, you'll see a popup with your **Client ID** and **Client Secret**
2. Copy the **Client ID** (ends with `.apps.googleusercontent.com`)
3. Add it to both:
   - `console-backend/.env` → `GOOGLE_CLIENT_ID`
   - `console-frontend/.env` → `VITE_GOOGLE_CLIENT_ID`

> ⚠️ **Important**: Both values must be identical. The backend verifies the token, and the frontend requests it.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

When creating a bug report, include:
- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version)
- **Error messages** or console logs

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:
- **Clear title and description**
- **Use case** — why is this enhancement useful?
- **Proposed solution** — how should it work?
- **Alternatives considered**
- **Mockups or examples** if applicable

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` — Simple issues for beginners
- `help wanted` — Issues that need attention
- `bug` — Bug fixes needed
- `enhancement` — New features to implement

## Development Workflow

### Branch Naming Convention

- `feature/` — New features (e.g., `feature/user-profile`)
- `fix/` — Bug fixes (e.g., `fix/login-error`)
- `docs/` — Documentation updates (e.g., `docs/api-guide`)
- `refactor/` — Code refactoring (e.g., `refactor/auth-logic`)
- `test/` — Test additions/updates (e.g., `test/user-controller`)
- `chore/` — Maintenance tasks (e.g., `chore/update-dependencies`)

### Running Tests

```bash
# Frontend build test
cd console-frontend
npm run build

# Backend tests
cd console-backend
npm test

# Lint checks
npm run lint      # Frontend
npm run lint      # Backend (from console-backend)
```

### Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Switch to your local dev branch
git checkout dev

# Merge upstream changes into your dev branch
git merge upstream/dev

# Push to your fork
git push origin dev
```

Alternatively, use rebase for a cleaner history:

```bash
git fetch upstream
git checkout dev
git rebase upstream/dev
git push origin dev --force-with-lease
```

> ⚠️ Use `--force-with-lease` carefully — only if you're the only one working on your fork's dev branch.

## Contribution Workflow

This project follows a **production-safe branching model**.

### Branch Structure

- **`main`** — Production branch
  - Deployed to Netlify
  - Protected — no direct pushes allowed
  - Only accepts PRs from `dev`
  - Requires CI passing + 1 approval

- **`dev`** — Development branch (DEFAULT)
  - Active development happens here
  - All contributor PRs target this branch
  - Protected — requires CI to pass
  - Merges to `main` trigger production deployment

### Workflow Rules

1. ✅ **Fork the repository** — External contributors work from forks
2. ✅ **Create feature branches from `dev`** — Always branch from `dev`
3. ✅ **Open PRs to `dev`** — All PRs must target `dev`
4. ❌ **Never PR directly to `main`** — Will be rejected
5. ✅ **CI must pass** — Builds must succeed before merge
6. ✅ **Get approval** — At least 1 maintainer must approve

### Deployment Flow

```
feature/branch → dev (via PR) → main (via PR) → Netlify Production
```

Only maintainers can merge `dev` → `main` for production releases.

### Step-by-Step PR Process

1. **Create a feature branch from `dev`**
   ```bash
   git checkout dev
   git pull upstream dev
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the style guidelines
   - Update documentation as needed

3. **Test your changes**
   ```bash
   cd console-frontend
   npm run build
   ```

4. **Commit your changes** (see [Commit Messages](#commit-messages))
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - **IMPORTANT: Set base branch to `dev`** (not `main`)
   - Select your feature branch as compare
   - Fill in the PR template
   - Wait for CI checks to pass
   - Request review from maintainers

### Common Git Commands Cheat Sheet

| Command | Description |
|---------|-------------|
| `git status` | Check current branch and modified files |
| `git log --oneline` | View commit history (compact) |
| `git diff` | View unstaged changes |
| `git branch -a` | List all branches |
| `git stash` | Temporarily save uncommitted changes |
| `git stash pop` | Restore stashed changes |
| `git cherry-pick <hash>` | Apply a specific commit to current branch |
| `git reset HEAD~1` | Undo last commit (keep changes) |
| `git rebase -i HEAD~3` | Squash/reword last 3 commits |

## Style Guidelines

### JavaScript/React Style Guide

- Use **ES6+ syntax** (arrow functions, destructuring, etc.)
- Use **functional components** with hooks in React
- Use **meaningful variable names**
- Keep functions **small and focused**
- Use **async/await** instead of promises when possible

#### Example:

```javascript
const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
```

### CSS/Tailwind Style Guide

- Use **TailwindCSS utility classes** when possible
- Keep custom CSS in component-specific files
- Follow **mobile-first** responsive design
- Use `#FF3C5F` (coral red) and `#FFC22D` (amber gold) as brand accent colors

### Backend Style Guide

- Use **async/await** for asynchronous operations
- Implement **proper error handling**
- Use **middleware** for common operations
- Keep **routes thin**, logic in controllers
- Add **input validation** for all endpoints
- Use **meaningful HTTP status codes**

#### Example:

```javascript
router.post('/users', validateUser, async (req, res) => {
  try {
    const user = await userController.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
```

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(auth): add Google OAuth login
fix(leaderboard): resolve ranking calculation bug
docs(readme): update installation instructions
refactor(api): simplify error handling middleware
test(user): add unit tests for user controller
chore(deps): update dependencies to latest versions
```

### Best Practices

- Use **present tense** ("add feature" not "added feature")
- Use **imperative mood** ("move cursor to..." not "moves cursor to...")
- Keep the **first line under 72 characters**
- Reference **issues and PRs** in the footer

## Pull Request Process

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Self-review of your code completed
- [ ] Documentation updated (if needed)
- [ ] No new warnings or errors
- [ ] All tests passing
- [ ] Branch is up to date with `dev`

### PR Template

When creating a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] All tests pass
```

### Review Process

1. **Automated checks** will run on your PR
2. **Maintainers will review** your code
3. **Address feedback** if requested
4. **Approval** from at least one maintainer required
5. **Merge** by maintainers

### After Your PR is Merged

- Delete your feature branch
- Update your local repository
- Celebrate! 🎉

## Common Errors & Solutions

### 1. MongoDB Connection Refused

**Error**: `MongooseServerSelectionError: connection refused` or `Authentication failed`

**Solutions**:
- If using Atlas: Check that your IP is whitelisted in **Network Access** (see [Step 4 of Atlas Setup](#step-4-configure-network-access))
- Verify `MONGO_URI` in `.env` is correct (especially username/password)
- Make sure password doesn't contain special characters — if it does, [URL-encode](https://www.mongodb.com/docs/atlas/faq/connection/#special-characters-in-connection-string-password) them
- If using local MongoDB: Ensure MongoDB service is running (`mongod`)

### 2. Google Token Verification Failed

**Error**: `Google token verification failed` or `Invalid IdP response`

**Solutions**:
- Ensure `GOOGLE_CLIENT_ID` is identical in **both** `console-backend/.env` and `console-frontend/.env`
- Check that `http://localhost:5173` is added to **Authorized JavaScript origins** in Google Cloud Console
- Make sure you're not using an Incognito/Private window that blocks third-party cookies
- Try clearing browser cookies and logging in again

### 3. CORS Error

**Error**: `Cross-Origin-Request-Blocked` in browser console

**Solutions**:
- Check that `FRONTEND_URL` in `console-backend/.env` matches your frontend URL exactly
- For development: `FRONTEND_URL=http://localhost:5173`
- Make sure there's no trailing slash in the URL
- If using a custom port, update accordingly

### 4. Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solutions**:
```bash
# Find what's using the port (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Find what's using the port (macOS/Linux)
lsof -i :5000
kill -9 <PID>

# Or change the port in .env:
PORT=5001
```

### 5. Node Version Mismatch

**Error**: `SyntaxError: Unexpected token '??='` or similar

**Solution**: Console requires Node.js v18+. Check and upgrade:

```bash
node -v
# If below v18:
# Using nvm:
nvm install 18
nvm use 18
```

### 6. npm ERR! code ENOENT

**Error**: `npm ERR! code ENOENT` or `npm ERR! syscall open`

**Solution**: Make sure you're running `npm install` from the correct directory:

```bash
# Backend install
cd console-backend
npm install

# NOT from root or console-frontend
```

### 7. Frontend Build Fails

**Error**: Build errors after `npm run build`

**Solutions**:
- Clear Vite cache: `rm -rf node_modules/.vite` (or `./node_modules/.vite` on Windows)
- Delete and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Try `npm install --legacy-peer-deps` if there are dependency conflicts

---

## Questions?

If you have questions, feel free to:
- Open an issue with the `question` label
- Reach out to the maintainers
- Join our community discussions

---

Thank you for contributing to Console! 🚀
