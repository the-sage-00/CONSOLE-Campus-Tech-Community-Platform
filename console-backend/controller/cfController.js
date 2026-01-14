import User from '../models/User.js';

// Get CodeForces user data
const getUserData = async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({
      'platformVerification.codeforces.handle': username,
      'platformVerification.codeforces.isVerified': true
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found or not verified' });
    }

    res.json({
      message: 'CodeForces user data retrieved successfully',
      data: {
        name: user.name,
        email: user.email,
        codeforces: user.platformVerification.codeforces.platformData
      }
    });
  } catch (error) {
    console.error('Error getting CodeForces user data:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get CodeForces user stats
const getUserStats = async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({
      'platformVerification.codeforces.handle': username,
      'platformVerification.codeforces.isVerified': true
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found or not verified' });
    }

    const stats = user.platformVerification.codeforces.platformData;
    
    res.json({
      message: 'CodeForces stats retrieved successfully',
      data: stats
    });
  } catch (error) {
    console.error('Error getting CodeForces stats:', error);
    res.status(500).json({ error: error.message });
  }
};

export {
  getUserData,
  getUserStats
};
