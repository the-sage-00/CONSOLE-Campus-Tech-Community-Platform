# Console Backend

RESTful API server for the Console Tech Community platform built with Node.js, Express, and MongoDB.

## 🚀 Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Google OAuth 2.0** - Social authentication
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - Rate limiting
- **Node-Cron** - Scheduled jobs
- **Nodemailer** - Email service
- **Axios** - HTTP client
- **Bcrypt** - Password hashing
- **Validator** - Input validation

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

3. **Update `.env` with your values**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/console
   JWT_SECRET=your_super_secret_jwt_key_min_32_characters
   GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
   PORT=5000
   NODE_ENV=development
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=secure_password
   BACKEND_URL=http://localhost:5000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`

## 🛠️ Available Scripts

```bash
npm start            # Start production server
npm run dev          # Start development server with nodemon
npm test             # Run tests with Jest
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
```

## 📁 Project Structure

```
console-backend/
├── controller/          # Business logic
│   ├── authController.js
│   ├── leaderboardController.js
│   ├── contestController.js
│   └── adminController.js
├── models/              # MongoDB schemas
│   ├── User.js
│   ├── Contest.js
│   ├── PendingUser.js
│   └── PasswordReset.js
├── routes/              # API endpoints
│   ├── authRoutes_Fixed.js
│   ├── leaderboardRoutes.js
│   ├── contestRoutes.js
│   ├── adminRoutes.js
│   ├── cfRoutes.js
│   └── lcRoutes.js
├── middleware/          # Custom middleware
│   ├── auth.js
│   ├── security.js
│   └── validation.js
├── services/            # External API integrations
│   ├── codeforcesService.js
│   ├── leetcodeService.js
│   └── emailService.js
├── utils/               # Helper functions
│   ├── errorHandler.js
│   ├── keepalive.js
│   └── validators.js
├── schedulers/          # Cron jobs
│   └── contestCron.js
├── __tests__/           # Test files
├── server.js            # Entry point
└── package.json
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/google-login` | Login with Google OAuth | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/verify` | Verify JWT token | Yes |
| GET | `/api/auth/profile` | Get user profile | Yes |
| PUT | `/api/auth/profile` | Update user profile | Yes |
| POST | `/api/auth/sync-data` | Sync CodeForces/LeetCode data | Yes |

### Leaderboard

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/leaderboard/combined` | Get combined leaderboard | Yes |
| GET | `/api/leaderboard/analytics` | Get leaderboard analytics | Yes |
| GET | `/api/leaderboard/user/:userId` | Get user ranking | Yes |

### Contests

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/contest/all` | Get all contests | Yes |
| GET | `/api/contest/:id` | Get contest by ID | Yes |
| POST | `/api/contest/create` | Create new contest | Admin |
| PUT | `/api/contest/:id` | Update contest | Admin |
| DELETE | `/api/contest/:id` | Delete contest | Admin |

### Admin

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/users` | Get all users | Admin |
| GET | `/api/admin/pending-users` | Get pending approvals | Admin |
| PUT | `/api/admin/approve-user/:id` | Approve user | Admin |
| DELETE | `/api/admin/user/:id` | Delete user | Admin |
| GET | `/api/admin/stats` | Get dashboard stats | Admin |

### Health & Monitoring

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Health check | No |
| GET | `/api/network-test` | Network connectivity test | No |
| GET | `/ping` | Keep-alive ping | No |

## 🔐 Authentication

### JWT Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. User logs in with Google OAuth
2. Server generates JWT token
3. Client includes token in `Authorization` header
4. Server validates token on protected routes

**Token Format:**
```
Authorization: Bearer <jwt_token>
```

**Token Expiration:** 7 days

### Google OAuth Flow

1. Frontend initiates Google OAuth
2. User authenticates with Google
3. Frontend sends Google token to backend
4. Backend verifies token with Google
5. Backend creates/updates user
6. Backend returns JWT token

## 🛡️ Security

### Implemented Security Measures

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent abuse
- **JWT** - Secure authentication
- **Bcrypt** - Password hashing
- **Input Validation** - Prevent injection attacks
- **Error Handling** - No sensitive data leakage
- **Environment Variables** - Secure configuration

### Security Headers

```javascript
Content-Security-Policy
X-DNS-Prefetch-Control
X-Frame-Options
Strict-Transport-Security
X-Download-Options
X-Content-Type-Options
X-Permitted-Cross-Domain-Policies
Referrer-Policy
```

## 📊 Database Schema

### User Model

```javascript
{
  name: String,
  email: String (unique),
  googleId: String,
  year: Number,
  branch: String,
  codeforcesHandle: String,
  leetcodeHandle: String,
  rating: {
    codeforces: Number,
    leetcode: Number,
    combined: Number
  },
  isApproved: Boolean,
  isAdmin: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Contest Model

```javascript
{
  title: String,
  description: String,
  startTime: Date,
  endTime: Date,
  platform: String,
  link: String,
  participants: [ObjectId],
  createdBy: ObjectId,
  createdAt: Date
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGO_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | JWT signing secret | Yes | - |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes | - |
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment | No | development |
| `ADMIN_USERNAME` | Admin username | Yes | - |
| `ADMIN_PASSWORD` | Admin password | Yes | - |
| `BACKEND_URL` | Backend URL for keep-alive | No | - |
| `EMAIL_SERVICE` | Email service provider | No | - |
| `EMAIL_USER` | Email username | No | - |
| `EMAIL_PASS` | Email password | No | - |

### CORS Configuration

Allowed origins:
- `http://localhost:5173`
- `http://localhost:3000`
- `https://console.net.in`
- `https://test-console.netlify.app`

## 🔄 External API Integrations

### CodeForces API

**Base URL:** `https://codeforces.com/api/`

**Endpoints Used:**
- `user.info` - Get user information
- `user.rating` - Get user rating history
- `user.status` - Get user submissions

### LeetCode GraphQL API

**Base URL:** `https://leetcode.com/graphql/`

**Queries Used:**
- `userProfile` - Get user profile
- `userContestRanking` - Get contest ranking
- `userProblemsSolved` - Get solved problems

## 📝 Logging

### Request Logging

All requests are logged with:
- HTTP method
- Request path
- Timestamp
- Response status code
- Response time

### Error Logging

Errors are logged with:
- Error message
- Stack trace
- Request details
- User information (if available)

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Test Coverage

```bash
npm run test:coverage
```

### Test Structure

```
__tests__/
├── unit/
│   ├── controllers/
│   ├── models/
│   └── utils/
└── integration/
    └── routes/
```

## 🚀 Deployment

### Deploy to Render

1. **Create Render account**
2. **Create new Web Service**
3. **Connect GitHub repository**
4. **Configure settings:**
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Add environment variables**
6. **Deploy!**

### Deploy to Railway

1. **Create Railway account**
2. **Create new project**
3. **Connect GitHub repository**
4. **Add environment variables**
5. **Deploy automatically**

### Post-Deployment

1. **Update frontend API URL**
2. **Test all endpoints**
3. **Monitor logs**
4. **Set up error tracking**

## 🐛 Common Issues

### Issue: MongoDB Connection Failed
**Solution**: Check `MONGO_URI` and network connectivity

### Issue: JWT Verification Failed
**Solution**: Ensure `JWT_SECRET` is consistent

### Issue: Google OAuth Error
**Solution**: Verify `GOOGLE_CLIENT_ID` and redirect URIs

### Issue: CORS Error
**Solution**: Add frontend URL to CORS whitelist

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- Express.js team for the robust framework
- MongoDB team for the flexible database
- Google for OAuth services
- All open-source contributors

---

**Made with ❤️ by the Console Team**
