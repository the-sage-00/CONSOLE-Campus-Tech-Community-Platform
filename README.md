# 🎯 Console - Tech Community Platform

<div align="center">

![Console Banner](https://img.shields.io/badge/Console-Tech_Community-orange?style=for-the-badge)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

**A modern, full-stack platform for competitive programming enthusiasts featuring real-time leaderboards, contests, and comprehensive tech learning resources.**

[🚀 Live Demo](#) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/yourusername/myconsole/issues) • [✨ Request Feature](https://github.com/yourusername/myconsole/issues)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🎮 Usage](#-usage)
- [🌐 Deployment](#-deployment)
- [🛠️ Tech Stack](#️-tech-stack)
- [📚 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🏆 Core Features
- **📊 Real-time Leaderboards** - Track competitive programming rankings from CodeForces and LeetCode
- **🎯 Contest Management** - Create, manage, and participate in coding contests
- **👤 User Profiles** - Personalized dashboards with performance analytics
- **🔐 Google OAuth** - Secure authentication with institutional email support
- **👨‍💼 Admin Dashboard** - Comprehensive admin panel for user and contest management

### 📚 Learning Resources
- **🗺️ Interactive Roadmaps** - Step-by-step guides for:
  - Web Development
  - Competitive Programming
  - Machine Learning & AI
  - Information Security
  - Web3 & Blockchain
  - C++ & Python Programming
- **📖 Tech Guides** - Curated resources and tutorials
- **💡 Best Practices** - Industry-standard coding practices

### 🎨 User Experience
- **🌓 Dark/Light Mode** - Eye-friendly themes
- **📱 Responsive Design** - Seamless experience across all devices
- **⚡ Fast Performance** - Optimized for speed with caching
- **🎭 Modern UI** - Beautiful gradients and smooth animations

---

## 🏗️ Architecture

```
myconsole/
├── console-backend/          # Node.js + Express API
│   ├── controller/          # Business logic
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API endpoints
│   ├── middleware/          # Auth, security, validation
│   ├── services/            # External API integrations
│   ├── utils/               # Helper functions
│   └── schedulers/          # Cron jobs for contests
│
└── console-frontend/         # React + Vite SPA
    ├── src/
    │   ├── components/      # React components
    │   ├── admin/           # Admin panel
    │   ├── context/         # React context (Auth)
    │   └── utils/           # Frontend utilities
    └── public/              # Static assets
```

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Git**

### Clone the Repository

```bash
git clone https://github.com/yourusername/myconsole.git
cd myconsole
```

### Backend Setup

```bash
cd console-backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup

```bash
cd console-frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

---

## 📦 Installation

### Detailed Backend Installation

1. **Navigate to backend directory**
   ```bash
   cd console-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Set up MongoDB**
   - Create a MongoDB Atlas account or use local MongoDB
   - Get your connection string
   - Update `MONGO_URI` in `.env`

5. **Configure Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs
   - Copy Client ID to `.env`

6. **Start the server**
   ```bash
   npm run dev        # Development mode
   npm start          # Production mode
   ```

### Detailed Frontend Installation

1. **Navigate to frontend directory**
   ```bash
   cd console-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the following in `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_ADMIN_API_URL=http://localhost:5000/api/admin
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Start the development server**
   ```bash
   npm run dev        # Development mode
   npm run build      # Production build
   npm run preview    # Preview production build
   ```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in `console-backend/` with the following:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/console

# Authentication
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Server
PORT=5000
NODE_ENV=development

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_password

# Keep Alive (for free tier hosting)
BACKEND_URL=http://localhost:5000

```

### Frontend Environment Variables

Create a `.env` file in `console-frontend/` with the following:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_API_URL=http://localhost:5000/api/admin

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

---

## 🎮 Usage

### For Students/Users

1. **Sign Up/Login**
   - Use your institutional email with Google OAuth
   - Complete your profile with CodeForces and LeetCode handles

2. **View Leaderboard**
   - Check real-time rankings
   - Filter by year, branch, or platform
   - View detailed analytics

3. **Participate in Contests**
   - Browse upcoming and ongoing contests
   - Submit solutions
   - Track your performance

4. **Explore Resources**
   - Access curated learning roadmaps
   - Follow step-by-step guides
   - Learn from best practices

### For Admins

1. **Login to Admin Panel**
   - Navigate to `/admin/login`
   - Use admin credentials

2. **Manage Users**
   - Approve pending registrations
   - View user analytics
   - Manage user roles

3. **Manage Contests**
   - Create new contests
   - Set contest parameters
   - Monitor participation

4. **View Analytics**
   - Dashboard statistics
   - User engagement metrics
   - System health monitoring

---

## 🌐 Deployment

### Frontend Deployment (Netlify)

1. **Build the project**
   ```bash
   cd console-frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables
   - Deploy!

### Backend Deployment (Render/Railway)

1. **Prepare for deployment**
   - Ensure all environment variables are set
   - Update CORS origins to include your frontend URL

2. **Deploy to Render**
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables
   - Deploy!

3. **Update Frontend**
   - Update `VITE_API_URL` in frontend `.env`
   - Redeploy frontend

📖 **Detailed deployment guide**: See [DEPLOYMENT_GUIDE.md](console-frontend/DEPLOYMENT_GUIDE.md)

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **Animations**: Framer Motion, GSAP
- **HTTP Client**: Axios
- **Icons**: Lucide React, React Icons
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT, Google OAuth 2.0
- **Security**: Helmet, CORS, Express Rate Limit
- **Validation**: Validator.js
- **Caching**: Node-Cache
- **Scheduling**: Node-Cron

### External APIs
- **CodeForces API** - For competitive programming data
- **LeetCode GraphQL** - For problem-solving statistics

### DevOps
- **Version Control**: Git
- **Hosting**: Netlify (Frontend), Render/Railway (Backend)
- **Database**: MongoDB Atlas
- **Monitoring**: Built-in health checks

---

## 📚 API Documentation

### Authentication Endpoints

```http
POST /api/auth/callback
GET  /api/auth/profile
PUT  /api/auth/profile
```

### Leaderboard Endpoints

```http
GET  /api/leaderboard/combined
GET  /api/leaderboard/analytics
GET  /api/leaderboard/user/:userId
```

### Contest Endpoints

```http
GET  /api/contest/all
GET  /api/contest/:id
POST /api/contest/create          # Admin only
PUT  /api/contest/:id             # Admin only
```

### Admin Endpoints

```http
GET  /api/admin/users
GET  /api/admin/pending-users
PUT  /api/admin/approve-user/:id
GET  /api/admin/stats
```

### Platform Endpoints

```http
POST /api/auth/platform/validate
POST /api/auth/platform/submit
POST /api/auth/platform/verify
POST /api/auth/platform/refresh
POST /api/auth/platform/delete
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 🐛 Known Issues & Roadmap

### Known Issues
- [ ] Mobile responsiveness improvements needed
- [ ] Contest timer synchronization edge cases

### Roadmap
- [ ] Real-time notifications
- [ ] Social features (comments, likes)
- [ ] More platform integrations (HackerRank, CodeChef)
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Discord bot integration

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- CodeForces API for competitive programming data
- LeetCode for problem-solving statistics
- All contributors who have helped this project grow
- The open-source community

---

## 📞 Support

If you have any questions or need help, feel free to:
- 📧 Email: support@console.net.in
- 💬 Open an issue on GitHub
- 🌐 Visit our website: [console.net.in](https://console.net.in)

---

<div align="center">

**Made with ❤️ by the Console Team**

⭐ Star this repository if you find it helpful!

</div>
