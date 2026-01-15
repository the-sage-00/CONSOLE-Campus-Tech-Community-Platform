# ✅ Production-Ready Repository Checklist

Use this checklist to verify your repository is fully configured.

---

## 📁 Phase 1: Files Created (Automated - DONE ✅)

- [x] `SECURITY.md` - Vulnerability reporting
- [x] `.env.example` - Environment template
- [x] `.github/pull_request_template.md` - PR template
- [x] `.github/ISSUE_TEMPLATE/bug_report.md` - Bug report template
- [x] `.github/ISSUE_TEMPLATE/feature_request.md` - Feature request template
- [x] `.github/ISSUE_TEMPLATE/question.md` - Question template
- [x] `.github/workflows/ci.yml` - CI build checks (updated)
- [x] `CONTRIBUTING.md` - Updated with dev workflow
- [x] `.gitignore` - Already ignoring .env files
- [x] `.agent/SETUP_GUIDE.md` - GitHub setup instructions
- [x] `.agent/IMPLEMENTATION_SUMMARY.md` - Implementation summary
- [x] `.agent/create-dev-branch.ps1` - Branch creation script

---

## 🌿 Phase 2: Git Branch Setup (MANUAL - TODO)

### Create dev Branch

**Option A: Use PowerShell Script**
```powershell
cd c:\Users\saini\Downloads\myconsole
.\.agent\create-dev-branch.ps1
```

**Option B: Manual Commands**
```bash
git checkout main
git pull origin main
git checkout -b dev
git push -u origin dev
```

**Verification:**
- [ ] `dev` branch exists locally
- [ ] `dev` branch pushed to GitHub
- [ ] Can see `dev` branch on GitHub repository

---

## ⚙️ Phase 3: GitHub Settings (MANUAL - TODO)

### 3.1 Set Default Branch

1. Go to: `Settings` → `Branches`
2. Under "Default branch", click switch icon
3. Select `dev`
4. Click `Update` and confirm

**Verification:**
- [ ] Default branch is now `dev`
- [ ] New PRs default to `dev` as base

### 3.2 Protect main Branch

1. Go to: `Settings` → `Branches` → `Add rule`
2. Branch name pattern: `main`
3. Configure:
   - [x] Require a pull request before merging
     - [x] Require approvals: 1
     - [x] Dismiss stale approvals
   - [x] Require status checks to pass
     - [x] Require branches to be up to date
     - Add: `build-frontend`, `build-backend`
   - [x] Require conversation resolution
   - [x] Do not allow bypassing
   - [ ] Allow force pushes: NO
   - [ ] Allow deletions: NO
4. Click `Create`

**Verification:**
- [ ] `main` branch shows as "Protected"
- [ ] Cannot push directly to `main`
- [ ] PRs to `main` require approval + CI

### 3.3 Protect dev Branch

1. Go to: `Settings` → `Branches` → `Add rule`
2. Branch name pattern: `dev`
3. Configure:
   - [x] Require a pull request before merging
     - [x] Require approvals: 1
   - [x] Require status checks to pass
     - Add: `build-frontend`, `build-backend`
   - [ ] Allow force pushes: NO
   - [ ] Allow deletions: NO
4. Click `Create`

**Verification:**
- [ ] `dev` branch shows as "Protected"
- [ ] PRs to `dev` require CI to pass

### 3.4 Configure Merge Settings

1. Go to: `Settings` → `General` → `Pull Requests`
2. Configure:
   - [x] Allow merge commits
   - [ ] Allow squash merging (optional)
   - [ ] Allow rebase merging (optional)
   - [x] Automatically delete head branches
3. Click `Save`

**Verification:**
- [ ] Merge button settings saved
- [ ] Auto-delete head branches enabled

### 3.5 Add Repository Details

1. Click ⚙️ gear icon next to "About"
2. Fill in:
   - Description: "Modern campus tech community platform with leaderboards, contests, and learning resources"
   - Website: (add Netlify URL later)
   - Topics: `react`, `nodejs`, `mongodb`, `attendance-system`, `campus-management`
3. Click `Save`

**Verification:**
- [ ] Description visible on repo page
- [ ] Topics/tags added

### 3.6 Enable Features

1. Go to: `Settings` → `General` → `Features`
2. Enable:
   - [x] Issues
   - [x] Projects (optional)
   - [x] Discussions (optional)
3. Click `Save`

**Verification:**
- [ ] Issues tab visible
- [ ] Can create new issues

---

## 🧪 Phase 4: Test CI Workflow (MANUAL - TODO)

### Create Test PR

```bash
git checkout dev
git checkout -b test/ci-verification
echo "\n<!-- CI Test $(date) -->" >> README.md
git add README.md
git commit -m "test: verify CI workflow"
git push origin test/ci-verification
```

### On GitHub:
1. Go to `Pull requests` → `New pull request`
2. Verify base is `dev` (should be automatic)
3. Select `test/ci-verification` as compare
4. Create pull request
5. Wait for CI to run

**Verification:**
- [ ] CI workflow triggered automatically
- [ ] `build-frontend` job runs and passes
- [ ] `build-backend` job runs and passes
- [ ] PR shows green checkmark when CI passes
- [ ] Cannot merge until CI passes (if protection enabled)

### Cleanup:
- [ ] Close or merge test PR
- [ ] Delete `test/ci-verification` branch

---

## 👥 Phase 5: Team Onboarding (MANUAL - TODO)

### Notify Team

Send message to team:

```
📢 Important: New Git Workflow

We've upgraded to a production-safe workflow:

✅ All PRs must now target `dev` branch (NOT `main`)
✅ CI checks must pass before merging
✅ At least 1 approval required
✅ `main` branch is protected (production only)

📖 Read CONTRIBUTING.md for full details
🔗 [Link to CONTRIBUTING.md]

Questions? Ask in [your communication channel]
```

**Verification:**
- [ ] Team notified
- [ ] Team understands new workflow
- [ ] CONTRIBUTING.md shared with team

---

## 🚀 Phase 6: Deployment Preparation (FUTURE)

### When Ready to Deploy:

1. **Set up Netlify**
   - [ ] Create Netlify account
   - [ ] Connect to GitHub repository
   - [ ] Set build branch to `main`
   - [ ] Configure build settings
   - [ ] Add environment variables

2. **First Production Deploy**
   - [ ] Merge `dev` → `main` (via PR)
   - [ ] Verify Netlify deployment
   - [ ] Test production site
   - [ ] Update README with live URL

---

## ✅ Final Verification

### Repository Structure
```bash
# Run this to verify all files exist
ls -la .github/ISSUE_TEMPLATE/
ls -la .github/workflows/
ls -la .agent/
```

**Expected files:**
- [ ] `.github/ISSUE_TEMPLATE/bug_report.md`
- [ ] `.github/ISSUE_TEMPLATE/feature_request.md`
- [ ] `.github/ISSUE_TEMPLATE/question.md`
- [ ] `.github/pull_request_template.md`
- [ ] `.github/workflows/ci.yml`
- [ ] `.agent/SETUP_GUIDE.md`
- [ ] `.agent/IMPLEMENTATION_SUMMARY.md`
- [ ] `.agent/create-dev-branch.ps1`
- [ ] `SECURITY.md`
- [ ] `.env.example`
- [ ] `CONTRIBUTING.md` (updated)

### Git Branches
```bash
git branch -a
```

**Expected branches:**
- [ ] `main` (local)
- [ ] `dev` (local)
- [ ] `origin/main` (remote)
- [ ] `origin/dev` (remote)

### GitHub Settings

- [ ] Default branch is `dev`
- [ ] `main` is protected (requires PR + approval + CI)
- [ ] `dev` is protected (requires PR + CI)
- [ ] Issues enabled
- [ ] Repository description added
- [ ] Topics/tags added

### CI/CD

- [ ] CI workflow file exists
- [ ] CI triggers on PRs to `dev` and `main`
- [ ] CI builds frontend successfully
- [ ] CI checks backend successfully
- [ ] Test PR verified CI works

---

## 🎯 Success Criteria

Your repository is **production-ready** when ALL of these are true:

✅ **Git Workflow**
- [ ] `dev` branch exists and is default
- [ ] `main` branch is protected
- [ ] Cannot push directly to `main`
- [ ] All PRs target `dev` by default

✅ **CI/CD**
- [ ] CI runs on every PR
- [ ] Broken builds block merges
- [ ] Test PR successfully ran CI

✅ **Documentation**
- [ ] CONTRIBUTING.md explains dev workflow
- [ ] Issue templates guide contributors
- [ ] PR template enforces dev branch
- [ ] SECURITY.md exists

✅ **Team**
- [ ] Team notified of new workflow
- [ ] Team understands fork/PR process
- [ ] Collaborators added (if needed)

✅ **Safety**
- [ ] ~500 users protected from broken code
- [ ] Production deploys require review
- [ ] CI validates all changes

---

## 📊 Progress Tracker

| Phase | Status | Time Estimate |
|-------|--------|---------------|
| 1. Files Created | ✅ DONE | - |
| 2. Git Branch Setup | ⏳ TODO | 5 min |
| 3. GitHub Settings | ⏳ TODO | 15 min |
| 4. Test CI | ⏳ TODO | 5 min |
| 5. Team Onboarding | ⏳ TODO | 10 min |
| 6. Deployment | 🔮 FUTURE | - |

**Total Time to Complete**: ~35 minutes

---

## 🆘 Troubleshooting

### CI not showing up?
- Wait 30 seconds after creating PR
- Check `Actions` tab for workflow runs
- Verify `.github/workflows/ci.yml` exists

### Can't set dev as default?
- Ensure dev branch is pushed to GitHub
- Refresh GitHub page
- Check you have admin access

### Status checks not required?
- Create a test PR first (CI must run once)
- Then add status checks to branch protection
- Check names match exactly: `build-frontend`, `build-backend`

### Team confused?
- Share CONTRIBUTING.md link
- Do a quick team demo
- Create example PR showing workflow

---

## 📞 Need Help?

- **Setup Guide**: `.agent/SETUP_GUIDE.md`
- **Summary**: `.agent/IMPLEMENTATION_SUMMARY.md`
- **Contributing**: `CONTRIBUTING.md`
- **GitHub Docs**: https://docs.github.com/en/repositories

---

**Last Updated**: 2026-01-15
**Status**: Ready for manual configuration
