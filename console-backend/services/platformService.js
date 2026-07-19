import fetch from 'cross-fetch';
import { leetcodeQuery } from 'leetcode-query';

class PlatformService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Validate platform handle
  validateHandle(platform, handle) {
    if (!handle || typeof handle !== 'string') {
      return { valid: false, error: 'Handle must be a non-empty string' };
    }

    const trimmedHandle = handle.trim();
    if (trimmedHandle.length === 0) {
      return { valid: false, error: 'Handle cannot be empty' };
    }

    // Platform-specific validation
    switch (platform) {
    case 'leetcode':
      if (trimmedHandle.length < 3 || trimmedHandle.length > 20) {
        return { valid: false, error: 'LeetCode handle must be 3-20 characters' };
      }
        
      break;

    case 'codeforces':
      if (trimmedHandle.length < 3 || trimmedHandle.length > 24) {
        return { valid: false, error: 'CodeForces handle must be 3-24 characters' };
      }
        
      break;



    default:
      return { valid: false, error: 'Unsupported platform' };
    }

    return { valid: true, handle: trimmedHandle };
  }

  // Fetch LeetCode data
  async fetchLeetCodeData(handle) {
    try {
      const cacheKey = `leetcode_${handle}`;
      const cached = this.cache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }

      const data = await leetcodeQuery(handle);
      
      const result = {
        username: data.username,
        ranking: data.ranking || 0,
        totalSolved: data.totalSolved || 0,
        easySolved: data.easySolved || 0,
        mediumSolved: data.mediumSolved || 0,
        hardSolved: data.hardSolved || 0,
        reputation: data.reputation || 0,
        aboutMe: data.aboutMe || '',
        realName: data.realName || '',
      };

      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
      });

      return result;
    } catch (error) {
      console.error('Error fetching LeetCode data:', error);
      throw new Error('Failed to fetch LeetCode data');
    }
  }

  // Fetch CodeForces data
  async fetchCodeForcesData(handle) {
    try {
      const cacheKey = `codeforces_${handle}`;
      const cached = this.cache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }

      const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
      const data = await response.json();

      if (data.status !== 'OK' || !data.result || !data.result[0]) {
        throw new Error('User not found');
      }

      const user = data.result[0];
      
      // Fetch problems solved count from user.status API
      let problemsSolved = 0;
      try {
        const statusUrl = `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`;
        
        // Use Promise.race for timeout compatibility
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 30000),
        );
        
        const fetchPromise = fetch(statusUrl);
        const statusResponse = await Promise.race([fetchPromise, timeoutPromise]);
        
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
          }
        }
      } catch (statusError) {
        console.error('Error fetching problems solved count:', statusError.message);
        // Continue without problems solved count
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

      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
      });

      return result;
    } catch (error) {
      console.error('Error fetching CodeForces data:', error);
      throw new Error('Failed to fetch CodeForces data');
    }
  }



  // Fetch all platform data for a user
  async fetchAllPlatformData(user) {
    const updates = {};
    const errors = [];

    if (user.platforms?.leetcode?.handle) {
      try {
        const data = await this.fetchLeetCodeData(user.platforms.leetcode.handle);
        updates['platforms.leetcode'] = {
          ...user.platforms.leetcode,
          ...data,
          lastUpdated: new Date(),
        };
      } catch (error) {
        errors.push(`LeetCode: ${error.message}`);
      }
    }

    if (user.platforms?.codeforces?.handle) {
      try {
        const data = await this.fetchCodeForcesData(user.platforms.codeforces.handle);
        updates['platforms.codeforces'] = {
          ...user.platforms.codeforces,
          ...data,
          lastUpdated: new Date(),
        };
      } catch (error) {
        errors.push(`CodeForces: ${error.message}`);
      }
    }



    if (errors.length > 0) {
      console.warn('Some platform data fetch errors:', errors);
    }

    return updates;
  }

  // Batch update users
  async batchUpdateUsers(users) {
    const results = [];
    
    for (const user of users) {
      try {
        const updates = await this.fetchAllPlatformData(user);
        if (Object.keys(updates).length > 0) {
          results.push({
            userId: user._id,
            updates,
            success: true,
          });
        }
      } catch (error) {
        results.push({
          userId: user._id,
          error: error.message,
          success: false,
        });
      }
    }

    return results;
  }
}

export default new PlatformService();
