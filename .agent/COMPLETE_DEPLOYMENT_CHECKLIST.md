# 🚀 Complete Deployment Checklist

## Overview
This checklist guides you through deploying the complete CONSOLE application:
- **Frontend** → Netlify
- **Backend** → Render
- **Database** → MongoDB Atlas

---

## 📋 Pre-Deployment Setup

### 1. MongoDB Atlas Setup
- [ ] Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Create free cluster (M0)
- [ ] Create database user (username + password)
- [ ] Add IP whitelist: `0.0.0.0/0` (allow all IPs)
- [ ] Get connection string: `mongodb+srv://...`
- [ ] Save connection string securely

### 2. Google OAuth Setup
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Create/select project
- [ ] Enable Google+ API
- [ ] Create OAuth 2.0 credentials
- [ ] Note your `GOOGLE_CLIENT_ID`
- [ ] Add authorized origins (will update after deployment)

### 3. Generate Secrets
- [ ] Generate JWT_SECRET (min 32 characters random string)
- [ ] Generate SESSION_SECRET (random string)
- [ ] Choose secure ADMIN_PASSWORD

---

## 🔧 Backend Deployment (Render)

### Step 1: Create Web Service
- [ ] Go to [Render Dashboard](https://dashboard.render.com/)
- [ ] Click **"New +"** → **"Web Service"**
- [ ] Connect GitHub repository
- [ ] Select: `CONSOLE-Campus-Tech-Community-Platform`

### Step 2: Configure Service
- [ ] **Name:** `console-backend`
- [ ] **Region:** Oregon (US West)
- [ ] **Branch:** `main`
- [ ] **Root Directory:** `console-backend`
- [ ] **Runtime:** Node
- [ ] **Build Command:** `yarn`
- [ ] **Start Command:** `yarn start`
- [ ] **Instance Type:** Free

### Step 3: Add Environment Variables
Click **"Advanced"** → Add these variables:

**Required:**
- [ ] `MONGO_URI` = Your MongoDB Atlas connection string
- [ ] `JWT_SECRET` = Your generated secret (32+ chars)
- [ ] `GOOGLE_CLIENT_ID` = Your Google OAuth client ID
- [ ] `PORT` = `5000`
- [ ] `NODE_ENV` = `production`
- [ ] `FRONTEND_URL` = `https://your-app.netlify.app` (update after Netlify)
- [ ] `BACKEND_URL` = `https://console-backend.onrender.com` (your Render URL)
- [ ] `SESSION_SECRET` = Your generated session secret
- [ ] `ADMIN_USERNAME` = `admin`
- [ ] `ADMIN_PASSWORD` = Your secure password

**Optional (if using email):**
- [ ] `EMAIL_SERVICE` = `gmail`
- [ ] `EMAIL_USER` = Your email
- [ ] `EMAIL_PASSWORD` = App-specific password

### Step 4: Deploy Backend
- [ ] Click **"Create Web Service"**
- [ ] Wait for deployment (3-5 minutes)
- [ ] **Copy backend URL:** `https://console-backend.onrender.com`
- [ ] Test health endpoint: `https://console-backend.onrender.com/ping`

---

## 🌐 Frontend Deployment (Netlify)

### Step 1: Connect Repository
- [ ] Go to [Netlify](https://app.netlify.com/)
- [ ] Click **"Add new site"** → **"Import an existing project"**
- [ ] Choose GitHub
- [ ] Select: `CONSOLE-Campus-Tech-Community-Platform`

### Step 2: Configure Build Settings
- [ ] **Branch to deploy:** `main`
- [ ] **Base directory:** `console-frontend`
- [ ] **Build command:** `npm run build`
- [ ] **Publish directory:** `dist`
- [ ] **Functions directory:** (leave empty)

### Step 3: Deploy Frontend
- [ ] Click **"Deploy site"**
- [ ] Wait for deployment (2-5 minutes)
- [ ] **Copy frontend URL:** `https://your-app.netlify.app`

### Step 4: Add Environment Variables
Go to **Site settings → Environment variables**:

- [ ] `VITE_API_BASE_URL` = Your Render backend URL
- [ ] `VITE_GOOGLE_CLIENT_ID` = Your Google OAuth client ID

### Step 5: Redeploy
- [ ] Click **"Trigger deploy"** → **"Deploy site"**
- [ ] Wait for new deployment with environment variables

---

## 🔄 Post-Deployment Configuration

### 1. Update Backend Environment
Go back to Render and update:
- [ ] `FRONTEND_URL` = Your actual Netlify URL
- [ ] Save changes (Render will auto-redeploy)

### 2. Update Google OAuth
Go to [Google Cloud Console](https://console.cloud.google.com/):

**Authorized JavaScript origins:**
- [ ] Add: `https://your-app.netlify.app`
- [ ] Add: `https://console-backend.onrender.com`

**Authorized redirect URIs:**
- [ ] Add: `https://your-app.netlify.app/auth/callback`
- [ ] Add: `https://console-backend.onrender.com/auth/google/callback`

### 3. Final Redeploy
- [ ] Trigger new deploy on Netlify (if needed)
- [ ] Wait for Render to finish redeploying

---

## ✅ Testing & Verification

### Backend Tests:
- [ ] Visit: `https://console-backend.onrender.com/ping`
- [ ] Should return: `{"status":"ok"}` or similar
- [ ] Check Render logs for errors
- [ ] Verify MongoDB connection in logs

### Frontend Tests:
- [ ] Visit: `https://your-app.netlify.app`
- [ ] Page loads without errors
- [ ] Check browser console (F12) for errors
- [ ] Verify API calls are going to correct backend URL

### Authentication Tests:
- [ ] Click "Login with Google"
- [ ] Google OAuth popup appears
- [ ] Can successfully log in
- [ ] Redirected to dashboard after login
- [ ] User data loads correctly

### Full Flow Tests:
- [ ] Student login works
- [ ] Professor login works
- [ ] Admin login works
- [ ] Attendance marking works
- [ ] Course management works
- [ ] All features functional

---

## 🐛 Troubleshooting

### Backend Issues:

**Build fails:**
- [ ] Check Root Directory is `console-backend`
- [ ] Verify `package.json` exists
- [ ] Check Render build logs

**Database connection fails:**
- [ ] Verify `MONGO_URI` is correct
- [ ] Check MongoDB Atlas IP whitelist
- [ ] Verify database user credentials

**Service sleeps:**
- [ ] Normal for free tier (sleeps after 15 min)
- [ ] First request takes ~30 seconds
- [ ] Consider upgrading to paid tier

### Frontend Issues:

**Build fails:**
- [ ] Check Base Directory is `console-frontend`
- [ ] Verify Publish Directory is `dist`
- [ ] Check `netlify.toml` is committed

**API calls fail:**
- [ ] Verify `VITE_API_BASE_URL` is set correctly
- [ ] Check backend CORS configuration
- [ ] Verify backend is running

**404 on page refresh:**
- [ ] Ensure `netlify.toml` has redirects
- [ ] Check `_redirects` file exists in `public`

### OAuth Issues:

**Google login fails:**
- [ ] Verify `GOOGLE_CLIENT_ID` matches in both frontend and backend
- [ ] Check authorized origins in Google Console
- [ ] Ensure redirect URIs are correct
- [ ] Check browser console for specific errors

---

## 📊 Monitoring

### Render Monitoring:
- [ ] Check **Logs** tab regularly
- [ ] Monitor **Metrics** (CPU, Memory)
- [ ] Set up email alerts for failures

### Netlify Monitoring:
- [ ] Check **Deploy logs** for build issues
- [ ] Monitor **Functions** (if using)
- [ ] Review **Analytics** for traffic

### Database Monitoring:
- [ ] Check MongoDB Atlas metrics
- [ ] Monitor connection count
- [ ] Review slow queries

---

## 🎯 Success Criteria

Your deployment is successful when:

- ✅ Frontend loads at Netlify URL
- ✅ Backend responds at Render URL
- ✅ Database connection established
- ✅ Google OAuth login works
- ✅ All user roles can log in
- ✅ Core features functional
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Performance acceptable

---

## 📝 Important URLs to Save

```
Frontend URL:     https://your-app.netlify.app
Backend URL:      https://console-backend.onrender.com
MongoDB Atlas:    https://cloud.mongodb.com
Render Dashboard: https://dashboard.render.com
Netlify Dashboard: https://app.netlify.com
Google Console:   https://console.cloud.google.com
```

---

## 🔐 Security Checklist

- [ ] All secrets stored in environment variables (not in code)
- [ ] `.env` files in `.gitignore`
- [ ] MongoDB IP whitelist configured
- [ ] CORS properly configured
- [ ] HTTPS enabled (automatic on Netlify/Render)
- [ ] Admin password is strong
- [ ] JWT secret is random and long
- [ ] Rate limiting enabled
- [ ] Helmet.js security headers enabled

---

## 🚀 Optional Enhancements

### Custom Domains:
- [ ] Purchase domain
- [ ] Configure DNS for Netlify
- [ ] Configure DNS for Render
- [ ] Enable SSL (automatic)

### Monitoring Services:
- [ ] Set up UptimeRobot for backend
- [ ] Configure Sentry for error tracking
- [ ] Set up Google Analytics

### Performance:
- [ ] Enable Netlify CDN
- [ ] Configure caching headers
- [ ] Optimize images
- [ ] Enable compression

---

## 💰 Cost Summary

**Free Tier:**
- MongoDB Atlas: Free (M0 cluster)
- Render: Free (with sleep mode)
- Netlify: Free (100 GB bandwidth)
- **Total: $0/month**

**Recommended Paid:**
- Render Starter: $7/month (no sleep)
- MongoDB Atlas M2: $9/month (more storage)
- Netlify Pro: $19/month (more bandwidth)
- **Total: ~$35/month**

---

**Last Updated:** January 2026

**Need Help?** Check the detailed guides:
- `.agent/NETLIFY_DEPLOYMENT_GUIDE.md`
- `.agent/RENDER_BACKEND_DEPLOYMENT_GUIDE.md`
