import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import validator from 'validator';

// Rate limiting for OTP requests
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many OTP requests, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    error: 'Too many login attempts, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Input validation middleware
const validateInput = (req, res, next) => {
  const { email, name, password } = req.body;
  
  // Email validation
  if (email && !validator.isEmail(email)) {
    return res.status(400).json({
      error: 'Invalid email format'
    });
  }
  
  // Name validation
  if (name && !validator.isLength(name, { min: 2, max: 50 })) {
    return res.status(400).json({
      error: 'Name must be between 2 and 50 characters'
    });
  }
  
  // Password validation (if provided)
  if (password) {
    if (!validator.isLength(password, { min: 8 })) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long'
      });
    }
    
    if (!validator.matches(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)) {
      return res.status(400).json({
        error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      });
    }
  }
  
  next();
};

// Security headers middleware
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

// JWT secret validation
const validateJWTSecret = (req, res, next) => {
  const jwtSecret = process.env.JWT_SECRET;
  
  if (!jwtSecret || jwtSecret === 'your-secret-key' || jwtSecret === 'your_jwt_secret_key') {
    console.error('❌ CRITICAL: JWT_SECRET is not properly configured!');
    return res.status(500).json({
      error: 'Server configuration error. Please contact administrator.'
    });
  }
  
  next();
};

export {
  otpLimiter,
  loginLimiter,
  validateInput,
  securityHeaders,
  validateJWTSecret
}; 