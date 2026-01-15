# 🚀 Repository Setup Guide

This guide will help you set up the production-ready Git workflow and GitHub settings.

## ⚠️ Prerequisites

- You must have **admin access** to the GitHub repository
- Local repository must be clean (all changes committed)
- You must be on the current `main` branch

---

## 📋 Step 1: Create and Push `dev` Branch

Run these commands in your local repository:

```bash
# Ensure you're on main and it's up to date
git checkout main
git pull origin main

# Create dev branch from main
git checkout -b dev

# Push dev to remote
git push -u origin dev
```

**Verify**: Check that `dev` branch exists on GitHub

---

## 📋 Step 2: Set `dev` as Default Branch on GitHub

1. Go to your repository on GitHub
2. Click **Settings** (top navigation)
3. Click **Branches** (left sidebar)
4. Under "Default branch", click the switch icon
5. Select **`dev`** from the dropdown
6. Click **Update**
7. Confirm the change

**Why?** This ensures all new PRs default to `dev` instead of `main`

---

## 📋 Step 3: Protect `main` Branch

1. Go to **Settings** → **Branches**
2. Click **Add rule** (or **Add branch protection rule**)
3. In "Branch name pattern", enter: `main`

### Configure these settings:

#### ✅ Pull Request Requirements
- [x] **Require a pull request before merging**
  - [x] Require approvals: **1**
  - [x] Dismiss stale pull request approvals when new commits are pushed
  - [x] Require review from Code Owners (if you add CODEOWNERS file)

#### ✅ Status Checks
- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - Add required status checks (after first CI run):
    - `build-frontend`
    - `build-backend`

#### ✅ Additional Restrictions
- [x] **Require conversation resolution before merging**
- [x] **Require linear history** (optional, prevents merge commits)
- [x] **Do not allow bypassing the above settings**

#### ✅ Push Restrictions
- [x] **Restrict who can push to matching branches**
  - Add only trusted maintainers (if needed)
  
#### ❌ Disable These
- [ ] Allow force pushes: **NO**
- [ ] Allow deletions: **NO**

4. Click **Create** or **Save changes**

---

## 📋 Step 4: Protect `dev` Branch

1. Go to **Settings** → **Branches**
2. Click **Add rule** again
3. In "Branch name pattern", enter: `dev`

### Configure these settings:

#### ✅ Pull Request Requirements
- [x] **Require a pull request before merging**
  - [x] Require approvals: **1**

#### ✅ Status Checks
- [x] **Require status checks to pass before merging**
  - Add required status checks:
    - `build-frontend`
    - `build-backend`

#### ⚠️ Maintainer Bypass (Optional)
- [x] **Allow specified actors to bypass required pull requests**
  - Add maintainers who need quick fix access

#### ❌ Disable These
- [ ] Allow force pushes: **NO**
- [ ] Allow deletions: **NO**

4. Click **Create** or **Save changes**

---

## 📋 Step 5: Configure Merge Settings

1. Go to **Settings** → **General**
2. Scroll to **Pull Requests** section

### Configure:

- [x] **Allow merge commits** (recommended)
- [ ] Allow squash merging (optional - keeps history clean)
- [ ] Allow rebase merging (optional)

- [x] **Automatically delete head branches** (cleanup after merge)

3. Click **Save**

---

## 📋 Step 6: Add Collaborators (Team Members)

1. Go to **Settings** → **Collaborators and teams**
2. Click **Add people** or **Add teams**
3. Search for team members
4. Set their role:
   - **Maintain** - Can manage without admin access
   - **Write** - Can push to repository
   - **Read** - Read-only access

**Note**: External contributors don't need to be added - they contribute via forks

---

## 📋 Step 7: Enable GitHub Features

1. Go to **Settings** → **General**
2. Under **Features**, enable:
   - [x] **Issues** - For bug reports and feature requests
   - [x] **Projects** - For roadmap and task management (optional)
   - [x] **Discussions** - For community Q&A (optional)
   - [ ] **Wiki** - Only if you plan to use it

3. Click **Save**

---

## 📋 Step 8: Add Repository Details

1. Go to repository main page
2. Click the **⚙️ gear icon** next to "About"
3. Fill in:
   - **Description**: Brief project description
   - **Website**: Your Netlify URL (add later when deployed)
   - **Topics**: Add relevant tags
     - `react`
     - `nodejs`
     - `mongodb`
     - `attendance-system`
     - `campus-management`
     - `leaderboard`
     - etc.

4. Click **Save changes**

---

## 📋 Step 9: Test the Workflow

### Create a Test PR

```bash
# On your local machine
git checkout dev
git checkout -b test/ci-check

# Make a small change (e.g., add a comment to README)
echo "\n<!-- CI Test -->" >> README.md

# Commit and push
git add README.md
git commit -m "test: verify CI workflow"
git push origin test/ci-check
```

### On GitHub:
1. Go to **Pull requests** → **New pull request**
2. Verify base branch is `dev` (should be default now)
3. Select `test/ci-check` as compare branch
4. Create pull request
5. **Wait for CI to run** - should see:
   - ✅ build-frontend
   - ✅ build-backend
6. If CI passes, you can merge or close the test PR
7. Delete the test branch

---

## 📋 Step 10: Update README with Badges (Optional)

Add these badges to your README.md:

```markdown
![CI Status](https://github.com/YOUR-USERNAME/YOUR-REPO/workflows/CI%20-%20Build%20Check/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
```

Replace `YOUR-USERNAME` and `YOUR-REPO` with your actual values.

---

## ✅ Verification Checklist

After completing all steps, verify:

- [ ] `dev` branch exists and is set as default
- [ ] `main` branch is protected (requires PR + approval + CI)
- [ ] `dev` branch is protected (requires PR + CI)
- [ ] CI workflow file exists (`.github/workflows/ci.yml`)
- [ ] Issue templates exist (`.github/ISSUE_TEMPLATE/`)
- [ ] PR template exists (`.github/pull_request_template.md`)
- [ ] `.env.example` exists at root
- [ ] `SECURITY.md` exists
- [ ] `CONTRIBUTING.md` mentions `dev` branch workflow
- [ ] Test PR successfully triggered CI
- [ ] Merge button settings configured
- [ ] Repository description and topics added

---

## 🎯 Next Steps

1. **Announce to team**: Let your team know about the new workflow
2. **Update documentation**: Ensure all docs reference the new branch strategy
3. **Plan first release**: Decide when to merge `dev` → `main` for first production deploy
4. **Set up Netlify**: Connect Netlify to `main` branch (when ready)
5. **Monitor contributions**: Watch for first community PRs

---

## 🆘 Troubleshooting

### CI not running?
- Check `.github/workflows/ci.yml` exists
- Verify workflow triggers include `dev` and `main`
- Check GitHub Actions tab for errors

### Can't merge to main?
- Ensure you have required approvals
- Verify CI checks passed
- Check branch protection rules

### Contributors confused about branches?
- Point them to `CONTRIBUTING.md`
- Emphasize in PR template
- Add comment on incorrect PRs

---

## 📞 Need Help?

- Review GitHub's [branch protection documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- Check [GitHub Actions documentation](https://docs.github.com/en/actions)
- Open an issue with the `question` label

---

**Setup Complete!** 🎉

Your repository is now production-ready with industry-standard Git workflow!
