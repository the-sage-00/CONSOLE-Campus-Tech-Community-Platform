import User from '../models/User.js';

import verificationService from '../services/verificationService.js';
import fetch from 'node-fetch';


// Submit platform handle using new verification service
const submitPlatformHandle = async (req, res) => {
  try {
    console.log('Submit platform handle called with:', req.body);
    const { platform, handle } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!platform || !handle) {
      return res
        .status(400)
        .json({ error: 'Platform and handle are required' });
    }

    if (!['leetcode', 'codeforces'].includes(platform)) {
      return res
        .status(400)
        .json({ error: 'Invalid platform. Supported: leetcode, codeforces' });
    }

    // Validate handle format
    const validation = verificationService.validateHandle(platform, handle);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const validatedHandle = validation.handle;
    console.log(
      `Processing ${platform} handle: ${validatedHandle} for user: ${userId}`,
    );

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User found:', user.name);

    // Check if platform handle already exists for this user
    if (
      user.platformVerification &&
      user.platformVerification[platform] &&
      user.platformVerification[platform].isVerified
    ) {
      return res.status(400).json({
        error: `${platform} profile already verified for this account`,
      });
    }

    console.log('Fetching platform data...');

    // Fetch user data from the platform using verification service
    const platformData = await verificationService.fetchPlatformUserData(
      platform,
      validatedHandle,
    );

    console.log('Platform data result:', platformData);

    if (!platformData.success) {
      console.log('Platform data fetch failed:', platformData.error);
      return res.status(400).json({
        error: `Could not fetch data from ${platform}. ${platformData.error}`,
      });
    }

    console.log('Generating verification code...');

    // Initialize platformVerification if it doesn't exist
    if (!user.platformVerification) {
      user.platformVerification = {};
    }
    if (!user.platformVerification[platform]) {
      // Initialize with schema-aligned defaults, including contestStats
      // Always ensure contestStats is a proper object to prevent Mongoose casting errors
      const initialContestStats = platform === 'leetcode'
        ? {
          totalContests: 0,
          recentContests: [],
          lastContestFetch: null,
          lastContestName: '',
          lastContestParticipated: false,
        }
        : {
          totalContests: 0,
          contestHistory: [],
          lastContestParticipation: null,
        };
      
      if (platform === 'leetcode') {
        user.platformVerification[platform] = {
          handle: '',
          isVerified: false,
          verificationCode: '',
          verificationExpires: null,
          submittedAt: null,
          verifiedAt: null,
          verificationAttempts: 0,
          platformId: '',
          lastSync: null,
          platformData: {
            easySolved: 0,
            mediumSolved: 0,
            hardSolved: 0,
            totalSolved: 0,
            ranking: 0,
            contributionPoint: 0,
            reputation: 0,
          },
          lastFetched: null,
          contestStats: initialContestStats,
        };
      } else {
        user.platformVerification[platform] = {
          handle: '',
          isVerified: false,
          verificationCode: '',
          verificationExpires: null,
          submittedAt: null,
          verifiedAt: null,
          platformData: {},
          lastFetched: null,
          contestStats: initialContestStats,
        };
      }
    }

    // Generate verification code using verification service
    const verificationCode =
      verificationService.generateVerificationCode(platform);
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    console.log('Verification code generated:', verificationCode);

    // Store the fetched platform data (preserve and/or initialize contestStats)
    // Ensure contestStats is always a valid object to prevent Mongoose casting errors
    let contestStatsToUse;
    if (platform === 'leetcode') {
      const existingContestStats = user.platformVerification[platform]?.contestStats;
      contestStatsToUse = existingContestStats && typeof existingContestStats === 'object' && !Array.isArray(existingContestStats)
        ? {
          totalContests: existingContestStats.totalContests || 0,
          recentContests: Array.isArray(existingContestStats.recentContests) ? existingContestStats.recentContests : [],
          lastContestFetch: existingContestStats.lastContestFetch || null,
          lastContestName: existingContestStats.lastContestName || '',
          lastContestParticipated: existingContestStats.lastContestParticipated || false,
        }
        : {
          totalContests: 0,
          recentContests: [],
          lastContestFetch: null,
          lastContestName: '',
          lastContestParticipated: false,
        };
    } else {
      // Codeforces
      const existingContestStats = user.platformVerification[platform]?.contestStats;
      contestStatsToUse = existingContestStats && typeof existingContestStats === 'object' && !Array.isArray(existingContestStats)
        ? {
          totalContests: existingContestStats.totalContests || 0,
          contestHistory: Array.isArray(existingContestStats.contestHistory) ? existingContestStats.contestHistory : [],
          lastContestParticipation: existingContestStats.lastContestParticipation || null,
        }
        : {
          totalContests: 0,
          contestHistory: [],
          lastContestParticipation: null,
        };
    }
    
    // Preserve existing fields that might be set
    const existingVerification = user.platformVerification[platform] || {};

    // Set the entire platform verification object at once to ensure Mongoose tracks changes
    // For LeetCode, preserve additional fields like verificationAttempts, platformId, lastSync
    if (platform === 'leetcode') {
      // For LeetCode, structure platformData according to schema
      const leetCodePlatformData = {
        easySolved: platformData.data?.easySolved || 0,
        mediumSolved: platformData.data?.mediumSolved || 0,
        hardSolved: platformData.data?.hardSolved || 0,
        totalSolved: platformData.data?.totalSolved || 0,
        ranking: platformData.data?.ranking || 0,
        contributionPoint: existingVerification.platformData?.contributionPoint || 0,
        reputation: platformData.data?.reputation || 0,
      };
      
      user.platformVerification[platform] = {
        handle: validatedHandle,
        isVerified: existingVerification.isVerified || false,
        verificationCode: verificationCode,
        verificationExpires: expires,
        submittedAt: new Date(),
        verifiedAt: existingVerification.verifiedAt || null,
        verificationAttempts: existingVerification.verificationAttempts || 0,
        platformId: existingVerification.platformId || '',
        lastSync: existingVerification.lastSync || null,
        platformData: leetCodePlatformData,
        lastFetched: new Date(),
        contestStats: contestStatsToUse,
      };
    } else {
      // For Codeforces, platformData is Mixed type, so we can store the full object
      user.platformVerification[platform] = {
        handle: validatedHandle,
        isVerified: existingVerification.isVerified || false,
        verificationCode: verificationCode,
        verificationExpires: expires,
        submittedAt: new Date(),
        verifiedAt: existingVerification.verifiedAt || null,
        platformData: platformData.data || {},
        lastFetched: new Date(),
        contestStats: contestStatsToUse,
      };
    }

    // Mark the nested path as modified so Mongoose saves it
    user.markModified('platformVerification');

    // Debug logging to verify contestStats is properly set
    console.log('Saving user data...');
    console.log('Verification code before save:', user.platformVerification[platform].verificationCode);
    console.log('ContestStats before save:', JSON.stringify(user.platformVerification[platform].contestStats));
    console.log('ContestStats type:', typeof user.platformVerification[platform].contestStats);
    
    try {
      await user.save();
      console.log('User data saved successfully');
      
      // Verify the code was saved by reloading the user
      const savedUser = await User.findById(userId);
      console.log('Verification code after save:', savedUser.platformVerification[platform]?.verificationCode);
      console.log('ContestStats after save:', JSON.stringify(savedUser.platformVerification[platform]?.contestStats));
    } catch (saveError) {
      console.error('Error saving user:', saveError);
      console.error('Error details:', saveError.message);
      console.error('Error stack:', saveError.stack);
      throw saveError;
    }

    // Get verification steps
    const verificationSteps =
      verificationService.getVerificationSteps(platform);

    const responseData = {
      platform,
      handle: validatedHandle,
      verificationCode,
      expiresAt: expires,
      platformData: platformData.data,
      verificationSteps,
    };

    console.log('Sending response with verification code:', verificationCode);

    // Also set a readable cookie with the verification code (non-HttpOnly so client can show it)
    try {
      res.cookie(
        `${platform}_verification_code`,
        verificationCode,
        {
          httpOnly: false,
          sameSite: 'Lax',
          secure: false,
          maxAge: 24 * 60 * 60 * 1000,
          path: '/',
        },
      );
    } catch (cookieErr) {
      console.warn('Could not set verification code cookie:', cookieErr?.message || cookieErr);
    }

    res.json({
      message: `✅ ${platform} profile data fetched successfully! Please follow the verification steps.`,
      data: responseData,
    });
  } catch (error) {
    console.error('Submit platform handle error:', error?.message || error);
    console.error('Error stack:', error?.stack);
    res.status(500).json({
      error: `Failed to submit platform handle: ${error?.message || 'unknown error'}`,
      details: process.env.NODE_ENV === 'development' ? (error?.stack || error?.message) : undefined,
    });
  }
};

// Verify platform handle using new verification service
const verifyPlatformHandle = async (req, res) => {
  try {
    const { platform, manualVerification: _manualVerification = false } = req.body;
    const userId = req.user.id;

    console.log('🔍 === VERIFICATION START ===');
    console.log(`Platform: ${platform}, User ID: ${userId}`);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(`👤 User found: ${user.name} (${user.email})`);

    // Check if platform verification data exists
    if (!user.platformVerification?.[platform]?.handle) {
      console.log(`❌ No platform verification data found for ${platform}`);
      return res
        .status(400)
        .json({
          error:
            'Platform handle not submitted. Please submit your handle first.',
        });
    }

    const platformData = user.platformVerification[platform];
    console.log('📊 Platform data:', {
      handle: platformData.handle,
      isVerified: platformData.isVerified,
      hasCode: !!platformData.verificationCode,
      codePreview: platformData.verificationCode
        ? `${platformData.verificationCode.substring(0, 4)}...`
        : 'none',
      expires: platformData.verificationExpires,
      submittedAt: platformData.submittedAt,
    });

    // Check if verification code exists
    const verificationCode = user.platformVerification[platform].verificationCode;
    if (!verificationCode) {
      console.log(`❌ No verification code found for ${platform}.`);
      return res.status(400).json({
        error: 'No verification code found. Please submit your handle again to generate a new code.',
        data: {
          platform,
          handle: user.platformVerification[platform]?.handle || null,
          verificationSteps: verificationService.getVerificationSteps(platform),
        },
      });
    }

    // Check if verification code is valid (not expired)
    const isCodeValid = user.isVerificationCodeValid(platform);
    console.log(`⏰ Code validity check: ${isCodeValid}`);
    if (!isCodeValid) {
      console.log(
        `❌ Code expired. Expires: ${
          platformData.verificationExpires
        }, Now: ${new Date()}`,
      );
      return res
        .status(400)
        .json({
          error:
            'Verification code has expired. Please submit your handle again to get a new code.',
        });
    }

    let isVerified = false;
    const handle = user.platformVerification[platform].handle;

    // Always use automatic verification - no manual bypass
    console.log(
      `🔍 Starting verification for ${platform} handle: ${handle} with code: ${verificationCode}`,
    );

    try {
      isVerified = await verificationService.verifyProfile(
        platform,
        handle,
        verificationCode,
      );
      console.log(`🔍 Verification result: ${isVerified}`);
    } catch (verificationError) {
      console.error('❌ Verification service error:', verificationError);
      return res.status(500).json({
        error:
          'Verification service is temporarily unavailable. Please try again later.',
      });
    }

    if (isVerified) {
      // Mark as verified
      user.markPlatformVerified(platform);

      // Fetch fresh platform data after verification
      try {
        const freshData = await verificationService.fetchPlatformUserData(
          platform,
          handle,
        );
        if (freshData.success) {
          user.platformVerification[platform].platformData = freshData.data;
          user.platformVerification[platform].lastFetched = new Date();
          console.log(`✅ Updated platform data for ${platform}`);

          // Persist legacy fields to ensure leaderboard reads contest ranking/rating
          if (platform === 'leetcode') {
            // Store contest ranking on legacy field for compatibility
            if (!user.platforms) user.platforms = {};
            if (!user.platforms.leetcode) user.platforms.leetcode = {};
            user.platforms.leetcode.ranking = Number(freshData.data?.ranking) || 0;
          } else if (platform === 'codeforces') {
            if (!user.platforms) user.platforms = {};
            if (!user.platforms.codeforces) user.platforms.codeforces = {};
            user.platforms.codeforces.rating = Number(freshData.data?.rating) || 0;
          }

          // Recalculate normalized total score
          if (typeof user.calculateTotalScore === 'function') {
            user.calculateTotalScore();
          }
        }
      } catch (fetchError) {
        console.error(
          '⚠️ Failed to update platform data after verification:',
          fetchError,
        );
        // Don't fail verification if data fetch fails
      }

      await user.save();

      res.json({
        message: `🎉 ${platform} profile verified successfully!`,
        data: {
          platform,
          isVerified: true,
          handle,
          verifiedAt: user.platformVerification[platform].verifiedAt,
          platformData: user.platformVerification[platform].platformData,
          normalizedScores: typeof user.getNormalizedScores === 'function' ? user.getNormalizedScores() : undefined,
        },
      });
    } else {
      res.status(400).json({
        error: `❌ Could not verify ${platform} profile automatically. Please ensure you've added the verification code to your profile and try again, or use manual verification.`,
        manualVerificationAvailable: true,
        verificationSteps: verificationService.getVerificationSteps(platform),
      });
    }
  } catch (error) {
    console.error('Verify platform handle error:', error);
    res
      .status(500)
      .json({ error: 'Failed to verify platform handle. Please try again.' });
  }
};

// Validate platform handle
const validatePlatformHandle = async (req, res) => {
  try {
    const { platform, handle } = req.body;
    const userId = req.user.id;

    if (!handle || !platform) {
      return res
        .status(400)
        .json({ error: 'Platform and handle are required' });
    }

    // Validate platform
    const validPlatforms = ['leetcode', 'codeforces'];
    if (!validPlatforms.includes(platform)) {
      return res.status(400).json({ error: 'Invalid platform' });
    }

    // Check if handle already exists for this user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.platformVerification[platform]?.handle) {
      return res
        .status(400)
        .json({ error: `${platform} handle already submitted` });
    }

    // Basic validation - check if handle is not empty and has reasonable length
    if (!handle.trim() || handle.length < 3 || handle.length > 50) {
      return res.status(400).json({
        error: `${platform} username must be between 3 and 50 characters`,
      });
    }

    // For now, accept the handle and let verification handle the real validation
    // This avoids issues with external platform CORS and rate limiting
    res.json({
      message: `${platform} username accepted for verification`,
      data: {
        platform,
        handle,
        isValid: true,
      },
    });
  } catch (error) {
    console.error('Validate platform handle error:', error);
    res
      .status(500)
      .json({ error: 'Failed to validate platform handle. Please try again.' });
  }
};

// Validate platform profile (check if account exists)
// eslint-disable-next-line no-unused-vars
const validatePlatformProfile = async (platform, handle) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      timeout: 10000, // 10 second timeout
    };

    switch (platform) {
    case 'leetcode':
      try {
        // Check LeetCode profile - they often redirect, so we check for 200 or 302
        const leetcodeResponse = await fetch(
          `https://leetcode.com/u/${handle}/`,
          options,
        );
        console.log(
          `LeetCode validation for ${handle}: Status ${leetcodeResponse.status}`,
        );
        return (
          leetcodeResponse.status === 200 || leetcodeResponse.status === 302
        );
      } catch (error) {
        console.error(
          `LeetCode validation error for ${handle}:`,
          error.message,
        );
        // For now, assume valid if we can't reach the platform
        return true;
      }

    case 'codeforces':
      try {
        // Check CodeForces profile
        const cfResponse = await fetch(
          `https://codeforces.com/profile/${handle}`,
          options,
        );
        console.log(
          `CodeForces validation for ${handle}: Status ${cfResponse.status}`,
        );
        return cfResponse.status === 200 || cfResponse.status === 302;
      } catch (error) {
        console.error(
          `CodeForces validation error for ${handle}:`,
          error.message,
        );
        // For now, assume valid if we can't reach the platform
        return true;
      }

    default:
      return false;
    }
  } catch (error) {
    console.error(`Error validating ${platform} profile:`, error);
    // For now, assume valid if we can't reach the platform
    return true;
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Profile retrieved successfully',
      data: user,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile. Please try again.' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, branch } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (name) user.name = name.trim();
    if (branch) user.branch = branch;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        branch: user.branch,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res
      .status(500)
      .json({ error: 'Failed to update profile. Please try again.' });
  }
};

// Verify platform profile by checking for verification code
// eslint-disable-next-line no-unused-vars
const verifyPlatformProfile = async (platform, handle, verificationCode) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      timeout: 15000, // 15 second timeout for verification
    };

    switch (platform) {
    case 'leetcode':
      try {
        // Check LeetCode profile for verification code in summary
        const leetcodeResponse = await fetch(
          `https://leetcode.com/u/${handle}/`,
          options,
        );
        if (leetcodeResponse.status === 200) {
          const html = await leetcodeResponse.text();
          console.log(
            `LeetCode verification for ${handle}: Checking for code ${verificationCode}`,
          );
          return {
            isVerified: html.includes(verificationCode),
            platformData: null,
          };
        }
        console.log(
          `LeetCode verification for ${handle}: Status ${leetcodeResponse.status}`,
        );
        return { isVerified: false, platformData: null };
      } catch (error) {
        console.error(
          `LeetCode verification error for ${handle}:`,
          error.message,
        );
        return { isVerified: false, platformData: null };
      }

    case 'codeforces':
      try {
        // Check CodeForces profile for verification code in first name
        const cfResponse = await fetch(
          `https://codeforces.com/profile/${handle}`,
          options,
        );
        if (cfResponse.status === 200) {
          const html = await cfResponse.text();
          console.log(
            `CodeForces verification for ${handle}: Checking for code ${verificationCode}`,
          );
          return {
            isVerified: html.includes(verificationCode),
            platformData: null,
          };
        }
        console.log(
          `CodeForces verification for ${handle}: Status ${cfResponse.status}`,
        );
        return { isVerified: false, platformData: null };
      } catch (error) {
        console.error(
          `CodeForces verification error for ${handle}:`,
          error.message,
        );
        return { isVerified: false, platformData: null };
      }

    default:
      return { isVerified: false, platformData: null };
    }
  } catch (error) {
    console.error(`Error verifying ${platform} profile:`, error);
    return { isVerified: false, platformData: null };
  }
};

// Fetch platform user data with real verification
const fetchPlatformUserData = async (platform, handle) => {
  try {
    console.log(`Fetching real data for ${platform} user: ${handle}`);

    switch (platform) {
    case 'leetcode':
      return await fetchLeetCodeData(handle);

    case 'codeforces':
      return await fetchCodeForcesData(handle);

    default:
      return { success: false, error: 'Unsupported platform' };
    }
  } catch (error) {
    console.error(`Error fetching ${platform} data:`, error);
    return { success: false, error: error.message };
  }
};

// Fetch LeetCode data using GraphQL (like Codolio)
const fetchLeetCodeData = async (username) => {
  try {
    console.log(`🔍 Fetching LeetCode data for user: ${username}`);

    const query = {
      query: `
      {
        matchedUser(username: "${username}") {
          username
          profile {
            realName
            userAvatar
            ranking
            reputation
            aboutMe
          }
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
      }
      `,
    };

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        Referer: 'https://leetcode.com/',
        Origin: 'https://leetcode.com',
      },
      body: JSON.stringify(query),
    });

    console.log(`📊 LeetCode API response status: ${response.status}`);

    if (response.status !== 200) {
      console.error(
        '❌ LeetCode API error:',
        response.status,
        response.statusText,
      );
      return {
        success: false,
        error: `LeetCode API returned status ${response.status}. Please try again later.`,
      };
    }

    const data = await response.json();
    console.log('📄 LeetCode GraphQL response:', JSON.stringify(data, null, 2));

    // Check for GraphQL errors
    if (data.errors && data.errors.length > 0) {
      console.error('❌ LeetCode GraphQL errors:', data.errors);
      return {
        success: false,
        error: 'LeetCode API returned errors. Please check your username.',
      };
    }

    if (!data.data?.matchedUser) {
      console.log('❌ No matched user found for:', username);
      return {
        success: false,
        error:
          'User not found. Please check your LeetCode username and ensure your profile is public.',
      };
    }

    const user = data.data.matchedUser;
    const stats = user.submitStats?.acSubmissionNum || [];

    console.log(`📈 Processing stats for ${username}:`, stats);

    // Calculate totals
    const easySolved = stats.find((s) => s.difficulty === 'Easy')?.count || 0;
    const mediumSolved =
      stats.find((s) => s.difficulty === 'Medium')?.count || 0;
    const hardSolved = stats.find((s) => s.difficulty === 'Hard')?.count || 0;
    const totalSolved = easySolved + mediumSolved + hardSolved;

    const result = {
      username: user.username,
      ranking: user.profile?.ranking || 0,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      reputation: user.profile?.reputation || 0,
      aboutMe: user.profile?.aboutMe || '',
      realName: user.profile?.realName || '',
    };

    console.log(
      `✅ LeetCode data fetched successfully for ${username}:`,
      result,
    );

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('❌ LeetCode fetch error for', username, ':', error);
    return {
      success: false,
      error: `Failed to fetch LeetCode data: ${error.message}`,
    };
  }
};

// Fetch CodeForces data using official API
const fetchCodeForcesData = async (username) => {
  try {
    console.log(`🔍 Fetching CodeForces data for user: ${username}`);

    const apiUrl = `https://codeforces.com/api/user.info?handles=${username}`;
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      timeout: 10000, // 10 second timeout
    });

    console.log(`📊 CodeForces API response status: ${response.status}`);

    if (response.status !== 200) {
      console.error(
        '❌ CodeForces API error:',
        response.status,
        response.statusText,
      );
      return {
        success: false,
        error: `CodeForces API returned status ${response.status}. Please try again later.`,
      };
    }

    const data = await response.json();
    console.log('📄 CodeForces API response:', JSON.stringify(data, null, 2));

    if (data.status !== 'OK') {
      console.log('❌ CodeForces API status not OK:', data.status);
      return {
        success: false,
        error: 'CodeForces API returned an error. Please check your handle.',
      };
    }

    if (!data.result || !data.result[0]) {
      console.log('❌ No user data found for:', username);
      return {
        success: false,
        error:
          'CodeForces user not found. Please check your handle and ensure it exists.',
      };
    }

    const user = data.result[0];
    
    // Fetch problems solved count from user.status API
    let problemsSolved = 0;
    try {
      console.log(`📊 Fetching problems solved count for ${username}...`);
      const encodedUsername = encodeURIComponent(username);
      const statusUrl = `https://codeforces.com/api/user.status?handle=${encodedUsername}&from=1&count=10000`;
      const statusResponse = await fetch(statusUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });

      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        if (statusData.status === 'OK') {
          const submissions = statusData.result || [];
          // Count unique problems with "OK" verdict (accepted)
          const solvedProblems = new Set();
          submissions.forEach(submission => {
            if (submission.verdict === 'OK' && submission.problem) {
              // Create unique key: contestId + problem index
              const problemKey = `${submission.problem.contestId || 'gym'}_${submission.problem.index}`;
              solvedProblems.add(problemKey);
            }
          });
          problemsSolved = solvedProblems.size;
          console.log(`✅ Found ${problemsSolved} unique solved problems for ${username}`);
        }
      }
    } catch (statusError) {
      console.error('⚠️ Error fetching problems solved count:', statusError.message);
      // Continue without problems solved count - don't fail the entire request
    }

    const result = {
      username: user.handle,
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || 'unrated',
      contribution: user.contribution || 0,
      friendOfCount: user.friendOfCount || 0,
      registrationTime: user.registrationTimeSeconds || 0,
      lastOnlineTime: user.lastOnlineTimeSeconds || 0,
      totalSolved: problemsSolved,
    };

    console.log(
      `✅ CodeForces data fetched successfully for ${username}:`,
      result,
    );

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('❌ CodeForces fetch error for', username, ':', error);
    return {
      success: false,
      error: `Failed to fetch CodeForces data: ${error.message}`,
    };
  }
};

// Refresh platform data
const refreshPlatformData = async (req, res) => {
  try {
    const { platform } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.platformVerification[platform]?.handle) {
      return res.status(400).json({ error: `${platform} handle not found` });
    }

    // Fetch updated platform data
    const platformData = await fetchPlatformUserData(
      platform,
      user.platformVerification[platform].handle,
    );

    if (!platformData.success) {
      return res.status(400).json({
        error: `Could not fetch updated data from ${platform}. Please try again later.`,
      });
    }

    // Update the platform data
    user.platformVerification[platform].platformData = platformData.data;
    user.platformVerification[platform].lastFetched = new Date();

    // Persist legacy compatibility fields
    if (!user.platforms) user.platforms = {};
    if (platform === 'leetcode') {
      if (!user.platforms.leetcode) user.platforms.leetcode = {};
      user.platforms.leetcode.ranking = Number(platformData.data?.ranking) || 0;
    } else if (platform === 'codeforces') {
      if (!user.platforms.codeforces) user.platforms.codeforces = {};
      user.platforms.codeforces.rating = Number(platformData.data?.rating) || 0;
    }

    // Recalculate normalized total score
    if (typeof user.calculateTotalScore === 'function') {
      user.calculateTotalScore();
    }
    await user.save();

    res.json({
      message: `${platform} data refreshed successfully!`,
      data: {
        platform,
        platformData: platformData.data,
        lastFetched: user.platformVerification[platform].lastFetched,
        normalizedScores: typeof user.getNormalizedScores === 'function' ? user.getNormalizedScores() : undefined,
      },
    });
  } catch (error) {
    console.error('Refresh platform data error:', error);
    res
      .status(500)
      .json({ error: 'Failed to refresh platform data. Please try again.' });
  }
};

// Delete platform handle
const deletePlatformHandle = async (req, res) => {
  try {
    const { platform } = req.body;
    const userId = req.user.id;

    // Validate platform
    if (!['leetcode', 'codeforces'].includes(platform)) {
      return res.status(400).json({ 
        error: 'Invalid platform. Supported: leetcode, codeforces', 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if platform handle exists
    if (!user.platformVerification?.[platform]?.handle) {
      return res.status(400).json({ 
        error: `${platform} handle not found`, 
      });
    }

    // Store the handle for confirmation message
    const handleToDelete = user.platformVerification[platform].handle;

    // Delete the platform verification data (reset with schema-aligned defaults)
    if (user.platformVerification[platform]) {
      user.platformVerification[platform] = {
        handle: '',
        isVerified: false,
        verificationCode: '',
        verificationExpires: null,
        submittedAt: null,
        verifiedAt: null,
        platformData: {},
        lastFetched: null,
        contestStats:
          platform === 'leetcode'
            ? {
              totalContests: 0,
              recentContests: [],
              lastContestFetch: null,
              lastContestName: '',
              lastContestParticipated: false,
            }
            : {
              totalContests: 0,
              contestHistory: [],
              lastContestParticipation: null,
            },
      };
    }

    await user.save();

    res.json({
      message: `${platform} handle "@${handleToDelete}" deleted successfully!`,
      data: {
        platform,
        deletedHandle: handleToDelete,
        deletedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Delete platform handle error:', error);
    res.status(500).json({ 
      error: 'Failed to delete platform handle. Please try again.', 
    });
  }
};

// DEBUG ENDPOINT - Get platform profile data as seen by verification service
const debugPlatformProfile = async (req, res) => {
  try {
    const { platform } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if platform verification data exists
    if (!user.platformVerification?.[platform]?.handle) {
      return res
        .status(400)
        .json({
          error:
            'Platform handle not submitted. Please submit your handle first.',
        });
    }

    const platformData = user.platformVerification[platform];
    const handle = platformData.handle;
    const verificationCode = platformData.verificationCode;

    console.log(`🔍 DEBUG: Fetching ${platform} profile for ${handle}`);

    try {
      // Get fresh profile data
      const result = await verificationService.fetchPlatformUserData(
        platform,
        handle,
      );

      if (!result.success) {
        return res.status(400).json({
          error: result.error,
          handle,
          verificationCode,
        });
      }

      // For LeetCode, also run verification check
      let verificationResult = null;
      if (platform === 'leetcode' && verificationCode) {
        verificationResult = await verificationService.verifyProfile(
          platform,
          handle,
          verificationCode,
        );
      }

      res.json({
        message: `Debug data for ${platform} profile`,
        data: {
          platform,
          handle,
          verificationCode: verificationCode || 'No verification code found',
          verificationExpires: platformData.verificationExpires,
          profileData: result.data,
          verificationResult:
            verificationResult !== null ? verificationResult : 'Not tested',
          lastFetched: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error(`❌ Debug error for ${platform}:`, error);
      res.status(500).json({
        error: 'Debug fetch failed',
        details: error.message,
        handle,
        verificationCode,
      });
    }
  } catch (error) {
    console.error('Debug platform profile error:', error);
    res
      .status(500)
      .json({ error: 'Failed to debug platform profile. Please try again.' });
  }
};

export {
  submitPlatformHandle,
  verifyPlatformHandle,
  validatePlatformHandle,
  getProfile,
  updateProfile,
  refreshPlatformData,
  deletePlatformHandle,
  debugPlatformProfile,
};