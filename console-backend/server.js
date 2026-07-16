import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Configure dotenv FIRST
dotenv.config();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import security and error handling
import { securityHeaders, validateJWTSecret } from './middleware/security.js';
import { globalErrorHandler, notFoundHandler } from './utils/errorHandler.js';

// Import routes AFTER environment variables are loaded
import cfRoutes from './routes/cfRoutes.js';
import lcRoutes from './routes/lcRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import authRoutesFixed from './routes/authRoutes_Fixed.js';
import adminRoutes from './routes/adminRoutes.js';
import contestRoutes from './routes/contestRoutes.js';
import { startContestScheduler } from './schedulers/contestCron.js';
import keepAlive from './utils/keepalive.js';

const app = express();

// CORS configuration - MUST come before security middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL, // Netlify production URL
];

// Add Netlify preview deployments (e.g., deploy-preview-123--your-site.netlify.app)
if (process.env.NODE_ENV === 'production') {
  allowedOrigins.push(/\.netlify\.app$/); // Allow all Netlify deployments
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if origin is in allowed list or matches regex pattern
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return allowed === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS blocked origin: ${origin}`);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Cross-Origin headers for Google OAuth compatibility
app.use((req, res, next) => {
  // Allow Google Sign-In popup to communicate with parent window
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});

// Security middleware
app.use(securityHeaders);
app.use(validateJWTSecret);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`📥 ${req.method} ${req.path} - ${new Date().toISOString()}`);

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`📤 ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });

  next();
});

// Legacy routes (keep for backward compatibility)
app.use('/api/cf', cfRoutes);
app.use('/api/lc', lcRoutes);


// New unified leaderboard routes
app.use('/api/leaderboard', leaderboardRoutes);

// Authentication routes - FIXED VERSION (5-minute expiry, forgot password, proper pending flow)
app.use('/api/auth', authRoutesFixed);

// Admin routes
app.use('/api/admin', adminRoutes);
app.use('/api/contest', contestRoutes);


// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Network connectivity check endpoint
app.get('/api/network-test', async (req, res) => {
  try {
    const testUrls = [
      'https://codeforces.com/api/user.info?handles=tourist',
      'https://leetcode.com/graphql/',

    ];

    const results = {};

    for (const url of testUrls) {
      try {
        const startTime = Date.now();
        const response = await fetch(url, {
          method: 'GET',
          timeout: 5000,
        });
        const endTime = Date.now();

        results[url] = {
          status: 'success',
          responseTime: endTime - startTime,
          statusCode: response.status,
        };
      } catch (error) {
        results[url] = {
          status: 'error',
          error: error.message,
          code: error.code,
        };
      }
    }

    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      networkTest: results,
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      error: error.message,
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Leaderboard System API',
    version: '2.0.0',
    endpoints: {
      health: '/api/health',
      networkTest: '/api/network-test',
      auth: '/api/auth',
      leaderboard: '/api/leaderboard',
      admin: '/api/admin',
    },
  });
});

// Keep-alive endpoint (also available at /api/ping for compatibility)
app.get('/api/ping', (req, res) => {
  res.status(200).send('pong');
});


// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(globalErrorHandler);

// Database connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

// Start server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    // Start keep-alive pings
    keepAlive();
    console.log(`✅ Backend running on http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('🔗 CORS enabled for: http://localhost:5173');
    // Start weekly contest sync scheduler
    startContestScheduler(app);
  });
};

startServer().catch(console.error);
