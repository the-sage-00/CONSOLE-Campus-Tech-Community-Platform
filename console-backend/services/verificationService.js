import axios from 'axios';

class VerificationService {
  constructor() {
    this.axiosConfig = {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    };
  }

  // Generate verification code for platform (matching test.js and test2.js)
  generateVerificationCode(platform) {
    switch (platform) {
    case 'codeforces': {
      // Use a set of well-known existing problems to avoid verification failures
      const knownProblems = ['1A', '4A', '71A', '158A', '231A', '339A'];
      const idx = Math.floor(Math.random() * knownProblems.length);
      return knownProblems[idx];
    }
    case 'leetcode': {
      // Generate a readable code like console-1234
      const num = Math.floor(Math.random() * 9000) + 1000;
      return `console-${num}`;
    }
    default:
      throw new Error('Unsupported platform');
    }
  }

  // Verify LeetCode profile using About Me section (matching test2.js)
  async verifyLeetCodeProfile(username, verificationCode) {
    try {
      console.log('🔍 === LEETCODE VERIFICATION START ===');
      console.log(`Username: ${username}`);
      console.log(`Verification Code: ${verificationCode}`);
      console.log(`Code length: ${verificationCode.length}`);

      // Escape username to prevent injection
      const escapedUsername = username.replace(/"/g, '\\"');

      const query = {
        query: `
        {
          matchedUser(username: "${escapedUsername}") {
            profile {
              aboutMe
              realName
            }
          }
        }
        `,
      };

      console.log('📡 Making GraphQL request...');
      const response = await axios.post('https://leetcode.com/graphql', query, {
        ...this.axiosConfig,
        headers: {
          ...this.axiosConfig.headers,
          'Content-Type': 'application/json',
          'Referer': 'https://leetcode.com/',
          'Origin': 'https://leetcode.com',
          'Accept': 'application/json',
        },
      });

      console.log(`📊 GraphQL Response Status: ${response.status}`);

      if (response.status === 200 && response.data?.data?.matchedUser) {
        const profile = response.data.data.matchedUser.profile || {};
        const aboutMe = profile.aboutMe || '';
        const realName = profile.realName || '';

        console.log('📋 Profile data received:');
        console.log(`  - About Me: "${aboutMe}"`);
        console.log(`  - About Me length: ${aboutMe.length} characters`);
        console.log(`  - Real Name: "${realName}"`);
        console.log(`  - Real Name length: ${realName.length} characters`);

        // Check both fields for verification code - EXACT MATCH ONLY
        const aboutMeContainsCode = aboutMe.includes(verificationCode);
        const realNameContainsCode = realName.includes(verificationCode);

        console.log('🔍 Verification checks:');
        console.log(`  - About Me contains "${verificationCode}": ${aboutMeContainsCode}`);
        console.log(`  - Real Name contains "${verificationCode}": ${realNameContainsCode}`);

        // IMPORTANT: Only exact matches count - no partial matches allowed
        const isVerified = aboutMeContainsCode || realNameContainsCode;

        if (isVerified) {
          console.log('✅ VERIFICATION SUCCESS: Exact code match found!');
        } else {
          console.log('❌ VERIFICATION FAILED: No exact code match found');
          console.log(`💡 User needs to add the exact verification code: "${verificationCode}"`);
        }

        console.log(`🎯 FINAL VERIFICATION RESULT: ${isVerified}`);
        console.log('🔍 === LEETCODE VERIFICATION END ===');

        return isVerified;
      } else {
        console.log('❌ GraphQL response structure invalid:');
        console.log(`  - Status: ${response.status}`);
        console.log(`  - Has data: ${!!response.data}`);
        console.log(`  - Has matchedUser: ${!!response.data?.data?.matchedUser}`);
        console.log('🔍 === LEETCODE VERIFICATION END (FAILED) ===');
        return false;
      }
    } catch (error) {
      console.error(`❌ LeetCode verification error for ${username}:`, error.message);
      console.error('❌ Error details:', error.response?.data || error.stack);
      console.log('🔍 === LEETCODE VERIFICATION END (ERROR) ===');
      return false;
    }
  }

  // Verify Codeforces profile using submission checking (matching test.js)
  async verifyCodeforcesProfile(handle, verificationCode) {
    try {
      console.log('🔍 === CODEFORCES VERIFICATION START ===');
      console.log(`Handle: ${handle}`);
      console.log(`Verification Code: ${verificationCode}`);

      const encodedHandle = encodeURIComponent(handle);
      const apiUrl = `https://codeforces.com/api/user.status?handle=${encodedHandle}&count=20`;
      const response = await axios.get(apiUrl, {
        ...this.axiosConfig,
        headers: {
          ...this.axiosConfig.headers,
          'Accept': 'application/json',
        },
      });

      console.log(`📊 CodeForces API response status: ${response.status}`);

      if (response.status !== 200) {
        console.error(`❌ Codeforces API error: Status ${response.status}`);
        console.log('🔍 === CODEFORCES VERIFICATION END (API ERROR) ===');
        return false;
      }

      const data = response.data;

      // Check API status
      if (data.status !== 'OK') {
        console.error(`❌ CodeForces API status not OK: ${data.status}`);
        console.error(`❌ Comment: ${data.comment || 'Unknown error'}`);
        console.log('🔍 === CODEFORCES VERIFICATION END (API STATUS ERROR) ===');
        return false;
      }

      if (response.status === 200 && data?.result) {
        const submissions = data.result;
        console.log(`📊 Found ${submissions.length} recent submissions`);

        // Parse the target problem (e.g., "81C" -> contestId: 81, index: "C")
        const match = verificationCode.match(/^(\d+)([A-Z])$/);
        if (!match) {
          console.log('❌ Invalid problem format - must be like "42A"');
          console.log('🔍 === CODEFORCES VERIFICATION END (INVALID FORMAT) ===');
          return false;
        }

        const [, targetContestId, targetIndex] = match;
        console.log(`🎯 Looking for problem ${targetContestId}${targetIndex}`);

        // Check if any submission matches the verification problem
        let _foundSubmission = null;
        const matched = submissions.some(sub => {
          const subContestId = sub.problem.contestId;
          const subIndex = sub.problem.index;
          const isMatch = subContestId == targetContestId && subIndex == targetIndex;

          if (isMatch) {
            _foundSubmission = sub;
            console.log(`✅ Found matching submission: ${subContestId}${subIndex}`);
            console.log(`   Submission ID: ${sub.id}, Status: ${sub.verdict}, Time: ${new Date(sub.creationTimeSeconds * 1000).toISOString()}`);
          }

          return isMatch;
        });

        if (matched) {
          console.log('✅ VERIFICATION SUCCESS: Problem submission found!');
          console.log('🔍 === CODEFORCES VERIFICATION END (SUCCESS) ===');
        } else {
          console.log(`❌ VERIFICATION FAILED: No submission found for problem ${targetContestId}${targetIndex}`);
          console.log(`💡 User needs to submit a solution to problem ${targetContestId}${targetIndex}`);
          console.log('🔍 === CODEFORCES VERIFICATION END (FAILED) ===');
        }

        return matched;
      } else {
        console.log('❌ Codeforces API response structure invalid');
        console.log('🔍 === CODEFORCES VERIFICATION END (INVALID RESPONSE) ===');
        return false;
      }
    } catch (error) {
      console.error(`❌ Codeforces verification error for ${handle}:`, error.message);

      if (error.response) {
        console.error(`❌ Response status: ${error.response.status}`);
        console.error('❌ Response data:', error.response.data);
      } else if (error.request) {
        console.error('❌ No response received from CodeForces API');
      } else {
        console.error('❌ Error details:', error.stack);
      }

      console.log('🔍 === CODEFORCES VERIFICATION END (ERROR) ===');
      return false;
    }
  }

  // Main verification method
  async verifyProfile(platform, handle, verificationCode) {
    switch (platform) {
    case 'leetcode':
      return await this.verifyLeetCodeProfile(handle, verificationCode);

    case 'codeforces':
      return await this.verifyCodeforcesProfile(handle, verificationCode);

    default:
      throw new Error('Unsupported platform');
    }
  }

  // Get verification steps for platform
  getVerificationSteps(platform) {
    switch (platform) {
    case 'leetcode':
      return [
        '📝 Go to your LeetCode profile: https://leetcode.com/profile/',
        '✏ Click on "Edit Profile" button',
        '📋 In the "Summary" section, paste the verification code exactly as shown',
        '💾 Click "Save" to update your profile',
        '✅ Come back here and click "Verify" button (we will check automatically)',
        '🔄 After verification, you can change your About Me back to normal',
      ];

    case 'codeforces':
      return [
        '📝 Go to Codeforces problemset: https://codeforces.com/problemset',
        '🔍 Find the problem with the given code (e.g., if code is "42A", find problem 42A)',
        '💻 Submit any solution to that problem (even if it\'s wrong)',
        '⏳ Wait 2-3 minutes for the submission to be processed',
        '✅ Come back here and click "Verify" button (we will check automatically)',
        '🔄 After verification, you can delete the submission if you want',
      ];

    default:
      return ['Please follow the platform-specific instructions'];
    }
  }

  // Validate platform handle format
  validateHandle(platform, handle) {
    if (!handle || typeof handle !== 'string') {
      return { valid: false, error: 'Handle is required' };
    }

    const trimmedHandle = handle.trim();
    if (!trimmedHandle) {
      return { valid: false, error: 'Handle cannot be empty' };
    }

    // Reject whitespace anywhere in handle
    if (/\s/.test(trimmedHandle)) {
      return { valid: false, error: 'Usernames/handles cannot contain spaces' };
    }

    // Character rules per platform - now allowing all non-whitespace characters
    switch (platform) {
    case 'leetcode': {
      // Allow any non-whitespace characters; 1-50 chars
      // Removed strict alphanumeric restriction to allow dots, @, etc.
      if (trimmedHandle.length < 1 || trimmedHandle.length > 50) {
        return { valid: false, error: 'LeetCode username must be 1-50 characters' };
      }
      break;
    }
    case 'codeforces': {
      // Allow any non-whitespace characters; 1-50 chars
      // Removed strict alphanumeric restriction to allow dots, @, etc.
      if (trimmedHandle.length < 1 || trimmedHandle.length > 50) {
        return { valid: false, error: 'Codeforces handle must be 1-50 characters' };
      }
      break;
    }
    default:
      return { valid: false, error: 'Unsupported platform' };
    }

    return { valid: true, handle: trimmedHandle };
  }

  // Fetch platform user data
  async fetchPlatformUserData(platform, handle) {
    try {
      console.log(`Fetching real data for ${platform} user: ${handle}`);

      if (!platform || !handle) {
        console.error('Missing platform or handle');
        return { success: false, error: 'Platform and handle are required' };
      }

      switch (platform) {
      case 'leetcode':
        return await this.fetchLeetCodeData(handle);

      case 'codeforces':
        return await this.fetchCodeForcesData(handle);

      default:
        return { success: false, error: 'Unsupported platform' };
      }
    } catch (error) {
      console.error(`Error fetching ${platform} data:`, error);
      return { success: false, error: error.message };
    }
  }

  // Fetch LeetCode data using GraphQL
  async fetchLeetCodeData(username) {
    try {
      console.log(`🔍 Fetching LeetCode data for user: ${username}`);

      // Escape username to prevent injection
      const escapedUsername = username.replace(/"/g, '\\"');

      const query = {
        query: `
        {
          matchedUser(username: "${escapedUsername}") {
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

      console.log('📡 Making GraphQL request to LeetCode...');
      const response = await axios.post('https://leetcode.com/graphql', query, {
        ...this.axiosConfig,
        headers: {
          ...this.axiosConfig.headers,
          'Content-Type': 'application/json',
          'Referer': 'https://leetcode.com/',
          'Origin': 'https://leetcode.com',
          'Accept': 'application/json',
        },
      });

      console.log(`📊 LeetCode API response status: ${response.status}`);

      if (response.status !== 200) {
        console.error(`❌ LeetCode API error: Status ${response.status}`);
        return {
          success: false,
          error: `LeetCode API returned status ${response.status}. Please try again later.`,
        };
      }

      const data = response.data;
      console.log('📄 LeetCode GraphQL response:', JSON.stringify(data, null, 2));

      // Check for GraphQL errors
      if (data.errors && data.errors.length > 0) {
        console.error('❌ LeetCode GraphQL errors:', data.errors);
        const errorMessage = data.errors[0]?.message || 'Unknown GraphQL error';
        return {
          success: false,
          error: `LeetCode API error: ${errorMessage}. Please check your username.`,
        };
      }

      if (!data.data?.matchedUser) {
        console.error(`❌ User not found: ${username}`);
        return {
          success: false,
          error: 'User not found or profile is private. Please make sure your LeetCode profile exists and is public.',
        };
      }

      const user = data.data.matchedUser;
      const stats = user.submitStats?.acSubmissionNum || [];

      // Calculate totals
      const easySolved = stats.find(s => s.difficulty === 'Easy')?.count || 0;
      const mediumSolved = stats.find(s => s.difficulty === 'Medium')?.count || 0;
      const hardSolved = stats.find(s => s.difficulty === 'Hard')?.count || 0;
      const totalSolved = easySolved + mediumSolved + hardSolved;

      console.log(`✅ LeetCode data fetched successfully for ${username}`);
      console.log(`   Total Solved: ${totalSolved}, Ranking: ${user.profile?.ranking || 0}`);

      return {
        success: true,
        data: {
          username: user.username,
          ranking: user.profile?.ranking || 0,
          totalSolved,
          easySolved,
          mediumSolved,
          hardSolved,
          reputation: user.profile?.reputation || 0,
          aboutMe: user.profile?.aboutMe || '',
          realName: user.profile?.realName || '',
        },
      };
    } catch (error) {
      console.error('❌ LeetCode fetch error:', error);

      // Provide more detailed error messages
      if (error.response) {
        console.error(`❌ Response status: ${error.response.status}`);
        console.error('❌ Response data:', error.response.data);
        return {
          success: false,
          error: `LeetCode API error (${error.response.status}): ${error.response.data?.message || 'Failed to fetch data. Please check your username.'}`,
        };
      } else if (error.request) {
        console.error('❌ No response received from LeetCode API');
        return {
          success: false,
          error: 'Network error: Could not connect to LeetCode API. Please check your internet connection and try again.',
        };
      } else {
        console.error(`❌ Error setting up request: ${error.message}`);
        return {
          success: false,
          error: `Failed to fetch LeetCode data: ${error.message}. Please check your username.`,
        };
      }
    }
  }

  // Fetch CodeForces data using official API
  async fetchCodeForcesData(username) {
    try {
      console.log(`🔍 Fetching CodeForces data for user: ${username}`);

      // URL encode the username to handle special characters
      const encodedUsername = encodeURIComponent(username);
      const apiUrl = `https://codeforces.com/api/user.info?handles=${encodedUsername}`;

      console.log('📡 Making API request to CodeForces...');
      const response = await axios.get(apiUrl, {
        ...this.axiosConfig,
        headers: {
          ...this.axiosConfig.headers,
          'Accept': 'application/json',
        },
      });

      console.log(`📊 CodeForces API response status: ${response.status}`);

      if (response.status !== 200) {
        console.error(`❌ CodeForces API error: Status ${response.status}`);
        return {
          success: false,
          error: `CodeForces API returned status ${response.status}. Please try again later.`,
        };
      }

      const data = response.data;
      console.log('📄 CodeForces API response:', JSON.stringify(data, null, 2));

      // Check API status
      if (data.status !== 'OK') {
        console.error(`❌ CodeForces API status not OK: ${data.status}`);
        const comment = data.comment || 'Unknown error';
        return {
          success: false,
          error: `CodeForces API error: ${comment}. Please check your handle.`,
        };
      }

      if (!data.result || data.result.length === 0) {
        console.error(`❌ No user data found for: ${username}`);
        return {
          success: false,
          error: 'User not found. Please check your CodeForces handle and ensure it exists.',
        };
      }

      const user = data.result[0];

      // Fetch problems solved count from user.status API
      let problemsSolved = 0;
      try {
        console.log(`📊 Fetching problems solved count for ${username}...`);
        const statusUrl = `https://codeforces.com/api/user.status?handle=${encodedUsername}&from=1&count=10000`;
        const statusResponse = await axios.get(statusUrl, {
          ...this.axiosConfig,
          headers: {
            ...this.axiosConfig.headers,
            'Accept': 'application/json',
          },
          timeout: 30000, // 30 second timeout for status API
        });

        if (statusResponse.status === 200 && statusResponse.data.status === 'OK') {
          const submissions = statusResponse.data.result || [];
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
        } else {
          console.log('⚠️ Could not fetch problems solved count, using 0');
        }
      } catch (statusError) {
        console.error('⚠️ Error fetching problems solved count:', statusError.message);
        // Continue without problems solved count - don't fail the entire request
      }

      console.log(`✅ CodeForces data fetched successfully for ${username}`);
      console.log(`   Rating: ${user.rating || 'unrated'}, Rank: ${user.rank || 'unrated'}, Problems Solved: ${problemsSolved}`);

      return {
        success: true,
        data: {
          username: user.handle,
          rating: user.rating || 0,
          maxRating: user.maxRating || 0,
          rank: user.rank || 'unrated',
          contribution: user.contribution || 0,
          friendOfCount: user.friendOfCount || 0,
          registrationTime: user.registrationTimeSeconds || user.registrationTime || 0,
          lastOnlineTime: user.lastOnlineTimeSeconds || user.lastOnlineTime || 0,
          totalSolved: problemsSolved,
        },
      };
    } catch (error) {
      console.error('❌ CodeForces fetch error:', error);

      // Provide more detailed error messages
      if (error.response) {
        console.error(`❌ Response status: ${error.response.status}`);
        console.error('❌ Response data:', error.response.data);

        // Check if it's a CodeForces API error response
        if (error.response.data?.status === 'FAILED') {
          const comment = error.response.data.comment || 'Unknown error';
          return {
            success: false,
            error: `CodeForces API error: ${comment}. Please check your handle.`,
          };
        }

        return {
          success: false,
          error: `CodeForces API error (${error.response.status}): Failed to fetch data. Please check your handle.`,
        };
      } else if (error.request) {
        console.error('❌ No response received from CodeForces API');
        return {
          success: false,
          error: 'Network error: Could not connect to CodeForces API. Please check your internet connection and try again.',
        };
      } else {
        console.error(`❌ Error setting up request: ${error.message}`);
        return {
          success: false,
          error: `Failed to fetch CodeForces data: ${error.message}. Please check your handle.`,
        };
      }
    }
  }
}

export default new VerificationService();