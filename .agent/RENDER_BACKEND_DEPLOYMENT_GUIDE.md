# 🚀 Render Backend Deployment Guide

## Overview
This guide will help you deploy the CONSOLE backend (Node.js + Express + MongoDB) to Render.

---

## 📝 Render Configuration

### Fill in the Render Form:

| Setting | Value |
|---------|-------|
| **Region** | Oregon (US West) or closest to you |
| **Root Directory** | `console-backend` |
| **Build Command** | `yarn` or `npm install` |
| **Start Command** | `yarn start` or `npm start` |
| **Instance Type** | Free (512 MB RAM, 0.1 CPU) |

---

## 🔧 Step-by-Step Instructions

### 1. **Create New Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Select: `CONSOLE-Campus-Tech-Community-Platform`

### 2. **Configure Service Settings**

Fill in the form with these values:

```
Name:                 console-backend
Region:               Oregon (US West)
Branch:               main
Root Directory:       console-backend
Runtime:              Node
Build Command:        yarn
Start Command:        yarn start
Instance Type:        Free
```

### 3. **Add Environment Variables**

Click **"Advanced"** → **"Add Environment Variable"**

Add these **REQUIRED** variables:

```bash
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/console

# Authentication
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Server
PORT=5000
NODE_ENV=production

# Frontend URL (Your Netlify URL)
FRONTEND_URL=https://your-app.netlify.app

# Backend URL (Will be provided by Render after creation)
BACKEND_URL=https://console-backend.onrender.com

# Session
SESSION_SECRET=your_session_secret_key_here

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_admin_password
```

**Optional Variables:**

```bash
# Email Service (if using email features)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password

# Redis (if using caching)
REDIS_URL=redis://localhost:6379

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. **Deploy**
   - Click **"Create Web Service"**
   - Wait for deployment (usually 3-5 minutes)
   - Note your backend URL: `https://console-backend.onrender.com`

---

## 🗄️ MongoDB Setup

You need a MongoDB database. Choose one:

### **Option A: MongoDB Atlas (Recommended - Free)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (Free tier: M0)
4. Create a database user
5. Whitelist IP: `0.0.0.0/0` (allow all - Render uses dynamic IPs)
6. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/console
   ```
7. Add to Render as `MONGO_URI`

### **Option B: Render MongoDB (Paid)**

Render doesn't offer free MongoDB, so Atlas is recommended.

---

## 🔐 Environment Variables Checklist

### ✅ Required Variables:

- [ ] `MONGO_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - Random string (min 32 chars)
- [ ] `GOOGLE_CLIENT_ID` - From Google Cloud Console
- [ ] `PORT` - Set to `5000`
- [ ] `NODE_ENV` - Set to `production`
- [ ] `FRONTEND_URL` - Your Netlify URL
- [ ] `BACKEND_URL` - Your Render backend URL
- [ ] `SESSION_SECRET` - Random string
- [ ] `ADMIN_USERNAME` - Admin username
- [ ] `ADMIN_PASSWORD` - Secure password

### 📧 Optional (Email Features):

- [ ] `EMAIL_SERVICE`
- [ ] `EMAIL_USER`
- [ ] `EMAIL_PASSWORD`

---

## 🔄 Update Frontend with Backend URL

After backend is deployed:

1. **Copy your Render backend URL**
   - Example: `https://console-backend.onrender.com`

2. **Add to Netlify Environment Variables**
   - Go to Netlify: **Site settings → Environment variables**
   - Add/Update: `VITE_API_BASE_URL=https://console-backend.onrender.com`

3. **Update Backend Environment Variable**
   - Go to Render: **Environment → BACKEND_URL**
   - Set to your Render URL

4. **Redeploy Both**
   - Trigger new deploy on Netlify
   - Render will auto-redeploy if you update env vars

---

## 🌐 CORS Configuration

Your backend needs to allow requests from your Netlify frontend.

The backend should already have CORS configured in `server.js`. Verify it includes:

```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
};
app.use(cors(corsOptions));
```

Make sure `FRONTEND_URL` environment variable is set correctly in Render.

---

## ⚠️ Important Notes

### **Free Tier Limitations:**

1. **Sleep Mode**: Free services sleep after 15 minutes of inactivity
   - First request after sleep takes ~30 seconds
   - Consider upgrading to paid tier for production

2. **Build Time**: Free tier has slower build times

3. **Monthly Hours**: 750 hours/month (enough for one service)

### **Keep-Alive Solution:**

Your backend already has a keep-alive mechanism. Ensure it's configured:

```javascript
// In server.js or utils/keepalive.js
setInterval(() => {
  fetch(process.env.BACKEND_URL + '/ping')
}, 14 * 60 * 1000); // Ping every 14 minutes
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Build Fails - "Cannot find module"
**Solution:** 
- Ensure `Root Directory` is set to `console-backend`
- Check `package.json` exists in `console-backend`

### Issue 2: Database Connection Error
**Solution:**
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Ensure database user has correct permissions

### Issue 3: CORS Errors
**Solution:**
- Verify `FRONTEND_URL` matches your Netlify URL exactly
- Include `https://` in the URL
- Check CORS configuration in backend

### Issue 4: Google OAuth Not Working
**Solution:**
- Add Render backend URL to Google Cloud Console:
  - Authorized JavaScript origins: `https://console-backend.onrender.com`
  - Authorized redirect URIs: `https://console-backend.onrender.com/auth/google/callback`

### Issue 5: Service Keeps Sleeping
**Solution:**
- Verify keep-alive code is running
- Consider upgrading to paid tier ($7/month)
- Use external monitoring service (UptimeRobot)

---

## ✅ Post-Deployment Checklist

After deployment:

- [ ] Backend URL is accessible
- [ ] Health check endpoint works (`/ping` or `/health`)
- [ ] Database connection successful
- [ ] Environment variables are set correctly
- [ ] CORS allows frontend requests
- [ ] Google OAuth configured with backend URL
- [ ] Frontend updated with backend URL
- [ ] Test API endpoints
- [ ] Test authentication flow
- [ ] Monitor logs for errors

---

## 📊 Monitoring & Logs

### View Logs:
1. Go to Render dashboard
2. Click on your service
3. Click **"Logs"** tab
4. Monitor real-time logs

### Metrics:
- CPU usage
- Memory usage
- Request count
- Response times

---

## 🔄 Continuous Deployment

Render automatically deploys when you push to your main branch:

1. Make changes to backend code
2. Commit and push to GitHub
3. Render automatically builds and deploys
4. Check deploy status in Render dashboard

---

## 💰 Upgrading to Paid Tier

Benefits of upgrading ($7/month):

- ✅ No sleep mode
- ✅ Faster builds
- ✅ More resources (512 MB → 2 GB RAM)
- ✅ Better performance
- ✅ Custom domains with SSL

---

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Render Status](https://status.render.com/)

---

## 🎯 Complete Deployment Flow

1. ✅ Deploy backend on Render
2. ✅ Setup MongoDB Atlas
3. ✅ Configure environment variables on Render
4. ✅ Note backend URL
5. ✅ Update Netlify with backend URL
6. ✅ Update Google OAuth with backend URL
7. ✅ Test complete flow
8. ✅ Monitor logs

---

**Last Updated:** January 2026
