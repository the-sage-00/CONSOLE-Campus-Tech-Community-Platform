import User from "../models/User.js";
import PendingUser from "../models/PendingUser.js";
import PasswordReset from "../models/PasswordReset.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import emailService from "../services/emailService.js";

// Helper function to clean up expired records
const cleanupExpired = async (email) => {
  try {
    await Promise.all([
      PendingUser.deleteMany({ 
        email: email.toLowerCase(),
        otpExpires: { $lt: new Date() }
      }),
      PasswordReset.deleteMany({ 
        email: email.toLowerCase(),
        otpExpires: { $lt: new Date() }
      })
    ]);
  } catch (error) {
    console.error("Error cleaning expired records:", error);
  }
};

// Register new user - saves to PENDING collection only
const register = async (req, res) => {
  try {
    const { name, email, password, branch } = req.body;
    const emailLower = email.toLowerCase();

    console.log(`🔄 Registration attempt for: ${emailLower}`);

    // Step 0: Validate MNIT email domain
    const allowedDomain = 'mnit.ac.in';
    const emailDomain = emailLower.split('@')[1];
    
    if (emailDomain !== allowedDomain) {
      return res.status(403).json({ 
        error: `Only College email addresses are allowed for registration.`,
        status: "invalid_domain",
        domain: emailDomain
      });
    }

    // Step 1: Check if email exists in VERIFIED users
    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser && existingUser.isEmailVerified) {
      return res.status(400).json({ 
        error: "Email already in use by a verified account",
        status: "email_exists"
      });
    }

    // Step 2: Clean up any expired pending registrations
    await cleanupExpired(emailLower);

    // Step 3: Check if email exists in pending verifications
    const existingPending = await PendingUser.findOne({ email: emailLower });
    
    if (existingPending) {
      // Check if OTP is still valid
      if (new Date() < existingPending.otpExpires) {
        const timeLeft = Math.ceil((existingPending.otpExpires - new Date()) / 1000);
        return res.status(400).json({
          error: "Verify Your Mail or Try again after 10 minutes.",
          status: "registration_pending",
          data: {
            pendingId: existingPending._id,
            email: existingPending.email,
            timeLeft: timeLeft,
            canResend: existingPending.canResend(),
            attemptsLeft: Math.max(0, 5 - existingPending.otpAttempts)
          }
        });
      } else {
        // OTP expired - delete old record and create new one
        await PendingUser.findByIdAndDelete(existingPending._id);
        console.log(`🗑️ Removed expired pending registration for: ${emailLower}`);
      }
    }

    // Step 4: Create new pending user record
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    const pendingUser = new PendingUser({
      name: name.trim(),
      email: emailLower,
      password, // Will be hashed by pre-save hook
      branch,
      otp,
      otpExpires
    });

    await pendingUser.save();
    console.log(`✅ Created pending registration for: ${emailLower}`);

    // Step 5: Send OTP email
    const emailSent = await emailService.sendOTPEmail(email, name, otp);

    if (!emailSent) {
      console.log("⚠️  Email service failed, but pending user created. OTP:", otp);
    }

    const timeLeft = Math.ceil((pendingUser.otpExpires - new Date()) / 1000);

    res.status(201).json({
      message: "Registration initiated! Please check your email for verification code.",
      status: "registration_started",
      data: {
        pendingId: pendingUser._id,
        email: pendingUser.email,
        timeLeft: timeLeft,
        expiresAt: pendingUser.otpExpires,
        canResend: true
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: "Registration in progress. Please check your email or try again in a few minutes.",
        status: "duplicate_registration"
      });
    }
    
    res.status(500).json({ 
      error: "Registration failed. Please try again.",
      status: "server_error"
    });
  }
};

// Verify email and move user from pending to main users collection
const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ 
        error: "Email and OTP are required",
        status: "missing_fields"
      });
    }

    const emailLower = email.toLowerCase();
    console.log(`🔍 Verification attempt for: ${emailLower} with OTP: ${otp}`);

    // Find pending user
    const pendingUser = await PendingUser.findOne({ email: emailLower });
    if (!pendingUser) {
      return res.status(404).json({ 
        error: "No pending registration found. Please register again.",
        status: "no_pending_registration"
      });
    }

    // Check if too many attempts
    if (pendingUser.otpAttempts >= 5) {
      await PendingUser.findByIdAndDelete(pendingUser._id);
      return res.status(429).json({ 
        error: "Too many incorrect attempts. Please register again.",
        status: "too_many_attempts"
      });
    }

    // Check if OTP is valid
    if (!pendingUser.isOTPValid(otp)) {
      pendingUser.incrementAttempt();
      await pendingUser.save();
      
      if (new Date() >= pendingUser.otpExpires) {
        return res.status(400).json({ 
          error: "Verification code has expired. Please register again.",
          status: "otp_expired",
          data: {
            expired: true
          }
        });
      }
      
      return res.status(400).json({ 
        error: "Invalid verification code",
        status: "invalid_otp",
        data: {
          attemptsLeft: 5 - pendingUser.otpAttempts
        }
      });
    }

    // Verification successful - move to main users collection
    const user = new User({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password, // Already hashed
      branch: pendingUser.branch,
      isEmailVerified: true
    });

    // Skip password re-hashing since it's already hashed
    user.isModified = () => false;
    await user.save({ validateBeforeSave: false });

    // Delete from pending collection
    await PendingUser.findByIdAndDelete(pendingUser._id);

    console.log(`✅ User verified and moved to main collection: ${emailLower}`);

    // Generate JWT token for immediate login
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Email verified successfully! You are now logged in.",
      status: "verification_successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          branch: user.branch,
          isEmailVerified: true
        }
      },
    });
  } catch (error) {
    console.error("Email verification error:", error);
    
    // Handle duplicate key error if user already exists
    if (error.code === 11000) {
      const emailLower = req.body.email?.toLowerCase();
      if (emailLower) {
        await PendingUser.deleteOne({ email: emailLower });
      }
      return res.status(400).json({ 
        error: "User already exists. You can login directly.",
        status: "user_exists"
      });
    }
    
    res.status(500).json({ 
      error: "Email verification failed. Please try again.",
      status: "server_error"
    });
  }
};

// Resend verification OTP
const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        error: "Email is required",
        status: "missing_email"
      });
    }

    const emailLower = email.toLowerCase();
    console.log(`🔄 Resend OTP request for: ${emailLower}`);

    // Check if user is already verified
    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser && existingUser.isEmailVerified) {
      return res.status(400).json({ 
        error: "Email is already verified. You can login directly.",
        status: "already_verified"
      });
    }

    // Find pending user
    const pendingUser = await PendingUser.findOne({ email: emailLower });
    if (!pendingUser) {
      return res.status(404).json({ 
        error: "No pending registration found. Please register again.",
        status: "no_pending_registration"
      });
    }

    // Check if user can request resend
    if (!pendingUser.canResend()) {
      const waitTime = pendingUser.lastResendAt 
        ? Math.ceil((60 - (Date.now() - pendingUser.lastResendAt.getTime()) / 1000)) 
        : 0;
      
      if (waitTime > 0) {
        return res.status(429).json({ 
          error: `Please wait ${waitTime} seconds before requesting another code.`,
          status: "rate_limited",
          data: { waitTime }
        });
      }
      
      return res.status(429).json({ 
        error: "Maximum resend limit reached. Please register again.",
        status: "max_resends_reached"
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

    const timeLeft = Math.ceil((pendingUser.otpExpires - new Date()) / 1000);

    res.json({
      message: "New verification code sent successfully!",
      status: "otp_sent",
      data: {
        pendingId: pendingUser._id,
        email: pendingUser.email,
        timeLeft: timeLeft,
        expiresAt: pendingUser.otpExpires,
        remainingResends: Math.max(0, 3 - pendingUser.resendCount)
      },
    });
  } catch (error) {
    console.error("Resend verification error:", error);
    res.status(500).json({ 
      error: "Failed to send verification code. Please try again.",
      status: "server_error"
    });
  }
};

// Login user with proper unverified user handling
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase();

    console.log(`🔐 Login attempt for: ${emailLower}`);

    // Validate MNIT email domain
    const allowedDomain = 'mnit.ac.in';
    const emailDomain = emailLower.split('@')[1];
    
    if (emailDomain !== allowedDomain) {
      return res.status(403).json({ 
        error: `Only College email addresses are allowed for login.`,
        status: "invalid_domain",
        domain: emailDomain
      });
    }

    // Check verified users first
    const user = await User.findOne({ email: emailLower });
    if (user && user.isEmailVerified) {
      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ 
          error: "Invalid credentials",
          status: "invalid_credentials"
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      console.log(`✅ Successful login for verified user: ${emailLower}`);

      return res.json({
        message: "Login successful",
        status: "login_successful",
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
        return res.status(401).json({ 
          error: "Invalid credentials",
          status: "invalid_credentials"
        });
      }

      const timeLeft = Math.ceil((pendingUser.otpExpires - new Date()) / 1000);

      // User exists but not verified
      return res.status(401).json({
        error: "Mail Not verified, Register and Verify First .",
        status: "needs_verification",
        data: {
          needsVerification: true,
          pendingId: pendingUser._id,
          email: pendingUser.email,
          timeLeft: Math.max(0, timeLeft),
          canResend: pendingUser.canResend(),
          attemptsLeft: Math.max(0, 5 - pendingUser.otpAttempts)
        }
      });
    }

    // No user found
    return res.status(401).json({ 
      error: "Invalid credentials",
      status: "invalid_credentials"
    });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      error: "Login failed. Please try again.",
      status: "server_error"
    });
  }
};

// Forgot Password - Send OTP
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        error: "Email is required",
        status: "missing_email"
      });
    }

    const emailLower = email.toLowerCase();
    console.log(`🔄 Forgot password request for: ${emailLower}`);

    // Validate MNIT email domain
    const allowedDomain = 'mnit.ac.in';
    const emailDomain = emailLower.split('@')[1];
    
    if (emailDomain !== allowedDomain) {
      // Don't reveal if email exists or not for security
      return res.json({
        message: "If your email is registered, you will receive a password reset code.",
        status: "reset_code_sent"
      });
    }

    // Check if user exists and is verified
    const user = await User.findOne({ email: emailLower, isEmailVerified: true });
    if (!user) {
      // Don't reveal if email exists or not for security
      return res.json({
        message: "If your email is registered, you will receive a password reset code.",
        status: "reset_code_sent"
      });
    }

    // Clean up expired reset requests
    await PasswordReset.deleteMany({ 
      email: emailLower,
      otpExpires: { $lt: new Date() }
    });

    // Check if there's already an active reset request
    const existingReset = await PasswordReset.findOne({ email: emailLower });
    
    if (existingReset) {
      // Check if we can resend
      if (!existingReset.canResend()) {
        const waitTime = existingReset.lastResendAt 
          ? Math.ceil((2 * 60 - (Date.now() - existingReset.lastResendAt.getTime()) / 1000)) 
          : 0;
        if (waitTime > 0) {
          return res.status(429).json({ 
            error: `Please wait ${Math.ceil(waitTime / 60)} minutes before requesting another code.`,
            status: "rate_limited",
            data: { waitTime }
          });
        }
      }

      // Generate new OTP for existing request
      const newOTP = existingReset.generateOTP();
      await existingReset.save();

      // Send new OTP email
      try {
        const emailSent = await emailService.sendPasswordResetEmail(email, user.name, newOTP);
        console.log("✅ Password reset email sent successfully");
      } catch (emailError) {
        console.error("❌ Failed to send password reset email:", emailError.message);
        // Still return success to user for security (don't reveal if email exists)
        // But log the error for debugging
      }

      const timeLeft = Math.ceil((existingReset.otpExpires - new Date()) / 1000);

      return res.json({
        message: "New password reset code sent to your email.",
        status: "reset_code_sent",
        data: {
          timeLeft: timeLeft,
          remainingResends: Math.max(0, 3 - existingReset.resendCount)
        }
      });
    }

    // Create new password reset request
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    console.log(otp);

    const resetRequest = new PasswordReset({
      email: emailLower,
      otp,
      otpExpires
    });

    await resetRequest.save();

    // Send OTP email
    try {
      const emailSent = await emailService.sendPasswordResetEmail(email, user.name, otp);
      console.log("✅ Password reset email sent successfully");
    } catch (emailError) {
      console.error("❌ Failed to send password reset email:", emailError.message);
      // Still return success to user for security (don't reveal if email exists)
      // But log the error for debugging
    }

    const timeLeft = Math.ceil((resetRequest.otpExpires - new Date()) / 1000);

    res.json({
      message: "Password reset code sent to your email.",
      status: "reset_code_sent",
      data: {
        timeLeft: timeLeft,
        remainingResends: 2 // They get 3 total, this is the first
      }
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ 
      error: "Failed to process password reset request. Please try again.",
      status: "server_error"
    });
  }
};

// Reset Password - Verify OTP and set new password
const resetPassword = async (req, res) => {
  try {
    console.log('🔄 Password reset request received:', {
      body: req.body,
      headers: req.headers['content-type']
    });
    
    const { email, otp, newPassword } = req.body;

    console.log('🔍 Extracted fields:', {
      email: email ? email : 'MISSING',
      otp: otp ? 'PROVIDED' : 'MISSING', 
      newPassword: newPassword ? 'PROVIDED' : 'MISSING'
    });

    if (!email || !otp || !newPassword) {
      console.log('❌ Missing required fields for password reset');
      return res.status(400).json({ 
        error: "Email, OTP, and new password are required",
        status: "missing_fields"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        error: "Password must be at least 6 characters long",
        status: "weak_password"
      });
    }

    const emailLower = email.toLowerCase();
    console.log(`🔐 Password reset attempt for: ${emailLower}`);

    // Find the password reset request
    const resetRequest = await PasswordReset.findOne({ email: emailLower });
    if (!resetRequest) {
      return res.status(404).json({ 
        error: "No password reset request found. Please request a new reset code.",
        status: "no_reset_request"
      });
    }

    // Check if too many attempts
    if (resetRequest.otpAttempts >= 5) {
      await PasswordReset.findByIdAndDelete(resetRequest._id);
      return res.status(429).json({ 
        error: "Too many incorrect attempts. Please request a new reset code.",
        status: "too_many_attempts"
      });
    }

    // Check if OTP is valid
    if (!resetRequest.isOTPValid(otp)) {
      resetRequest.incrementAttempt();
      await resetRequest.save();
      
      if (new Date() >= resetRequest.otpExpires) {
        return res.status(400).json({ 
          error: "Reset code has expired. Please request a new one.",
          status: "otp_expired"
        });
      }
      
      return res.status(400).json({ 
        error: "Invalid reset code",
        status: "invalid_otp",
        data: {
          attemptsLeft: 5 - resetRequest.otpAttempts
        }
      });
    }

    // Find the user
    const user = await User.findOne({ email: emailLower, isEmailVerified: true });
    if (!user) {
      return res.status(404).json({ 
        error: "User not found",
        status: "user_not_found"
      });
    }

    // Update password
    user.password = newPassword; // Will be hashed by pre-save hook
    await user.save();

    // Mark reset request as used and delete it
    resetRequest.markUsed();
    await PasswordReset.findByIdAndDelete(resetRequest._id);

    console.log(`✅ Password reset successful for: ${emailLower}`);

    res.json({
      message: "Password reset successful! You can now login with your new password.",
      status: "password_reset_successful"
    });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ 
      error: "Failed to reset password. Please try again.",
      status: "server_error"
    });
  }
};

// Get pending user status (useful for frontend)
const getPendingStatus = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ 
        error: "Email is required",
        status: "missing_email"
      });
    }

    const emailLower = email.toLowerCase();

    // Check if user is already verified
    const existingUser = await User.findOne({ email: emailLower, isEmailVerified: true });
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

    const timeLeft = Math.ceil((pendingUser.otpExpires - new Date()) / 1000);

    res.json({
      status: "pending",
      data: {
        email: pendingUser.email,
        name: pendingUser.name,
        timeLeft: Math.max(0, timeLeft),
        expiresAt: pendingUser.otpExpires,
        canResend: pendingUser.canResend(),
        attemptsLeft: Math.max(0, 5 - pendingUser.otpAttempts),
        remainingResends: Math.max(0, 3 - pendingUser.resendCount)
      }
    });
    
  } catch (error) {
    console.error("Get pending status error:", error);
    res.status(500).json({ 
      error: "Failed to get status. Please try again.",
      status: "server_error"
    });
  }
};

export {
  register,
  login,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
  getPendingStatus
};
