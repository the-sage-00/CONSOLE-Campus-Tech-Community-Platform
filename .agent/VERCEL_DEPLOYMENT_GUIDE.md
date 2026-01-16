# Vercel Deployment Guide - CONSOLE Frontend

## 🚀 Quick Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"

2. **Import Your Repository**
   - Select your GitHub repository: `CONSOLE-Campus-Tech-Community-Platform`
   - Click "Import"

3. **Configure Project Settings**
   
   **Framework Preset:** Vite
   
   **Root Directory:** `console-frontend`
   
   **Build Command:**
   ```bash
   npm run build
   ```
   
   **Output Directory:**
   ```
   dist
   ```
   
   **Install Command:**
   ```bash
   npm install
   ```

4. **Environment Variables**
   
   Add these in the "Environment Variables" section:
   
   ```
   VITE_API_URL=https://console-campus-tech-community-platform.onrender.com/api
   VITE_GOOGLE_CLIENT_ID=660475179906-h4gklljknhrohik2t7upjkn8iskf9acl.apps.googleusercontent.com
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete

---

## 📝 Important Configuration

### vercel.json (Already Created)

The `vercel.json` file in the root directory handles:
- ✅ SPA routing (fixes 404 on refresh)
- ✅ Correct build directory
- ✅ Asset caching
- ✅ Rewrites for client-side routing

### Why 404 Errors Happen

When you refresh a page like `/profile` or `/leaderboard`:
- ❌ **Without vercel.json:** Vercel looks for `/profile.html` → 404 error
- ✅ **With vercel.json:** Vercel serves `/index.html` → React Router handles the route

---

## 🔧 Troubleshooting

### Issue: 404 on Page Refresh

**Solution:** Make sure `vercel.json` is in the root directory and committed to Git.

```bash
git add vercel.json
git commit -m "Add Vercel configuration for SPA routing"
git push origin main
```

Then redeploy on Vercel.

---

### Issue: Build Fails

**Check:**
1. Root directory is set to `console-frontend`
2. Build command is `npm run build`
3. Output directory is `dist`
4. Node version is 18.x or higher

---

### Issue: Environment Variables Not Working

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Make sure variables start with `VITE_`
3. Redeploy after adding variables

---

## 🌐 Update Google OAuth

After deploying, add your Vercel URL to Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. APIs & Services → Credentials
3. Click your OAuth 2.0 Client ID
4. Add to **Authorized JavaScript origins:**
   ```
   https://your-project.vercel.app
   ```
5. Add to **Authorized redirect URIs:**
   ```
   https://your-project.vercel.app/auth/callback
   https://your-project.vercel.app/auth/google/callback
   ```
6. Click "Save"

---

## 📊 Deployment Checklist

- [ ] `vercel.json` exists in root directory
- [ ] Root directory set to `console-frontend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variables added:
  - [ ] `VITE_API_URL`
  - [ ] `VITE_GOOGLE_CLIENT_ID`
- [ ] Google OAuth updated with Vercel URL
- [ ] Test deployment by refreshing on different routes

---

## 🎯 Expected Result

After proper configuration:
- ✅ Homepage loads correctly
- ✅ All routes work (Profile, Leaderboard, Contest, etc.)
- ✅ Page refresh works on any route (no 404)
- ✅ Google OAuth login works
- ✅ API calls go to Render backend

---

## 🔄 Auto-Deploy

Vercel automatically redeploys when you push to `main` branch:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will detect the push and start a new deployment.

---

## 📱 Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update Google OAuth with new domain

---

## 🆘 Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- Check Vercel build logs for errors
