# 🚀 Quick Render Deployment Reference

## Fill in Render Form:

```
Name:              console-backend
Region:            Oregon (US West)
Branch:            main
Root Directory:    console-backend
Runtime:           Node
Build Command:     yarn
Start Command:     yarn start
Instance Type:     Free
```

## Essential Environment Variables:

```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/console
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-app.netlify.app
BACKEND_URL=https://console-backend.onrender.com
SESSION_SECRET=your_session_secret_key_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_admin_password
```

## After Deployment:

1. ✅ Copy backend URL from Render
2. ✅ Add to Netlify as `VITE_API_BASE_URL`
3. ✅ Update Google OAuth with backend URL
4. ✅ Redeploy Netlify
5. ✅ Test the complete flow

## MongoDB Atlas Setup:

1. Create free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create database user
3. Whitelist IP: `0.0.0.0/0`
4. Copy connection string
5. Add to Render as `MONGO_URI`

---

**⚠️ Important:** Free tier sleeps after 15 min inactivity. First request takes ~30s.
