import User from '../models/User.js';
import cacheService from '../services/cacheService.js';

// Get leaderboard
const getUnifiedLeaderboard = async (req, res) => {
  try {
    const { platform = 'all', limit = 10, page = 1 } = req.query;

    // Create a unique cache key based on query parameters
    const cacheKey = `leaderboard_${platform}_${limit}_${page}`;

    // Try to get data from cache
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);
    const skip = (parsedPage - 1) * parsedLimit;

    const matchQuery = { isEmailVerified: true };
    if (platform !== 'all') {
      matchQuery[`platformVerification.${platform}.isVerified`] = true;
    } else {
      matchQuery.$or = [
        { 'platformVerification.codeforces.isVerified': true },
        { 'platformVerification.leetcode.isVerified': true },
      ];
    }

    let sortStage = {};
    if (platform === 'codeforces') {
      sortStage = { calculatedCodeforcesRating: -1 };
    } else if (platform === 'leetcode') {
      sortStage = { 'platformVerification.leetcode.platformData.ranking': 1 };
    } else {
      // Default sort by name for 'all'
      sortStage = { name: 1 };
    }

    const aggregationPipeline = [
      { $match: matchQuery },
      { $addFields: {
        calculatedCodeforcesRating: {
          $cond: [
            '$platformVerification.codeforces.isVerified',
            '$platformVerification.codeforces.platformData.rating',
            0,
          ],
        },
      } },
      { $sort: sortStage },
      { $project: {
        _id: 1,
        name: 1,
        email: 1,
        branch: 1,
        platforms: {
          leetcode: '$platformVerification.leetcode.platformData',
          codeforces: '$platformVerification.codeforces.platformData',
        },
        platformVerification: {
          leetcode: {
            platformData: '$platformVerification.leetcode.platformData',
            contestStats: '$platformVerification.leetcode.contestStats',
          },
          codeforces: {
            platformData: '$platformVerification.codeforces.platformData',
            contestStats: '$platformVerification.codeforces.contestStats',
          },
        },
      } },
    ];

    const [result] = await User.aggregate([
      { $facet: {
        metadata: [{ $count: 'totalCount' }],
        data: [
          ...aggregationPipeline,
          { $skip: skip },
          { $limit: parsedLimit },
        ],
      } },
    ]);

    const leaderboard = result.data || [];
    const totalCount = result.metadata[0]?.totalCount || 0;

    const responseData = { users: leaderboard, totalCount };

    // Store data in cache for 5 minutes
    cacheService.set(cacheKey, responseData, 300);

    res.json(responseData);
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({ error: error.message });
  }
};

export {
  getUnifiedLeaderboard,
};

