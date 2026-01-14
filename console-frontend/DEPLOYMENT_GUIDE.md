# Deployment Guide

This guide provides detailed instructions for deploying the Console Tech Community project, with the frontend on Netlify and the backend on Railway.

## Frontend Deployment (Netlify)

### Option 1: Deploy via Netlify UI

1. **Prepare your repository**
   - Make sure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket)
   - Ensure you have the `.env.production` file configured with the correct backend URL

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com/) and sign in
   - Click "New site from Git"
   - Select your Git provider and authorize Netlify
   - Select your repository

3. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Show advanced" and add your environment variables from `.env.production`

4. **Deploy the site**
   - Click "Deploy site"
   - Wait for the build to complete
   - Your site will be available at a Netlify subdomain (e.g., `your-site-name.netlify.app`)

5. **Set up custom domain (optional)**
   - Go to "Domain settings" in your Netlify dashboard
   - Click "Add custom domain"
   - Follow the instructions to configure your domain

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Build your project**
   ```bash
   npm run build
   ```

4. **Deploy to Netlify**
   ```bash
   netlify deploy --prod
   ```
   - When prompted, select the site you want to deploy to
   - Set the publish directory to `dist`

## Backend Deployment (Railway)

1. **Prepare your repository**
   - Make sure your backend code is in a separate repository or directory
   - Ensure you have a `Procfile` or `package.json` with a start script

2. **Create a Railway account**
   - Go to [Railway](https://railway.app/) and sign up/sign in
   - Connect your GitHub account

3. **Create a new project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your backend repository

4. **Configure environment variables**
   - Go to the "Variables" tab in your project
   - Add all the environment variables from your `backend.env.example` file
   - Make sure to update the values for production
   - Set `CORS_ORIGIN` to your Netlify frontend URL

5. **Deploy the backend**
   - Railway will automatically deploy your backend
   - You can view logs in the "Deployments" tab
   - Your backend will be available at a Railway subdomain

6. **Set up MongoDB (if needed)**
   - Click "New" and select "MongoDB"
   - Railway will provision a MongoDB instance
   - Copy the connection string from the "Connect" tab
   - Update your `MONGODB_URI` environment variable

7. **Update frontend configuration**
   - Copy your Railway backend URL
   - Update the `.env.production` file in your frontend project
   - Redeploy your frontend to Netlify

## Troubleshooting

### Frontend Issues

1. **404 errors on page refresh**
   - Make sure you have the `_redirects` file in your `public` directory
   - Check that your `netlify.toml` file is correctly configured

2. **API connection issues**
   - Verify that your environment variables are correctly set in Netlify
   - Check that the backend URL is correct and includes the `/api` path
   - Ensure CORS is properly configured on the backend

### Backend Issues

1. **Deployment failures**
   - Check your Railway logs for error messages
   - Verify that your start script is correctly defined in `package.json`
   - Make sure all required environment variables are set

2. **Database connection issues**
   - Verify your MongoDB connection string
   - Check that your database user has the correct permissions
   - Ensure your IP is whitelisted if using MongoDB Atlas

## Post-Deployment Checklist

- [ ] Frontend successfully deployed to Netlify
- [ ] Backend successfully deployed to Railway
- [ ] Environment variables correctly configured on both platforms
- [ ] Frontend can connect to the backend API
- [ ] User registration and login work correctly
- [ ] All features function as expected in the production environment
- [ ] CORS is properly configured to allow requests from the frontend
- [ ] Error logging is set up for monitoring production issues