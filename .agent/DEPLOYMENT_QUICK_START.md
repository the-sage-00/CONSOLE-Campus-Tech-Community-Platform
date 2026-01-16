# 🎯 Deployment Quick Start

## 📊 Architecture Overview

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐      ┌──────────────────┐
│  Netlify        │ ───→ │  Render          │
│  (Frontend)     │      │  (Backend)       │
│  React + Vite   │ ←─── │  Node + Express  │
└─────────────────┘      └────────┬─────────┘
                                  │
                                  ↓
                         ┌─────────────────┐
                         │  MongoDB Atlas  │
                         │  (Database)     │
                         └─────────────────┘
```

---

## 🚀 3-Step Deployment

### Step 1: Deploy Backend (Render)
```
Root Directory:    console-backend
Build Command:     yarn
Start Command:     yarn start
```

**Key Environment Variables:**
- `MONGO_URI` → MongoDB connection string
- `JWT_SECRET` → Random 32+ character string
- `GOOGLE_CLIENT_ID` → From Google Cloud Console
- `FRONTEND_URL` → Your Netlify URL (update after Step 2)

**Result:** `https://console-backend.onrender.com`

---

### Step 2: Deploy Frontend (Netlify)
```
Base Directory:    console-frontend
Build Command:     npm run build
Publish Directory: dist
```

**Key Environment Variables:**
- `VITE_API_BASE_URL` → Your Render backend URL
- `VITE_GOOGLE_CLIENT_ID` → Same as backend

**Result:** `https://your-app.netlify.app`

---

### Step 3: Connect Everything
1. Update Render `FRONTEND_URL` with your Netlify URL
2. Add both URLs to Google OAuth authorized origins
3. Redeploy both services
4. Test login flow

---

## 📁 Files Created for You

✅ `netlify.toml` - Netlify configuration  
✅ `.agent/NETLIFY_DEPLOYMENT_GUIDE.md` - Detailed Netlify guide  
✅ `.agent/RENDER_BACKEND_DEPLOYMENT_GUIDE.md` - Detailed Render guide  
✅ `.agent/COMPLETE_DEPLOYMENT_CHECKLIST.md` - Full checklist  
✅ `.agent/NETLIFY_QUICK_REFERENCE.md` - Quick Netlify reference  
✅ `.agent/RENDER_QUICK_REFERENCE.md` - Quick Render reference  

---

## ⚡ Quick Commands

### Check Git Status
```bash
git status
```

### Commit and Push
```bash
git add .
git commit -m "Deploy configuration"
git push origin main
```

### View Logs (Local)
```bash
# Backend
cd console-backend
npm run dev

# Frontend
cd console-frontend
npm run dev
```

---

## 🔗 Important Links

| Service | Dashboard | Docs |
|---------|-----------|------|
| **Netlify** | [Dashboard](https://app.netlify.com) | [Docs](https://docs.netlify.com) |
| **Render** | [Dashboard](https://dashboard.render.com) | [Docs](https://render.com/docs) |
| **MongoDB** | [Atlas](https://cloud.mongodb.com) | [Docs](https://docs.mongodb.com) |
| **Google OAuth** | [Console](https://console.cloud.google.com) | [Docs](https://developers.google.com/identity) |

---

## ⚠️ Common Gotchas

1. **Netlify build fails** → Check `netlify.toml` is committed to Git
2. **Render build fails** → Ensure Root Directory is `console-backend`
3. **CORS errors** → Verify `FRONTEND_URL` matches Netlify URL exactly
4. **OAuth fails** → Add both URLs to Google Console authorized origins
5. **Backend sleeps** → Free tier sleeps after 15 min (upgrade to paid)

---

## ✅ Success Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Netlify
- [ ] MongoDB Atlas configured
- [ ] Environment variables set on both platforms
- [ ] Google OAuth configured with both URLs
- [ ] Login works
- [ ] All features functional

---

## 🆘 Need Help?

1. Check the detailed guides in `.agent/` folder
2. Review deployment logs on Netlify/Render
3. Check browser console for frontend errors
4. Review Render logs for backend errors

---

**Current Status:** Based on your screenshot, you're ready to fill in the Render form!

**Next Action:** Fill in the Render deployment form with the values from `RENDER_QUICK_REFERENCE.md`
