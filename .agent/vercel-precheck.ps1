#!/usr/bin/env pwsh
# Vercel Deployment Quick Check Script
# This script verifies your local build works before deploying to Vercel

Write-Host "🔍 VERCEL DEPLOYMENT PRE-CHECK" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "console-frontend")) {
    Write-Host "❌ Error: console-frontend directory not found!" -ForegroundColor Red
    Write-Host "   Please run this script from the project root." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Found console-frontend directory" -ForegroundColor Green

# Check if package.json exists
if (-not (Test-Path "console-frontend/package.json")) {
    Write-Host "❌ Error: package.json not found in console-frontend!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Found package.json" -ForegroundColor Green

# Check if node_modules exists
if (-not (Test-Path "console-frontend/node_modules")) {
    Write-Host "⚠️  node_modules not found. Installing dependencies..." -ForegroundColor Yellow
    Set-Location console-frontend
    npm install
    Set-Location ..
} else {
    Write-Host "✅ Found node_modules" -ForegroundColor Green
}

# Try to build
Write-Host "`n🔨 Building project..." -ForegroundColor Cyan
Set-Location console-frontend
$buildResult = npm run build 2>&1
Set-Location ..

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    Write-Host $buildResult -ForegroundColor Red
    exit 1
}

# Check if dist folder was created
if (-not (Test-Path "console-frontend/dist/index.html")) {
    Write-Host "❌ Error: dist/index.html not found after build!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Found dist/index.html" -ForegroundColor Green

# Check vercel.json
if (-not (Test-Path "console-frontend/vercel.json")) {
    Write-Host "⚠️  Warning: vercel.json not found in console-frontend!" -ForegroundColor Yellow
} else {
    Write-Host "✅ Found vercel.json" -ForegroundColor Green
}

# Summary
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "📊 PRE-CHECK SUMMARY" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host "✅ All local checks passed!" -ForegroundColor Green
Write-Host "`n📋 NEXT STEPS FOR VERCEL:" -ForegroundColor Yellow
Write-Host "1. Go to Vercel Dashboard" -ForegroundColor White
Write-Host "2. Select your project" -ForegroundColor White
Write-Host "3. Go to Settings → General" -ForegroundColor White
Write-Host "4. Set Root Directory to: console-frontend" -ForegroundColor Cyan
Write-Host "5. Verify Build Command: npm run build" -ForegroundColor White
Write-Host "6. Verify Output Directory: dist" -ForegroundColor White
Write-Host "7. Click Save and Redeploy" -ForegroundColor White
Write-Host "`n🚀 Your build works locally!" -ForegroundColor Green
Write-Host "   If Vercel fails, it's a configuration issue." -ForegroundColor Yellow
Write-Host "`n================================`n" -ForegroundColor Cyan
