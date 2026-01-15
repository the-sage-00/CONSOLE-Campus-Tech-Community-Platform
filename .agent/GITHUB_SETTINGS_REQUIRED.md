# ✅ Git Setup Complete - GitHub Settings Required

## 🎉 What's Been Done Automatically

✅ **All files created** (13 files)
✅ **Changes committed** to `main` branch
✅ **`dev` branch created** from `main`
✅ **Both branches pushed** to GitHub
✅ **Repository URL**: https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform

---

## ⚠️ MANUAL STEPS REQUIRED (15 minutes)

The following **must be done on GitHub.com** - they cannot be automated:

---

## 📋 Step 1: Set `dev` as Default Branch (2 min)

1. Go to: https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/settings/branches

2. Under **"Default branch"**, click the ⇄ switch icon

3. Select **`dev`** from dropdown

4. Click **"Update"**

5. Click **"I understand, update the default branch"** to confirm

**Why?** This makes all new PRs default to `dev` instead of `main`

---

## 📋 Step 2: Protect `main` Branch (5 min)

1. Stay on: https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/settings/branches

2. Click **"Add branch protection rule"**

3. In **"Branch name pattern"**, type: `main`

4. Check these boxes:

   ### ✅ Pull Request Settings
   - [x] **Require a pull request before merging**
     - [x] **Require approvals**: Set to **1**
     - [x] **Dismiss stale pull request approvals when new commits are pushed**
   
   ### ✅ Status Checks
   - [x] **Require status checks to pass before merging**
     - [x] **Require branches to be up to date before merging**
     - **Note**: You'll add specific status checks after first CI run (see Step 4)
   
   ### ✅ Additional Settings
   - [x] **Require conversation resolution before merging**
   - [x] **Do not allow bypassing the above settings**
   
   ### ❌ Leave Unchecked
   - [ ] Allow force pushes: **NO**
   - [ ] Allow deletions: **NO**

5. Scroll down and click **"Create"** or **"Save changes"**

**Result**: `main` branch now shows "Protected" badge

---

## 📋 Step 3: Protect `dev` Branch (3 min)

1. Still on: https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/settings/branches

2. Click **"Add branch protection rule"** again

3. In **"Branch name pattern"**, type: `dev`

4. Check these boxes:

   ### ✅ Pull Request Settings
   - [x] **Require a pull request before merging**
     - [x] **Require approvals**: Set to **1**
   
   ### ✅ Status Checks
   - [x] **Require status checks to pass before merging**
     - **Note**: You'll add specific status checks after first CI run (see Step 4)
   
   ### ❌ Leave Unchecked
   - [ ] Allow force pushes: **NO**
   - [ ] Allow deletions: **NO**

5. Click **"Create"** or **"Save changes"**

**Result**: `dev` branch now shows "Protected" badge

---

## 📋 Step 4: Test CI & Add Status Checks (5 min)

### 4a. Create Test PR

Run these commands locally:

```powershell
cd c:\Users\saini\Downloads\myconsole
git checkout dev
git checkout -b test/ci-verification
echo "`n<!-- CI Test $(Get-Date) -->" >> README.md
git add README.md
git commit -m "test: verify CI workflow"
git push origin test/ci-verification
```

### 4b. Open PR on GitHub

1. Go to: https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/pulls

2. Click **"New pull request"**

3. Verify:
   - **base**: `dev` (should be automatic now)
   - **compare**: `test/ci-verification`

4. Click **"Create pull request"**

5. Fill in PR template and create

6. **Wait for CI to run** (30-60 seconds)

7. You should see:
   - ✅ **build-frontend** - passed
   - ✅ **build-backend** - passed

### 4c. Add Status Checks to Branch Protection

**After CI runs successfully:**

1. Go back to: https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/settings/branches

2. Click **"Edit"** on the `main` branch protection rule

3. Scroll to **"Require status checks to pass before merging"**

4. In the search box, type and select:
   - `build-frontend`
   - `build-backend`

5. Click **"Save changes"**

6. Repeat for `dev` branch protection rule

### 4d. Cleanup Test PR

- Close or merge the test PR
- Delete the `test/ci-verification` branch

---

## 📋 Step 5: Configure Merge Settings (2 min)

1. Go to: https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/settings

2. Scroll down to **"Pull Requests"** section

3. Configure:
   - [x] **Allow merge commits** ✅
   - [ ] Allow squash merging (optional)
   - [ ] Allow rebase merging (optional)
   
   - [x] **Automatically delete head branches** ✅

4. Click **"Save"**

---

## 📋 Step 6: Add Repository Details (2 min)

1. Go to: https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform

2. Click the **⚙️ gear icon** next to "About" (top right)

3. Fill in:
   - **Description**: "Modern campus tech community platform with real-time leaderboards, contests, and comprehensive learning resources"
   - **Website**: (leave empty for now, add Netlify URL later)
   - **Topics**: Add these tags:
     - `react`
     - `nodejs`
     - `mongodb`
     - `express`
     - `attendance-system`
     - `campus-management`
     - `leaderboard`
     - `competitive-programming`

4. Check:
   - [x] **Include in the home page**

5. Click **"Save changes"**

---

## 📋 Step 7: Enable GitHub Features (1 min)

1. Go to: https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/settings

2. Under **"Features"**, ensure these are checked:
   - [x] **Issues** ✅
   - [x] **Preserve this repository** (optional)
   - [ ] **Wikis** (optional, only if you'll use it)
   - [ ] **Discussions** (optional, for community Q&A)
   - [ ] **Projects** (optional, for roadmap)

3. Settings save automatically

---

## ✅ Verification Checklist

After completing all steps, verify:

### On GitHub Repository Page:
- [ ] Default branch badge shows **`dev`** (not `main`)
- [ ] Repository has description and topics
- [ ] Issues tab is visible

### On Settings → Branches:
- [ ] Default branch is **`dev`**
- [ ] `main` branch shows **"Protected"** badge
- [ ] `dev` branch shows **"Protected"** badge

### Test PR:
- [ ] CI workflow triggered automatically
- [ ] Both jobs (`build-frontend`, `build-backend`) passed
- [ ] Status checks are required for branch protection

---

## 🎯 What This Achieves

✅ **Production Safety**
- No direct pushes to `main`
- All changes require review
- Broken builds can't be merged

✅ **Clear Workflow**
- Contributors know to target `dev`
- `main` is clearly production-only
- CI validates every change

✅ **Team Collaboration**
- Issue templates guide bug reports
- PR template ensures quality
- Auto-delete keeps repo clean

---

## 📞 Quick Links

- **Repository**: https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform
- **Settings**: https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/settings
- **Branches**: https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/settings/branches
- **Actions**: https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform/actions

---

## 🆘 Troubleshooting

### Can't find "Add branch protection rule"?
- Ensure you have admin access to the repository
- Try refreshing the page

### Status checks not appearing?
- You must create a test PR first (Step 4)
- CI must run at least once
- Check exact names: `build-frontend`, `build-backend`

### Default branch won't change?
- Ensure `dev` branch exists on GitHub (it does!)
- Refresh the page
- Try a different browser

---

## 🎓 Next Steps After Setup

1. **Notify your team** about the new workflow
2. **Share CONTRIBUTING.md** with contributors
3. **Plan your first production release** (merge `dev` → `main`)
4. **Set up Netlify** when ready to deploy

---

## 📊 Time Estimate

- Step 1: Set default branch - **2 min**
- Step 2: Protect main - **5 min**
- Step 3: Protect dev - **3 min**
- Step 4: Test CI - **5 min**
- Step 5: Merge settings - **2 min**
- Step 6: Repository details - **2 min**
- Step 7: Enable features - **1 min**

**Total: ~20 minutes**

---

## ✅ Current Status

✅ Local Git setup complete
✅ Branches created and pushed
✅ All files committed
⏳ GitHub settings pending (manual)

**You're 70% done! Just need to configure GitHub settings now.**

---

**Last Updated**: 2026-01-15
**Repository**: the-sage-00/CONSOLE-Campus-Tech-Community-Platform
