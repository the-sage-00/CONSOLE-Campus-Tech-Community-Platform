# Quick Start - Create dev Branch

# This script creates the dev branch and pushes it to GitHub
# Run this from the root of your repository

Write-Host "🚀 Creating dev branch for production-ready workflow..." -ForegroundColor Cyan
Write-Host ""

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "❌ Error: Not a git repository" -ForegroundColor Red
    Write-Host "Please run this script from the root of your repository" -ForegroundColor Yellow
    exit 1
}

# Check current branch
$currentBranch = git branch --show-current
Write-Host "📍 Current branch: $currentBranch" -ForegroundColor Yellow

# Ensure we're on main
if ($currentBranch -ne "main") {
    Write-Host "⚠️  Switching to main branch..." -ForegroundColor Yellow
    git checkout main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to checkout main branch" -ForegroundColor Red
        exit 1
    }
}

# Pull latest changes
Write-Host "📥 Pulling latest changes from origin/main..." -ForegroundColor Cyan
git pull origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Warning: Could not pull from origin/main (might be first push)" -ForegroundColor Yellow
}

# Check if dev branch already exists locally
$devExists = git branch --list dev
if ($devExists) {
    Write-Host "⚠️  dev branch already exists locally" -ForegroundColor Yellow
    $response = Read-Host "Do you want to delete and recreate it? (y/N)"
    if ($response -eq "y" -or $response -eq "Y") {
        git branch -D dev
        Write-Host "✅ Deleted existing dev branch" -ForegroundColor Green
    } else {
        Write-Host "❌ Aborted" -ForegroundColor Red
        exit 1
    }
}

# Create dev branch
Write-Host "🌿 Creating dev branch from main..." -ForegroundColor Cyan
git checkout -b dev
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to create dev branch" -ForegroundColor Red
    exit 1
}

Write-Host "✅ dev branch created successfully!" -ForegroundColor Green

# Push to remote
Write-Host "📤 Pushing dev branch to origin..." -ForegroundColor Cyan
git push -u origin dev
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push dev branch to origin" -ForegroundColor Red
    Write-Host "You may need to push manually: git push -u origin dev" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "✅ SUCCESS! dev branch created and pushed to GitHub" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Go to GitHub repository settings" -ForegroundColor White
Write-Host "2. Set 'dev' as the default branch" -ForegroundColor White
Write-Host "3. Configure branch protection rules" -ForegroundColor White
Write-Host "4. Follow .agent/SETUP_GUIDE.md for detailed instructions" -ForegroundColor White
Write-Host ""
Write-Host "📖 Documentation:" -ForegroundColor Cyan
Write-Host "   - Setup Guide: .agent/SETUP_GUIDE.md" -ForegroundColor White
Write-Host "   - Summary: .agent/IMPLEMENTATION_SUMMARY.md" -ForegroundColor White
Write-Host ""
