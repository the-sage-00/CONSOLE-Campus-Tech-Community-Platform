import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { parseIdentityFromEmail, calculateAcademicState } from '../utils/identity.js';

// Create a new OAuth client
const client = new OAuth2Client();

/**
 * Google OAuth callback handler
 * Handles both login AND automatic registration
 * 
 * Flow:
 * 1. Verify Google token
 * 2. Validate MNIT domain
 * 3. Parse email for student details
 * 4. Find or create user
 * 5. Return JWT token
 */
export const googleAuthCallback = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Google credential token is required',
      });
    }

    // STEP 1: Verify the Google token
    let ticket;
    try {
      ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    } catch (verifyError) {
      console.error('Token verification failed:', verifyError);
      return res.status(401).json({
        success: false,
        message: 'Invalid Google token',
      });
    }

    // STEP 2: Get user info from the token
    const payload = ticket.getPayload();
    const { email, name, picture, email_verified, sub: googleId } = payload;

    if (!email_verified) {
      return res.status(400).json({
        success: false,
        message: 'Google account email is not verified',
      });
    }

    // STEP 3: Validate MNIT email domain
    const allowedDomain = 'mnit.ac.in';
    const emailLower = email.toLowerCase();
    const emailDomain = emailLower.split('@')[1];

    if (emailDomain !== allowedDomain) {
      return res.status(403).json({
        success: false,
        message: 'Only MNIT email addresses (@mnit.ac.in) are allowed.',
        domain: emailDomain,
      });
    }

    // STEP 4: Parse email to extract student details
    const identity = parseIdentityFromEmail(emailLower);

    // STEP 5: Check if user exists
    let user = await User.findOne({ email: emailLower });
    let isNewUser = false;

    if (!user) {
      // STEP 6: Create new user with parsed details
      isNewUser = true;

      const userData = {
        email: emailLower,
        name: name,
        googleId: googleId,
        profilePicture: picture,
        isEmailVerified: true, // Google already verified the email
      };

      // Add parsed identity fields if available
      if (identity) {
        userData.branch = identity.branchName;
        userData.admissionYear = identity.admissionYear;
        userData.rollNo = identity.rollNo;
        userData.branchCode = identity.branchCode;

        console.log(`✅ New user registered via Google: ${emailLower}`);
        console.log(`   → Admission Year: ${identity.admissionYear}`);
        console.log(`   → Branch: ${identity.branchName} (${identity.branchCode})`);
        console.log(`   → Roll No: ${identity.rollNo}`);
      } else {
        // Email doesn't match student format - still allow login but flag for review
        console.log(`⚠️ New user registered (non-standard email format): ${emailLower}`);
      }

      user = await User.create(userData);
    } else {
      // STEP 7: Update existing user with Google info if needed
      let needsSave = false;

      if (!user.googleId) {
        user.googleId = googleId;
        needsSave = true;
      }

      if (!user.profilePicture && picture) {
        user.profilePicture = picture;
        needsSave = true;
      }

      if (!user.isEmailVerified) {
        user.isEmailVerified = true;
        needsSave = true;
      }

      // Update parsed fields if missing
      if (identity) {
        if (!user.admissionYear && identity.admissionYear) {
          user.admissionYear = identity.admissionYear;
          needsSave = true;
        }
        if (!user.rollNo && identity.rollNo) {
          user.rollNo = identity.rollNo;
          needsSave = true;
        }
        if (!user.branchCode && identity.branchCode) {
          user.branchCode = identity.branchCode;
          needsSave = true;
        }
        // Update branch name if it was user-entered and we can standardize it
        if (identity.branchName && (!user.branch || user.branch !== identity.branchName)) {
          user.branch = identity.branchName;
          needsSave = true;
        }
      }

      if (needsSave) {
        await user.save();
        console.log(`✅ Updated existing user with Google info: ${emailLower}`);
      } else {
        console.log(`✅ Google login for existing user: ${emailLower}`);
      }
    }

    // STEP 8: Calculate academic state if admission year exists
    let academicState = null;
    if (user.admissionYear) {
      academicState = calculateAcademicState(user.admissionYear);
    }

    // STEP 9: Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    // STEP 10: Return success with user info and token
    res.json({
      success: true,
      message: isNewUser ? 'Account created successfully!' : 'Login successful',
      isNewUser,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        isEmailVerified: user.isEmailVerified,
        branch: user.branch,
        branchCode: user.branchCode,
        admissionYear: user.admissionYear,
        rollNo: user.rollNo,
        academicState: academicState,
      },
    });
  } catch (error) {
    console.error('Google authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed. Please try again.',
    });
  }
};