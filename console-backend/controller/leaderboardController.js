import User from '../models/User.js';
import cacheService from '../services/cacheService.js';

// Get unified leaderboard
const getUnifiedLeaderboard = async (req, res) => {
  try {
    const { platform = 'all', sortBy = 'totalScore', limit = 10, page = 1 } = req.query;

    // Create a unique cache key based on query parameters
    const cacheKey = `leaderboard_${platform}_${sortBy}_${limit}_${page}`;

    // Try to get data from cache
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);
    const skip = (parsedPage - 1) * parsedLimit;

    let matchQuery = { isEmailVerified: true };
    if (platform !== 'all') {
      matchQuery[`platformVerification.${platform}.isVerified`] = true;
    } else {
      matchQuery.$or = [
        { 'platformVerification.codeforces.isVerified': true },
        { 'platformVerification.leetcode.isVerified': true }
      ];
    }

    let sortStage = {};
    if (sortBy === 'totalScore') {
      sortStage = { calculatedTotalScore: -1 };
    } else if (platform === 'codeforces') {
      sortStage = { calculatedCodeforcesRating: -1 };
    } else if (platform === 'leetcode') {
      sortStage = { calculatedLeetcodeScore: -1 };
    }

    const aggregationPipeline = [
      { $match: matchQuery },
      { $addFields: {
          calculatedLeetcodeScore: {
            $cond: [
              '$platformVerification.leetcode.isVerified',
              {
                $add: [
                  700,
                  { $multiply: [22, { $sqrt: {
                    $add: [
                      { $multiply: ['$platformVerification.leetcode.platformData.easySolved', 1] },
                      { $multiply: ['$platformVerification.leetcode.platformData.mediumSolved', 2.5] },
                      { $multiply: ['$platformVerification.leetcode.platformData.hardSolved', 4] }
                    ]
                  }}]}
                ]
              },
              0
            ]
          },
          calculatedCodeforcesRating: {
            $cond: [
              '$platformVerification.codeforces.isVerified',
              '$platformVerification.codeforces.platformData.rating',
              0
            ]
          }
      }},
      { $addFields: {
          calculatedTotalScore: {
            $max: ['$calculatedCodeforcesRating', '$calculatedLeetcodeScore']
          }
      }},
      { $sort: sortStage },
      { $project: {
          _id: 1,
          name: 1,
          email: 1,
          branch: 1,
          totalScore: { $round: '$calculatedTotalScore' },
          platforms: {
            leetcode: '$platformVerification.leetcode.platformData',
            codeforces: '$platformVerification.codeforces.platformData'
          },
          platformVerification: {
            leetcode: {
              platformData: '$platformVerification.leetcode.platformData',
              contestStats: '$platformVerification.leetcode.contestStats'
            },
            codeforces: {
              platformData: '$platformVerification.codeforces.platformData',
              contestStats: '$platformVerification.codeforces.contestStats'
            }
          }
      }}
    ];

    const [result] = await User.aggregate([
      { $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [
            ...aggregationPipeline,
            { $skip: skip },
            { $limit: parsedLimit }
          ]
      }}
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


// Get user ranking
const getUserRanking = async (req, res) => {
  try {
    const { userId } = req.params;

    const cacheKey = `user_rank_${userId}`;
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Aggregation pipeline to get the user's calculated scores
    const userScorePipeline = [
      { $match: { _id: user._id } },
      { $addFields: {
          calculatedLeetcodeScore: {
            $cond: [
              '$platformVerification.leetcode.isVerified',
              {
                $add: [
                  700,
                  { $multiply: [22, { $sqrt: {
                    $add: [
                      { $multiply: ['$platformVerification.leetcode.platformData.easySolved', 1] },
                      { $multiply: ['$platformVerification.leetcode.platformData.mediumSolved', 2.5] },
                      { $multiply: ['$platformVerification.leetcode.platformData.hardSolved', 4] }
                    ]
                  }}]}
                ]
              },
              0
            ]
          },
          calculatedCodeforcesRating: {
            $cond: [
              '$platformVerification.codeforces.isVerified',
              '$platformVerification.codeforces.platformData.rating',
              0
            ]
          }
      }},
      { $addFields: {
          calculatedTotalScore: {
            $max: ['$calculatedCodeforcesRating', '$calculatedLeetcodeScore']
          }
      }}
    ];

    const [userWithScores] = await User.aggregate(userScorePipeline);

    const leetcodeScore = userWithScores ? userWithScores.calculatedLeetcodeScore : 0;
    const cfRating = userWithScores ? userWithScores.calculatedCodeforcesRating : 0;
    const totalScore = userWithScores ? userWithScores.calculatedTotalScore : 0;

    // Aggregation pipeline to calculate ranks
    const ranks = await User.aggregate([
      { $match: { isEmailVerified: true } },
      { $addFields: {
          calculatedLeetcodeScore: {
            $cond: [
              '$platformVerification.leetcode.isVerified',
              {
                $add: [
                  700,
                  { $multiply: [22, { $sqrt: {
                    $add: [
                      { $multiply: ['$platformVerification.leetcode.platformData.easySolved', 1] },
                      { $multiply: ['$platformVerification.leetcode.platformData.mediumSolved', 2.5] },
                      { $multiply: ['$platformVerification.leetcode.platformData.hardSolved', 4] }
                    ]
                  }}]}
                ]
              },
              0
            ]
          },
          calculatedCodeforcesRating: {
            $cond: [
              '$platformVerification.codeforces.isVerified',
              '$platformVerification.codeforces.platformData.rating',
              0
            ]
          }
      }},
      { $addFields: {
          calculatedTotalScore: {
            $max: ['$calculatedCodeforcesRating', '$calculatedLeetcodeScore']
          }
      }},
      { $facet: {
          leetcodeRank: [
            { $match: { 'platformVerification.leetcode.isVerified': true, calculatedLeetcodeScore: { $gt: leetcodeScore } } },
            { $count: 'count' }
          ],
          codeforcesRank: [
            { $match: { 'platformVerification.codeforces.isVerified': true, calculatedCodeforcesRating: { $gt: cfRating } } },
            { $count: 'count' }
          ],
          totalRank: [
            { $match: {
                $or: [
                  { 'platformVerification.codeforces.isVerified': true },
                  { 'platformVerification.leetcode.isVerified': true }
                ],
                calculatedTotalScore: { $gt: totalScore }
            } },
            { $count: 'count' }
          ]
      }}
    ]);

    const leetcodeRank = ranks[0].leetcodeRank[0]?.count || 0;
    const codeforcesRank = ranks[0].codeforcesRank[0]?.count || 0;
    const totalRank = ranks[0].totalRank[0]?.count || 0;

    const responseData = {
      user: {
        name: user.name,
        email: user.email,
        branch: user.branch
      },
      rankings: {
        leetcode: leetcodeRank + 1,
        codeforces: codeforcesRank + 1,
        total: totalRank + 1
      },
      scores: {
        leetcode: Math.round(leetcodeScore),
        codeforces: cfRating,
        total: Math.round(totalScore)
      }
    };

    cacheService.set(cacheKey, responseData, 60);

    res.json(responseData);
  } catch (error) {
    console.error('Error getting user ranking:', error);
    res.status(500).json({ error: error.message });
  }
};

export {
  getUnifiedLeaderboard,
  getUserRanking
};
