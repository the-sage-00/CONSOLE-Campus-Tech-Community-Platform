import User from "../models/User.js";
import PendingUser from "../models/PendingUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import emailService from "../services/emailService.js";

// Helper function to clean up expired pending users
const cleanupExpiredPending = async (email) => {
  try {
    await PendingUser.deleteMany({ 
      email: email.toLowerCase(),
      otpExpires: { $lt: new Date() }
    });
  } catch (error) {
    console.error("Error cleaning expired pending users:", error);
  }
};

// Register new user - saves to pending collection first
const register = async (req, res) => {
  try {
    const { name, email, password, branch } = req.body;
    const emailLower = email.toLowerCase();

    // Step 1: Check if email exists in verified users
    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser) {
      return res.status(400).json({ 
        error: "Email already in use by a verified account" 
      });
    }

    // Step 2: Clean up any expired pending registrations for this email
    await cleanupExpiredPending(emailLower);

    // Step 3: Check if email exists in pending verifications
    const existingPending = await PendingUser.findOne({ email: emailLower });
    
    if (existingPending) {
      // Check if OTP is still valid
      if (new Date() < existingPending.otpExpires) {
        return res.status(400).json({
          error: "Registration pending. Please check your email for the verification code.",
          pendingId: existingPending._id,
          canResend: existingPending.canResend()
        });
      } else {
        // OTP expired - delete old record and create new one
        await PendingUser.findByIdAndDelete(existingPending._id);
      }
    }

    // Step 4: Create new pending user record
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const pendingUser = new PendingUser({
      name: name.trim(),
      email: emailLower,
      password,
      branch,
      otp,
      otpExpires
    });

    await pendingUser.save();

    // Step 5: Send OTP email
    const emailSent = await emailService.sendOTPEmail(email, name, otp);

    if (!emailSent) {
      console.log("⚠️  Email service failed, but pending user created. OTP:", otp);
    }

    res.status(201).json({
      message: "Registration initiated! Please check your email for verification code.",
      data: {
        pendingId: pendingUser._id,
        email: pendingUser.email,
        expiresAt: pendingUser.otpExpires,
        canResend: true
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: "Registration in progress. Please check your email or try again in a few minutes." 
      });
    }
    
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
};

// Verify email and move user from pending to main users collection
const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    const emailLower = email.toLowerCase();

    // Find pending user
    const pendingUser = await PendingUser.findOne({ email: emailLower });
    if (!pendingUser) {
      return res.status(404).json({ 
        error: "No pending registration found. Please register again." 
      });
    }

    // Check if too many attempts
    if (pendingUser.otpAttempts >= 5) {
      await PendingUser.findByIdAndDelete(pendingUser._id);
      return res.status(429).json({ 
        error: "Too many incorrect attempts. Please register again." 
      });
    }

    // Check if OTP is valid
    if (!pendingUser.isOTPValid(otp)) {
      pendingUser.incrementAttempt();
      await pendingUser.save();
      
      if (new Date() >= pendingUser.otpExpires) {
        return res.status(400).json({ 
          error: "Verification code has expired. Please request a new one.",
          expired: true 
        });
      }
      
      return res.status(400).json({ 
        error: "Invalid verification code",
        attemptsLeft: 5 - pendingUser.otpAttempts 
      });
    }

    // Verification successful - move to main users collection
    const user = new User({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password, // Already hashed in PendingUser
      branch: pendingUser.branch,
      isEmailVerified: true
    });

    // Skip password hashing since it's already hashed
    user.isModified = () => false;
    await user.save({ validateBeforeSave: false });

    // Delete from pending collection
    await PendingUser.findByIdAndDelete(pendingUser._id);

    res.json({
      message: "Email verified successfully! You can now login.",
      data: {
        userId: user._id,
        email: user.email,
        name: user.name
      },
    });
  } catch (error) {
    console.error("Email verification error:", error);
    
    // Handle duplicate key error if user already exists
    if (error.code === 11000) {
      // User already exists, clean up pending
      const emailLower = req.body.email?.toLowerCase();
      if (emailLower) {
        await PendingUser.deleteOne({ email: emailLower });
      }
      return res.status(400).json({ 
        error: "User already exists. You can login directly." 
      });
    }
    
    res.status(500).json({ error: "Email verification failed. Please try again." });
  }
};

// Resend verification OTP
const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const emailLower = email.toLowerCase();

    // Check if user is already verified
    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser) {
      return res.status(400).json({ 
        error: "Email is already verified. You can login directly." 
      });
    }

    // Find pending user
    const pendingUser = await PendingUser.findOne({ email: emailLower });
    if (!pendingUser) {
      return res.status(404).json({ 
        error: "No pending registration found. Please register again." 
      });
    }

    // Check if user can request resend
    if (!pendingUser.canResend()) {
      const waitTime = pendingUser.lastResendAt 
        ? Math.ceil((60 - (Date.now() - pendingUser.lastResendAt.getTime()) / 1000)) 
        : 0;
      
      if (waitTime > 0) {
        return res.status(429).json({ 
          error: `Please wait ${waitTime} seconds before requesting another code.` 
        });
      }
      
      return res.status(429).json({ 
        error: "Maximum resend limit reached. Please register again." 
      });
    }

    // Generate new OTP
    const newOTP = pendingUser.generateOTP();
    await pendingUser.save();

    // Send new OTP email
    const emailSent = await emailService.sendOTPEmail(email, pendingUser.name, newOTP);

    if (!emailSent) {
      console.log("⚠️  Email service failed, but OTP generated. OTP:", newOTP);
    }

    res.json({
      message: "New verification code sent successfully!",
      data: {
        pendingId: pendingUser._id,
        email: pendingUser.email,
        expiresAt: pendingUser.otpExpires,
        remainingResends: Math.max(0, 3 - pendingUser.resendCount)
      },
    });
  } catch (error) {
    console.error("Resend verification error:", error);
    res.status(500).json({ error: "Failed to send verification code. Please try again." });
  }
};

// Login user with improved unverified user handling
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase();

    // Check verified users first
    const user = await User.findOne({ email: emailLower });
    if (user) {
      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        message: "Login successful",
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            branch: user.branch,
            isEmailVerified: user.isEmailVerified,
          },
        },
      });
    }

    // Check pending verifications
    const pendingUser = await PendingUser.findOne({ email: emailLower });
    if (pendingUser) {
      // Check password
      const isPasswordValid = await pendingUser.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // User exists but not verified
      return res.status(401).json({
        error: "Please verify your email before logging in.",
        needsVerification: true,
        pendingId: pendingUser._id,
        email: pendingUser.email,
        canResend: pendingUser.canResend()
      });
    }

    // No user found
    return res.status(401).json({ error: "Invalid credentials" });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
};

// Get pending user status (useful for frontend)
const getPendingStatus = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const emailLower = email.toLowerCase();

    // Check if user is already verified
    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser) {
      return res.json({
        status: "verified",
        message: "User is already verified"
      });
    }

    // Check pending status
    const pendingUser = await PendingUser.findOne({ email: emailLower });
    if (!pendingUser) {
      return res.json({
        status: "not_found",
        message: "No registration found"
      });
    }

    res.json({
      status: "pending",
      data: {
        email: pendingUser.email,
        name: pendingUser.name,
        expiresAt: pendingUser.otpExpires,
        canResend: pendingUser.canResend(),
        attemptsLeft: Math.max(0, 5 - pendingUser.otpAttempts),
        remainingResends: Math.max(0, 3 - pendingUser.resendCount)
      }
    });
    
  } catch (error) {
    console.error("Get pending status error:", error);
    res.status(500).json({ error: "Failed to get status. Please try again." });
  }
};

// Cleanup expired pending users (can be called via cron job or manually)
const cleanupExpired = async (req, res) => {
  try {
    const result = await PendingUser.deleteMany({
      otpExpires: { $lt: new Date() }
    });

    res.json({
      message: "Cleanup completed",
      deletedCount: result.deletedCount
    });
    
  } catch (error) {
    console.error("Cleanup error:", error);
    res.status(500).json({ error: "Cleanup failed" });
  }
};

export {
  register,
  login,
  verifyEmail,
  resendVerificationEmail,
  getPendingStatus,
  cleanupExpired
};
