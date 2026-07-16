import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Contest from '../models/Contest.js';
import verificationService from '../services/verificationService.js';

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ 
        error: 'Invalid admin credentials', 
      });
    }

    // Generate JWT for admin session
    const payload = {
      email: adminEmail,
      role: 'admin',
    };

    const adminToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
    );

    res.json({
      message: 'Admin login successful',
      data: {
        token: adminToken,
        email: email,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Admin login failed' });
  }
};

// Get all users for admin
const getAllUsers = async (req, res) => {
  try {
    // Get full user data including all platform verification details
    const users = await User.find({})
      .select('name email platformVerification createdAt isEmailVerified')
      .sort({ createdAt: -1 });

    const usersWithHandles = users.map(user => {
      // Force deep check for platform connection status
      const leetcodeData = user.platformVerification?.leetcode || {};
      const codeforcesData = user.platformVerification?.codeforces || {};
      
      // Explicitly check for handle existence and verification status
      const hasLeetcodeHandle = leetcodeData.handle && leetcodeData.handle.trim() !== '';
      const hasCodeforcesHandle = codeforcesData.handle && codeforcesData.handle.trim() !== '';
      
      // Get contest participation data - ensure we have valid data
      const contestStats = leetcodeData.contestStats || {};
      const totalContests = contestStats.totalContests || 0;
      const lastContestParticipated = contestStats.lastContestParticipated || false;
      const lastContestName = contestStats.lastContestName || 'N/A';
      const contestHistory = contestStats.contestHistory || [];
      
      // Get latest rating and ranking if available
      const latestContest = contestHistory.length > 0 ? contestHistory[0] : null;
      const currentRating = latestContest ? latestContest.rating : 0;
      const currentRanking = latestContest ? latestContest.ranking : 0;
      
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        leetcodeHandle: hasLeetcodeHandle ? leetcodeData.handle : 'Not connected',
        codeforcesHandle: hasCodeforcesHandle ? codeforcesData.handle : 'Not connected',
        leetcodeVerified: leetcodeData.isVerified || false,
        codeforcesVerified: codeforcesData.isVerified || false,
        leetcodeData: leetcodeData.platformData || null,
        codeforcesData: codeforcesData.platformData || null,
        // Contest participation data with proper defaults
        contestParticipation: {
          totalContests,
          lastContestParticipated,
          lastContestName,
          currentRating,
          currentRanking,
          contestHistory,
        },
      };
    });

    res.json({
      message: 'Users retrieved successfully',
      data: usersWithHandles,
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Refresh user data
const refreshUserData = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const refreshResults = {
      leetcode: { success: false, error: null },
      codeforces: { success: false, error: null },
    };

    // Refresh LeetCode data if verified
    if (user.platformVerification?.leetcode?.isVerified && user.platformVerification?.leetcode?.handle) {
      try {
        const leetcodeData = await verificationService.fetchPlatformUserData(
          'leetcode',
          user.platformVerification.leetcode.handle,
        );
        
        if (leetcodeData.success) {
          user.platformVerification.leetcode.platformData = leetcodeData.data;
          user.platformVerification.leetcode.lastFetched = new Date();
          refreshResults.leetcode.success = true;
        } else {
          refreshResults.leetcode.error = leetcodeData.error;
        }
      } catch (error) {
        refreshResults.leetcode.error = error.message;
      }
    }

    // Refresh Codeforces data if verified
    if (user.platformVerification?.codeforces?.isVerified && user.platformVerification?.codeforces?.handle) {
      try {
        const codeforcesData = await verificationService.fetchPlatformUserData(
          'codeforces',
          user.platformVerification.codeforces.handle,
        );
        
        if (codeforcesData.success) {
          user.platformVerification.codeforces.platformData = codeforcesData.data;
          user.platformVerification.codeforces.lastFetched = new Date();
          refreshResults.codeforces.success = true;
        } else {
          refreshResults.codeforces.error = codeforcesData.error;
        }
      } catch (error) {
        refreshResults.codeforces.error = error.message;
      }
    }

    await user.save();

    res.json({
      message: 'User data refreshed successfully',
      data: {
        userId: user._id,
        name: user.name,
        email: user.email,
        refreshResults,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Refresh user data error:', error);
    res.status(500).json({ error: 'Failed to refresh user data' });
  }
};

// Get admin dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ isEmailVerified: true });
    const leetcodeUsers = await User.countDocuments({ 
      'platformVerification.leetcode.isVerified': true, 
    });
    const codeforcesUsers = await User.countDocuments({ 
      'platformVerification.codeforces.isVerified': true, 
    });

    res.json({
      message: 'Dashboard stats retrieved successfully',
      data: {
        totalUsers,
        verifiedUsers,
        leetcodeUsers,
        codeforcesUsers,
        unverifiedUsers: totalUsers - verifiedUsers,
      },
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to retrieve dashboard stats' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Store user info for response
    const userInfo = {
      name: user.name,
      email: user.email,
      _id: user._id,
    };

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.json({
      message: 'User deleted successfully',
      data: {
        deletedUser: userInfo,
        deletedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Get detailed participation statistics
const getParticipationStats = async (req, res) => {
  try {
    // Get all verified LeetCode users
    const verifiedUsers = await User.find({
      'platformVerification.leetcode.isVerified': true,
      'platformVerification.leetcode.handle': { $ne: null, $ne: '' },
    }).select('name email branch platformVerification.leetcode.handle platformVerification.leetcode.contestStats');

    // Get all contests sorted by date (most recent first) - get last 3 contests
    // First try to get leetcode contests, but also include contests without platform set (for backward compatibility)
    let allContests = await Contest.find({
      $or: [
        { platform: 'leetcode' },
        { platform: { $exists: false } },
        { platform: null },
      ],
    })
      .sort({ date: -1 })
      .limit(3)
      .populate('participants.user', 'name');

    // If still no contests, try getting all contests regardless of platform
    if (allContests.length === 0) {
      allContests = await Contest.find()
        .sort({ date: -1 })
        .limit(3)
        .populate('participants.user', 'name');
    }

    console.log(`Found ${allContests.length} contests for participation stats`);
    if (allContests.length > 0) {
      allContests.forEach((contest, index) => {
        console.log(`Contest ${index + 1}: ${contest.name || 'Unknown'}, Date: ${contest.date}, Platform: ${contest.platform || 'none'}, Participants: ${contest.participants?.length || 0}`);
      });
    } else {
      console.warn('No contests found in database');
    }

    // Get the most recent contest for summary stats
    const latestContest = allContests.length > 0 ? allContests[0] : null;

    // Create a map to quickly check if a user participated in a contest
    const contestParticipantsMap = new Map();
    allContests.forEach(contest => {
      if (!contest || !contest._id) {
        console.warn('Skipping invalid contest:', contest);
        return;
      }
      
      const participantIds = new Set(
        (contest.participants || []).map(p => {
          if (!p || !p.user) return null;
          const userId = p.user?._id ? String(p.user._id) : String(p.user);
          return userId;
        }).filter(id => id && id !== 'null' && id !== 'undefined'),
      );
      contestParticipantsMap.set(String(contest._id), {
        participants: participantIds,
        contestData: contest,
      });
    });

    // Calculate statistics for latest contest
    const participantsSet = latestContest 
      ? (contestParticipantsMap.get(String(latestContest._id))?.participants || new Set())
      : new Set();

    let totalParticipants = 0;
    let totalNonParticipants = 0;

    // Process each user to get their participation details
    const userStats = verifiedUsers.map(user => {
      const stats = user.platformVerification.leetcode.contestStats || {};
      const totalContestsParticipated = stats.totalContests || 0;
      const userId = String(user._id);
      
      const participated = latestContest 
        ? participantsSet.has(userId)
        : false;

      // Get last 3 contests with participation status
      const last3Contests = allContests.map((contest, index) => {
        if (!contest || !contest.name) {
          console.warn(`Contest at index ${index} is invalid:`, contest);
          return {
            contestName: 'N/A',
            date: null,
            participated: false,
            rank: null,
            rating: null,
          };
        }

        const contestInfo = contestParticipantsMap.get(String(contest._id));
        const userParticipated = contestInfo?.participants.has(userId) || false;
        
        // Find user's participation data if they participated
        const userParticipantData = userParticipated 
          ? contest.participants.find(p => {
            const pUserId = p.user?._id ? String(p.user._id) : String(p.user);
            return pUserId === userId;
          })
          : null;

        return {
          contestName: contest.name || 'N/A',
          date: contest.date ? new Date(contest.date).toISOString() : null,
          participated: userParticipated,
          rank: userParticipantData?.ranking || null,
          rating: userParticipantData?.rating || null,
        };
      });

      // Pad with empty entries if less than 3
      while (last3Contests.length < 3) {
        last3Contests.push({
          contestName: 'N/A',
          date: null,
          participated: false,
          rank: null,
          rating: null,
        });
      }

      if (participated) totalParticipants++;
      else totalNonParticipants++;

      return {
        name: user.name,
        email: user.email,
        branch: user.branch,
        leetcodeHandle: user.platformVerification.leetcode.handle,
        totalContestsParticipated,
        contestHistory: last3Contests,
      };
    });

    res.json({
      message: 'Participation statistics retrieved successfully',
      data: {
        summary: {
          totalUsers: verifiedUsers.length,
          participants: totalParticipants,
          nonParticipants: totalNonParticipants,
          latestContestName: latestContest ? latestContest.name : 'No contests available',
          totalContestsFound: allContests.length,
        },
        users: userStats,
      },
    });
  } catch (error) {
    console.error('Get participation stats error:', error);
    res.status(500).json({ error: 'Failed to retrieve participation statistics' });
  }
};

// Refresh all users data
const refreshAllUsersData = async (req, res) => {
  try {
    const users = await User.find({
      $or: [
        { 'platformVerification.leetcode.isVerified': true },
        { 'platformVerification.codeforces.isVerified': true },
      ],
    });

    if (!users || users.length === 0) {
      return res.status(200).json({ message: 'No verified users to refresh.' });
    }

    let refreshedCount = 0;
    const errors = [];

    for (const user of users) {
      let userRefreshed = false;

      // Refresh LeetCode
      if (user.platformVerification?.leetcode?.isVerified && user.platformVerification?.leetcode?.handle) {
        try {
          const leetcodeData = await verificationService.fetchPlatformUserData('leetcode', user.platformVerification.leetcode.handle);
          if (leetcodeData.success) {
            user.platformVerification.leetcode.platformData = leetcodeData.data;
            user.platformVerification.leetcode.lastFetched = new Date();
            userRefreshed = true;
          }
        } catch (error) {
          errors.push({ userId: user._id, platform: 'leetcode', error: error.message });
        }
      }

      // Refresh Codeforces
      if (user.platformVerification?.codeforces?.isVerified && user.platformVerification?.codeforces?.handle) {
        try {
          const codeforcesData = await verificationService.fetchPlatformUserData('codeforces', user.platformVerification.codeforces.handle);
          if (codeforcesData.success) {
            user.platformVerification.codeforces.platformData = codeforcesData.data;
            user.platformVerification.codeforces.lastFetched = new Date();
            userRefreshed = true;
          }
        } catch (error) {
          errors.push({ userId: user._id, platform: 'codeforces', error: error.message });
        }
      }

      if (userRefreshed) {
        await user.save();
        refreshedCount++;
      }
    }

    res.json({
      message: `User data refresh completed. ${refreshedCount} users processed.`,
      data: {
        totalUsers: users.length,
        refreshedCount,
        errors,
      },
    });
  } catch (error) {
    console.error('Refresh all users data error:', error);
    res.status(500).json({ error: 'Failed to refresh all users data' });
  }
};


export {
  adminLogin,
  getAllUsers,
  refreshUserData,
  getDashboardStats,
  deleteUser,
  getParticipationStats,
  refreshAllUsersData,
};
