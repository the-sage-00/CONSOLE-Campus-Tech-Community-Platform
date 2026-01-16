# 🚀 Quick Netlify Deployment Reference

## Fill in Netlify Form:

```
Branch to deploy:     main
Base directory:       console-frontend
Build command:        npm run build
Publish directory:    console-frontend/dist
Functions directory:  (leave empty)
```

## Environment Variables to Add:

```
VITE_API_URL              → Your backend URL (e.g., https://your-app.onrender.com)
VITE_GOOGLE_CLIENT_ID     → Your Google OAuth Client ID
```

## After Deployment:

1. ✅ Add environment variables in Netlify dashboard
2. ✅ Update backend CORS to allow your Netlify domain
3. ✅ Test the deployed site
4. ✅ Check browser console for errors

## Your Files Created:

- ✅ `netlify.toml` - Automatic configuration
- ✅ `console-frontend/public/_redirects` - SPA routing support

---

**Note:** Backend must be deployed separately (Render/Railway recommended)
