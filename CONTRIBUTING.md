# Contributing to Console

First off, thank you for considering contributing to Console! 🎉

It's people like you that make Console such a great tool for the tech community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- **Be Respectful**: Treat everyone with respect and kindness
- **Be Collaborative**: Work together and help each other
- **Be Professional**: Keep discussions focused and constructive
- **Be Inclusive**: Welcome newcomers and diverse perspectives

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- MongoDB (local or Atlas account)
- Google Cloud Console account (for OAuth)

### Setting Up Your Development Environment

1. **Fork the repository**
   - Click the "Fork" button at the top right of the repository page

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/myconsole.git
   cd myconsole
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/myconsole.git
   ```

4. **Install dependencies**
   ```bash
   # Backend
   cd console-backend
   npm install
   
   # Frontend
   cd ../console-frontend
   npm install
   ```

5. **Set up environment variables**
   ```bash
   # Backend
   cd console-backend
   cp .env.example .env
   # Edit .env with your configuration
   
   # Frontend
   cd ../console-frontend
   cp .env.example .env
   # Edit .env with your configuration
   ```

6. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd console-backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd console-frontend
   npm run dev
   ```

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
- **Use case** - why is this enhancement useful?
- **Proposed solution** - how should it work?
- **Alternatives considered**
- **Mockups or examples** if applicable

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` - Simple issues for beginners
- `help wanted` - Issues that need attention
- `bug` - Bug fixes needed
- `enhancement` - New features to implement

### Pull Requests

⚠️ **CRITICAL: All pull requests MUST target the `dev` branch, NOT `main`**

The `main` branch is reserved for production deployments only. PRs targeting `main` will be automatically rejected.

1. **Create a feature branch from `dev`**
   ```bash
   git checkout dev
   git pull upstream dev
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the style guidelines
   - Add comments for complex logic
   - Update documentation as needed

3. **Test your changes**
   ```bash
   # Frontend build test
   cd console-frontend
   npm run build
   
   # Backend verification
   cd console-backend
   npm install
   ```

4. **Commit your changes**
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


## Git Workflow & Branch Strategy

### Branch Structure

This project follows a **production-safe branching model**:

- **`main`** - Production branch
  - Deployed to Netlify
  - Protected - no direct pushes allowed
  - Only accepts PRs from `dev`
  - Requires CI passing + 1 approval
  
- **`dev`** - Development branch (DEFAULT)
  - Active development happens here
  - All contributor PRs target this branch
  - Protected - requires CI to pass
  - Merges to `main` trigger production deployment

### Workflow Rules

1. ✅ **Fork the repository** - External contributors work from forks
2. ✅ **Create feature branches from `dev`** - Always branch from `dev`
3. ✅ **Open PRs to `dev`** - All PRs must target `dev`
4. ❌ **Never PR directly to `main`** - Will be rejected
5. ✅ **CI must pass** - Builds must succeed before merge
6. ✅ **Get approval** - At least 1 maintainer must approve

### Deployment Flow

```
feature/branch → dev (via PR) → main (via PR) → Netlify Production
```

Only maintainers can merge `dev` → `main` for production releases.

## Development Workflow

### Branch Naming Convention

- `feature/` - New features (e.g., `feature/user-profile`)
- `fix/` - Bug fixes (e.g., `fix/login-error`)
- `docs/` - Documentation updates (e.g., `docs/api-guide`)
- `refactor/` - Code refactoring (e.g., `refactor/auth-logic`)
- `test/` - Test additions/updates (e.g., `test/user-controller`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

### Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream changes into your main branch
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

## Style Guidelines

### JavaScript/React Style Guide

- Use **ES6+ syntax** (arrow functions, destructuring, etc.)
- Use **functional components** with hooks in React
- Use **meaningful variable names**
- Keep functions **small and focused**
- Add **JSDoc comments** for complex functions
- Use **async/await** instead of promises when possible

#### Example:

```javascript
/**
 * Fetches user data from the API
 * @param {string} userId - The user's unique identifier
 * @returns {Promise<Object>} User data object
 */
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
- Use **CSS variables** for theme colors
- Follow **mobile-first** responsive design
- Use **semantic class names** for custom CSS

### Backend Style Guide

- Use **async/await** for asynchronous operations
- Implement **proper error handling**
- Use **middleware** for common operations
- Keep **routes thin**, logic in controllers
- Add **input validation** for all endpoints
- Use **meaningful HTTP status codes**

#### Example:

```javascript
// Good
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
- [ ] Comments added for complex logic
- [ ] Documentation updated (if needed)
- [ ] No new warnings or errors
- [ ] Tests added/updated (if applicable)
- [ ] All tests passing
- [ ] Branch is up to date with main

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
- [ ] I have commented my code
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests
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

## Questions?

If you have questions, feel free to:
- Open an issue with the `question` label
- Reach out to the maintainers
- Join our community discussions

---

Thank you for contributing to Console! 🚀
