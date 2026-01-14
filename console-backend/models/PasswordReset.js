import mongoose from 'mongoose';

const passwordResetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  otp: {
    type: String,
    required: true
  },
  otpExpires: {
    type: Date,
    required: true
  },
  
  // Automatic cleanup - records expire after 15 minutes
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 900 // 15 minutes in seconds
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
    max: 3
  },
  lastResendAt: {
    type: Date
  },
  
  // Track if OTP has been used
  isUsed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Check if OTP is valid and not expired
passwordResetSchema.methods.isOTPValid = function(providedOTP) {
  return this.otp === providedOTP && new Date() < this.otpExpires && !this.isUsed;
};

// Check if user can request another resend
passwordResetSchema.methods.canResend = function() {
  if (this.resendCount >= 3) return false;
  
  // Must wait at least 2 minutes between resends
  if (this.lastResendAt) {
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    return this.lastResendAt < twoMinutesAgo;
  }
  
  return true;
};

// Generate new OTP
passwordResetSchema.methods.generateOTP = function() {
  this.otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  this.resendCount += 1;
  this.lastResendAt = new Date();
  return this.otp;
};

// Increment OTP attempt
passwordResetSchema.methods.incrementAttempt = function() {
  this.otpAttempts += 1;
  return this.otpAttempts;
};

// Mark OTP as used
passwordResetSchema.methods.markUsed = function() {
  this.isUsed = true;
};

export default mongoose.model('PasswordReset', passwordResetSchema);
