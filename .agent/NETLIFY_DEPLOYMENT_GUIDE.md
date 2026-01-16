# 🚀 Netlify Deployment Guide

## Overview
This guide will help you deploy the CONSOLE Campus Tech Community Platform frontend to Netlify.

## Prerequisites
- GitHub repository connected to Netlify
- Backend deployed separately (Render, Railway, etc.)
- Environment variables configured

---

## 📝 Netlify Configuration

### Build Settings

| Setting | Value |
|---------|-------|
| **Branch to deploy** | `main` |
| **Base directory** | `console-frontend` |
| **Build command** | `npm run build` |
| **Publish directory** | `console-frontend/dist` |
| **Functions directory** | _(leave empty)_ |

### Step-by-Step Instructions

1. **Connect Your Repository**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and authorize Netlify
   - Select your repository

2. **Configure Build Settings**
   - Fill in the settings as shown in the table above
   - **IMPORTANT:** Set base directory to `console-frontend`
   - Set publish directory to `console-frontend/dist`

3. **Environment Variables**
   Add these environment variables in Netlify:
   
   Go to: **Site settings → Environment variables → Add a variable**

   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

   > ⚠️ **Important:** Replace with your actual backend URL and Google Client ID

4. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete (usually 2-5 minutes)

---

## 🔧 Alternative: Using netlify.toml

For better control, create a `netlify.toml` file in your project root:

```toml
[build]
  base = "console-frontend"
  command = "npm run build"
  publish = "console-frontend/dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures:
- Correct build directory
- Node.js version 18
- SPA routing works correctly (all routes redirect to index.html)

---

## 🌐 Backend Deployment

Your backend (`console-backend`) should be deployed separately:

### Recommended Platforms:
1. **Render** (Free tier available)
   - Best for Node.js backends
   - Easy MongoDB integration
   - Free SSL

2. **Railway** (Free tier available)
   - Simple deployment
   - Good for full-stack apps

3. **Heroku** (Paid)
   - Reliable and established
   - Easy scaling

### Backend Configuration Steps:

1. Deploy backend to your chosen platform
2. Note the backend URL (e.g., `https://your-app.onrender.com`)
3. Add this URL to Netlify environment variables as `VITE_API_URL`
4. Update CORS settings in backend to allow your Netlify domain

---

## 🔐 Environment Variables Checklist

Make sure these are set in Netlify:

- [ ] `VITE_API_URL` - Your backend URL
- [ ] `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID
- [ ] Any other API keys your frontend uses

---

## 🐛 Common Issues & Solutions

### Issue 1: Build Fails
**Error:** `Cannot find module 'vite'`

**Solution:** 
- Ensure `base` directory is set to `console-frontend`
- Check that `package.json` exists in `console-frontend`

### Issue 2: 404 on Page Refresh
**Error:** Page not found when refreshing on routes like `/dashboard`

**Solution:** 
- Add `netlify.toml` with redirects (see above)
- Or add `_redirects` file in `public` folder:
  ```
  /*    /index.html   200
  ```

### Issue 3: API Calls Failing
**Error:** `Network Error` or `CORS Error`

**Solution:**
- Verify `VITE_API_URL` is set correctly in Netlify
- Check backend CORS settings allow your Netlify domain
- Ensure backend is running and accessible

### Issue 4: Environment Variables Not Working
**Error:** `undefined` when accessing `import.meta.env.VITE_API_URL`

**Solution:**
- Environment variables must start with `VITE_` prefix
- Redeploy after adding environment variables
- Check they're set in Netlify dashboard

---

## ✅ Post-Deployment Checklist

After deployment:

- [ ] Test login functionality
- [ ] Verify API calls work
- [ ] Check all routes load correctly
- [ ] Test on mobile devices
- [ ] Verify Google OAuth works
- [ ] Check console for errors
- [ ] Test attendance marking
- [ ] Verify admin dashboard access

---

## 🔄 Continuous Deployment

Netlify automatically deploys when you push to your main branch:

1. Make changes locally
2. Commit and push to GitHub
3. Netlify automatically builds and deploys
4. Check deploy status in Netlify dashboard

---

## 📊 Monitoring

### Build Logs
- View in Netlify dashboard → Deploys → Click on a deploy
- Check for errors or warnings

### Analytics
- Enable Netlify Analytics for traffic insights
- Monitor performance and errors

---

## 🎯 Custom Domain (Optional)

To add a custom domain:

1. Go to **Site settings → Domain management**
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)
5. Netlify provides free SSL automatically

---

## 📞 Support

If you encounter issues:

1. Check Netlify build logs
2. Review browser console for errors
3. Verify environment variables
4. Check backend is running
5. Review CORS settings

---

## 🔗 Useful Links

- [Netlify Documentation](https://docs.netlify.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)

---

**Last Updated:** January 2026
