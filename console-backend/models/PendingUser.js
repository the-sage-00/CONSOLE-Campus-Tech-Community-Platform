import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const pendingUserSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true,
    trim: true
  },
  
  // OTP verification
  otp: {
    type: String,
    required: true
  },
  otpExpires: {
    type: Date,
    required: true
  },
  
  // Automatic cleanup - records expire after 5 minutes
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 300 // 5 minutes in seconds
  },
  
  // Retry tracking
  otpAttempts: {
    type: Number,
    default: 0,
    max: 5
  },
  resendCount: {
    type: Number,
    default: 0,
    max: 3 // Max 3 resends per pending registration
  },
  lastResendAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Hash password before saving
pendingUserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
pendingUserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Check if OTP is valid and not expired
pendingUserSchema.methods.isOTPValid = function(providedOTP) {
  return this.otp === providedOTP && new Date() < this.otpExpires;
};

// Check if user can request another resend
pendingUserSchema.methods.canResend = function() {
  if (this.resendCount >= 3) return false;
  
  // Must wait at least 1 minute between resends
  if (this.lastResendAt) {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    return this.lastResendAt < oneMinuteAgo;
  }
  
  return true;
};

// Generate new OTP
pendingUserSchema.methods.generateOTP = function() {
  this.otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  this.resendCount += 1;
  this.lastResendAt = new Date();
  return this.otp;
};

// Increment OTP attempt
pendingUserSchema.methods.incrementAttempt = function() {
  this.otpAttempts += 1;
  return this.otpAttempts;
};

export default mongoose.model('PendingUser', pendingUserSchema);
