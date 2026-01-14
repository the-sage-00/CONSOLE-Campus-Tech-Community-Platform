import User from '../models/User.js';

// Get LeetCode user data
const getUserData = async (req, res) => {
  try {
    const { username } = req.params;
    
    // Find user with this LeetCode handle
    const user = await User.findOne({
      'platformVerification.leetcode.handle': username,
      'platformVerification.leetcode.isVerified': true
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found or not verified' });
    }

    res.json({
      message: 'LeetCode user data retrieved successfully',
      data: {
        name: user.name,
        email: user.email,
        leetcode: user.platformVerification.leetcode.platformData
      }
    });
  } catch (error) {
    console.error('Error getting LeetCode user data:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get LeetCode user stats
const getUserStats = async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({
      'platformVerification.leetcode.handle': username,
      'platformVerification.leetcode.isVerified': true
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found or not verified' });
    }

    const stats = user.platformVerification.leetcode.platformData;
    
    res.json({
      message: 'LeetCode stats retrieved successfully',
      data: stats
    });
  } catch (error) {
    console.error('Error getting LeetCode stats:', error);
    res.status(500).json({ error: error.message });
  }
};

export {
  getUserData,
  getUserStats
};
