import User from '../models/User.js';
import Contest from '../models/Contest.js';
import { LeetCode } from 'leetcode-query';

const leetcode = new LeetCode();

// Get the last weekend (Sat & Sun) whose results are declared
// This matches the working script logic exactly
function getTrackableWeekend() {
  const today = new Date();
  const day = today.getDay(); // Sunday=0, Monday=1,...Saturday=6

  // Find last Thursday (or today if today is Thursday)
  // Formula: (day + 3) % 7 gives days to subtract to get to last Thursday
  const lastThu = new Date(today);
  lastThu.setDate(today.getDate() - ((day + 3) % 7)); // last Thursday

  // Last Saturday & Sunday whose results are declared
  // These are 5 and 4 days before last Thursday respectively
  const lastSat = new Date(lastThu);
  lastSat.setDate(lastThu.getDate() - 5); // Saturday (5 days before Thursday)
  lastSat.setHours(0, 0, 0, 0); // Reset time to start of day

  const lastSun = new Date(lastThu);
  lastSun.setDate(lastThu.getDate() - 4); // Sunday (4 days before Thursday)
  lastSun.setHours(0, 0, 0, 0); // Reset time to start of day

  return { lastSat, lastSun };
}

// Get all contests for the admin dashboard
export const getContests = async (req, res) => {
  try {
    const contests = await Contest.find()
      .sort({ date: -1 })
      .populate('participants.user', 'name'); // Populate user's name

    res.status(200).json({ contests });
  } catch (error) {
    console.error('Error fetching contests:', error);
    res.status(500).json({ error: error.message });
  }
};

export const syncLeetcodeContests = async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Access denied. Admin privileges required.' });
  }

  try {
    const leetcodeUsers = await User.find({
      'platformVerification.leetcode.isVerified': true,
      'platformVerification.leetcode.handle': { $nin: [null, ''] },
    }).select('platformVerification.leetcode name');

    if (leetcodeUsers.length === 0) {
      return res
        .status(200)
        .json({ message: 'No verified LeetCode users found to sync.' });
    }

    // Get trackable weekend (last Saturday & Sunday before last Thursday)
    const { lastSat, lastSun } = getTrackableWeekend();

    console.log(
      `📅 Tracking contests from: ${lastSat.toDateString()} (Sat) & ${lastSun.toDateString()} (Sun)`,
    );

    const MAX_HISTORY = 5;
    let participatedCount = 0;
    const errors = [];
    const contestParticipantsMap = new Map(); // contestName -> { date, participants: [] }
    const userHistoryMap = new Map(); // userId -> { user, fullHistory, weekendContest }

    console.log(`📊 Processing ${leetcodeUsers.length} verified LeetCode users...`);

    // Process each user using GraphQL API
    for (const user of leetcodeUsers) {
      try {
        const handle = user.platformVerification.leetcode.handle;

        // Use GraphQL API for accurate data - fetch full history once
        const res = await leetcode.graphql({
          query: `
            query userContestRankingHistory($username: String!) {
              userContestRankingHistory(username: $username) {
                contest { title startTime }
                attended
                ranking
                rating
              }
            }
          `,
          variables: { username: handle },
        });

        const history = res?.data?.userContestRankingHistory || [];

        // Store full history for later stats update
        userHistoryMap.set(user._id.toString(), {
          user: user,
          fullHistory: history,
        });

        // Filter contests that were held on the trackable weekend
        // Use exact date string matching like the working script
        const latestWeekendContest = history
          .filter((c) => {
            if (!c.contest || !c.attended) return false;
            const contestDate = new Date(c.contest.startTime * 1000);
            // Use exact date string matching (ignores time component)
            return (
              contestDate.toDateString() === lastSat.toDateString() ||
              contestDate.toDateString() === lastSun.toDateString()
            );
          })
          .sort((a, b) => b.contest.startTime - a.contest.startTime)[0];

        if (latestWeekendContest) {
          const contestTitle = latestWeekendContest.contest.title;
          const contestStartTime = new Date(latestWeekendContest.contest.startTime * 1000);

          // Group participants by contest name
          if (!contestParticipantsMap.has(contestTitle)) {
            contestParticipantsMap.set(contestTitle, {
              date: contestStartTime,
              participants: [],
            });
          }

          const participantData = {
            user: user._id,
            rating: Number(latestWeekendContest.rating) || 0,
            ranking: Number(latestWeekendContest.ranking) || 0,
          };

          contestParticipantsMap.get(contestTitle).participants.push(participantData);
          
          // Store weekend contest info for this user
          userHistoryMap.get(user._id.toString()).weekendContest = latestWeekendContest;
          participatedCount++;

          console.log(
            `✅ ${handle} participated: ${contestTitle} (Rank: ${latestWeekendContest.ranking}, Rating: ${latestWeekendContest.rating})`,
          );
        } else {
          console.log(`❌ ${handle} did NOT participate in trackable weekend`);
        }
      } catch (innerErr) {
        console.error(
          `❌ Error syncing contest for user ${user.name}:`,
          innerErr.message,
        );
        errors.push({
          user: user.name,
          handle: user.platformVerification.leetcode.handle,
          error: innerErr.message,
        });
      }
    }

    // Determine which contest to use (prefer the one with most participants, then most recent)
    let mainContest = null;
    let mainContestName = null;
    let mainContestDate = null;
    let mainParticipantsData = [];

    if (contestParticipantsMap.size > 0) {
      // Sort contests by participant count (descending), then by date (descending)
      const sortedContests = Array.from(contestParticipantsMap.entries())
        .sort((a, b) => {
          const countDiff = b[1].participants.length - a[1].participants.length;
          if (countDiff !== 0) return countDiff;
          return b[1].date - a[1].date; // Most recent if same count
        });

      mainContest = sortedContests[0];
      mainContestName = mainContest[0];
      mainContestDate = mainContest[1].date;
      mainParticipantsData = mainContest[1].participants;

      console.log(`📊 Selected contest "${mainContestName}" with ${mainParticipantsData.length} participants`);
      
      if (sortedContests.length > 1) {
        console.log(`⚠️ Note: ${sortedContests.length - 1} other contest(s) found in the weekend, using the one with most participants`);
      }
    }

    // Update user contest stats (using already fetched history)
    for (const [_userId, { user, fullHistory, weekendContest }] of userHistoryMap) {
      try {
        // Update user's rolling contest history (store last 5)
        const allContests = (fullHistory || [])
          .filter((h) => h.contest && h.attended)
          .sort((a, b) => b.contest.startTime - a.contest.startTime)
          .slice(0, MAX_HISTORY)
          .map((h) => ({
            contestName: h.contest.title,
            contestSlug: '',
            date: new Date(h.contest.startTime * 1000),
            participated: h.attended,
            rank: h.ranking || null,
            rating: h.rating || null,
          }));

        // Calculate total contests
        const totalContests = (fullHistory || []).filter((h) => h.attended).length;

        user.platformVerification.leetcode.contestStats = {
          totalContests,
          recentContests: allContests,
          lastContestFetch: new Date(),
          lastContestName: mainContestName || '',
          lastContestParticipated: !!weekendContest,
        };
        user.platformVerification.leetcode.lastSync = new Date();

        await user.save();
      } catch (updateErr) {
        console.error(`⚠️ Error updating stats for user ${user.name}:`, updateErr.message);
      }
    }

    // Create/update Contest document if we have participants
    if (mainContestName && mainParticipantsData.length > 0) {
      let contestDoc = await Contest.findOne({ 
        name: mainContestName,
        platform: 'leetcode',
      });

      if (!contestDoc) {
        contestDoc = new Contest({
          name: mainContestName,
          platform: 'leetcode',
          date: mainContestDate,
          participants: mainParticipantsData,
          syncedAt: new Date(),
        });
      } else {
        contestDoc.date = mainContestDate;
        contestDoc.participants = mainParticipantsData;
        contestDoc.syncedAt = new Date();
      }

      await contestDoc.save();

      console.log(
        `✅ Contest "${mainContestName}" synced with ${mainParticipantsData.length} participants`,
      );
    } else {
      console.log('⚠️ No participants found in trackable weekend contests');
    }

    // Response
    res.status(200).json({
      message:
        participatedCount > 0
          ? 'LeetCode contest sync completed successfully.'
          : 'Contest sync complete but no campus participants found in trackable weekend.',
      finalizedContest: mainContestName || 'None',
      weekendTracked: `${lastSat.toDateString()} (Sat) & ${lastSun.toDateString()} (Sun)`,
      participants: mainParticipantsData.length || 0,
      totalUsersProcessed: leetcodeUsers.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('❌ Error during LeetCode contest sync:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getRecentContest = async (req, res) => {
  try {
    const platform = req.query.platform || 'leetcode'; // Default to leetcode for backward compatibility
    
    // Use Contest collection as the source of truth for the latest finalized contest with participants
    // Filter by platform and prefer contests with participants
    let latest = await Contest.find({ 
      platform: platform,
      'participants.0': { $exists: true }, 
    })
      .sort({ date: -1 })
      .limit(1)
      .populate(
        'participants.user',
        platform === 'leetcode' 
          ? 'name branch platformVerification.leetcode.handle'
          : 'name branch platformVerification.codeforces.handle',
      );

    if (!latest || latest.length === 0) {
      latest = await Contest.find({ platform: platform })
        .sort({ date: -1 })
        .limit(1)
        .populate(
          'participants.user',
          platform === 'leetcode' 
            ? 'name branch platformVerification.leetcode.handle'
            : 'name branch platformVerification.codeforces.handle',
        );
    }

    if (!latest || latest.length === 0) {
      return res.status(200).json({
        contestId: null,
        contestName: null,
        date: null,
        platform: platform,
        participantsCount: 0,
        participants: [],
        message: `No finalized ${platform} contest available yet.`,
      });
    }

    const contest = latest[0];
    const participants = (contest.participants || []).map((p) => ({
      userId: p.user._id,
      name: p.user.name,
      branch: p.user.branch,
      handle: platform === 'leetcode' 
        ? (p.user.platformVerification?.leetcode?.handle || '')
        : (p.user.platformVerification?.codeforces?.handle || ''),
      ranking: p.ranking,
      rating: p.rating,
      problemsSolved: p.problemsSolved || 0,
      oldRating: p.oldRating || 0,
      newRating: p.newRating || 0,
    }));

    res.status(200).json({
      _id: contest._id,
      contestName: contest.name,
      date: contest.date,
      platform: contest.platform,
      contestId: contest.contestId || null, // Codeforces contest ID
      participantsCount: participants.length,
      participants,
    });
  } catch (error) {
    console.error('Error fetching recent contest data:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserContestHistory = async (req, res) => {
  try {
    const _userId = req.params.userId;
    const user = await User.findById(_userId).select(
      'platformVerification.leetcode.contestStats name',
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const contestStats = user.platformVerification?.leetcode?.contestStats || {
      totalContests: 0,
      recentContests: [],
    };

    res.status(200).json({
      totalContests: contestStats.totalContests || 0,
      recentContests: contestStats.recentContests || [],
    });
  } catch (error) {
    console.error(
      `Error fetching user ${req.params.userId} contest history:`,
      error,
    );
    res.status(500).json({ error: error.message });
  }
};

export const getNonParticipants = async (req, res) => {
  // Admin authentication/authorization
  if (!req.user || req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Access denied. Admin privileges required.' });
  }

  try {
    // Get latest contest with participants (finalized) from Contest collection
    const latest = await Contest.find().sort({ date: -1 }).limit(1);
    if (!latest || latest.length === 0) {
      return res.status(404).json({
        message:
          'No recent contest data available to determine non-participants.',
      });
    }
    const recentContestName = latest[0].name;

    const allVerified = await User.find({
      'platformVerification.leetcode.isVerified': true,
      'platformVerification.leetcode.handle': { $nin: [null, ''] },
    }).select(
      'name email branch platformVerification.leetcode.handle platformVerification.leetcode.contestStats',
    );

    const participantsSet = new Set(
      (latest[0].participants || []).map((p) => String(p.user)),
    );

    const nonParticipants = allVerified.filter(
      (u) => !participantsSet.has(String(u._id)),
    );

    res.status(200).json({
      recentContest: recentContestName,
      nonParticipants: nonParticipants.map((user) => ({
        name: user.name,
        email: user.email,
        branch: user.branch,
        leetcodeHandle: user.platformVerification.leetcode.handle,
      })),
    });
  } catch (error) {
    console.error('Error fetching non-participants:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get leaderboard for a specific contest by id
export const getContestLeaderboard = async (req, res) => {
  try {
    const { contestId } = req.params;
    const contest = await Contest.findById(contestId).populate(
      'participants.user',
      'name branch platformVerification.leetcode.handle platformVerification.codeforces.handle',
    );
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }

    const participants = (contest.participants || []).map((p) => ({
      userId: p.user._id,
      name: p.user.name,
      branch: p.user.branch,
      handle: contest.platform === 'leetcode'
        ? (p.user.platformVerification?.leetcode?.handle || '')
        : (p.user.platformVerification?.codeforces?.handle || ''),
      ranking: p.ranking,
      rating: p.rating,
      problemsSolved: p.problemsSolved || 0,
      oldRating: p.oldRating || 0,
      newRating: p.newRating || 0,
    }));

    res.status(200).json({
      _id: contest._id,
      contestName: contest.name,
      date: contest.date,
      platform: contest.platform,
      contestId: contest.contestId || null,
      participantsCount: participants.length,
      participants,
    });
  } catch (error) {
    console.error('Error fetching contest leaderboard:', error);
    res.status(500).json({ error: error.message });
  }
};

// Sync Codeforces contests for all verified Codeforces users
export const syncCodeforcesContests = async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Access denied. Admin privileges required.' });
  }

  try {
    const codeforcesUsers = await User.find({
      'platformVerification.codeforces.isVerified': true,
      'platformVerification.codeforces.handle': { $nin: [null, ''] },
    }).select('platformVerification.codeforces name');

    if (codeforcesUsers.length === 0) {
      return res
        .status(200)
        .json({ message: 'No verified Codeforces users found to sync.' });
    }

    console.log(`📊 Found ${codeforcesUsers.length} verified Codeforces users`);

    // Step 1: Get the latest finished contest from Codeforces API
    console.log('🔍 Fetching latest finished contest from Codeforces...');
    const contestListUrl = 'https://codeforces.com/api/contest.list?gym=false';
    const contestListResponse = await fetch(contestListUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!contestListResponse.ok) {
      throw new Error(`Failed to fetch contest list: ${contestListResponse.status}`);
    }

    const contestListData = await contestListResponse.json();
    
    if (contestListData.status !== 'OK' || !contestListData.result || contestListData.result.length === 0) {
      throw new Error('No contests found in Codeforces API');
    }

    // Find the first contest with phase = "FINISHED" (contests are sorted by start time descending)
    const latestFinishedContest = contestListData.result.find(
      contest => contest.phase === 'FINISHED',
    );

    if (!latestFinishedContest) {
      throw new Error('No finished contests found in Codeforces API');
    }

    const latestContestId = latestFinishedContest.id;
    const latestContestName = latestFinishedContest.name;
    const latestContestDate = new Date(latestFinishedContest.startTimeSeconds * 1000);

    console.log(`✅ Latest finished contest found: ${latestContestName} (ID: ${latestContestId})`);
    console.log(`📅 Contest date: ${latestContestDate.toLocaleString()}`);
    console.log(`📊 Contest phase: ${latestFinishedContest.phase}`);

    // Step 2: Check each user's most recent contest and match with latest contest ID
    const participantsData = [];
    const errors = [];
    let participatedCount = 0;

    console.log(`🔍 Checking ${codeforcesUsers.length} users for participation...`);

    for (const user of codeforcesUsers) {
      try {
        const handle = user.platformVerification.codeforces.handle;
        
        // Fetch user rating history
        const ratingUrl = `https://codeforces.com/api/user.rating?handle=${handle}`;
        const ratingResponse = await fetch(ratingUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        });

        if (!ratingResponse.ok) {
          throw new Error(`API returned status ${ratingResponse.status}`);
        }

        const ratingData = await ratingResponse.json();
        
        if (ratingData.status !== 'OK' || !ratingData.result || ratingData.result.length === 0) {
          console.log(`❌ ${handle} has no contest history`);
          continue;
        }

        // Get the most recent contest (index 0 - last element in array)
        const userLatestContest = ratingData.result[ratingData.result.length - 1];
        const userLatestContestId = userLatestContest.contestId;

        // Match contest IDs
        if (userLatestContestId === latestContestId) {
          // User participated in the latest contest!
          participantsData.push({
            userId: user._id,
            handle: handle,
            rank: userLatestContest.rank,
            oldRating: userLatestContest.oldRating || 0,
            newRating: userLatestContest.newRating || 0,
            rating: userLatestContest.newRating || userLatestContest.oldRating || 0,
            problemsSolved: 0, // Will be updated from standings
          });

          participatedCount++;
          console.log(
            `✅ ${handle} participated in latest contest (Rank: ${userLatestContest.rank}, Rating: ${userLatestContest.newRating || userLatestContest.oldRating})`,
          );
        } else {
          console.log(
            `❌ ${handle} did NOT participate in latest contest. Their latest: ${userLatestContestId}, Latest contest: ${latestContestId}`,
          );
        }
      } catch (innerErr) {
        console.error(`❌ Error syncing contest for user ${user.name}:`, innerErr.message);
        errors.push({
          user: user.name,
          handle: user.platformVerification.codeforces.handle,
          error: innerErr.message,
        });
      }
    }

    // Step 3: Fetch standings for the latest contest to get problems solved
    if (participatedCount > 0) {
      console.log(`📊 Fetching standings for contest ${latestContestId}...`);
      try {
        const handlesString = participantsData.map(p => p.handle).join(';');
        const standingsUrl = `https://codeforces.com/api/contest.standings?contestId=${latestContestId}&handles=${handlesString}&showUnofficial=false`;
        
        const standingsResponse = await fetch(standingsUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        });

        if (standingsResponse.ok) {
          const standingsData = await standingsResponse.json();
          
          if (standingsData.status === 'OK' && standingsData.result && standingsData.result.rows) {
            // Create a map of handle -> problems solved
            const problemsMap = new Map();
            standingsData.result.rows.forEach(row => {
              const handle = row.party.members[0]?.handle;
              if (handle) {
                // Count solved problems (problems with points > 0)
                const solved = row.problemResults.filter(p => p.points > 0).length;
                problemsMap.set(handle, solved);
              }
            });

            // Update participants with problems solved
            participantsData.forEach(p => {
              p.problemsSolved = problemsMap.get(p.handle) || 0;
            });

            console.log(`✅ Fetched problems solved data for ${participantsData.length} participants`);
          }
        }
      } catch (standingsErr) {
        console.error('⚠️ Error fetching standings:', standingsErr.message);
        // Continue without problems solved data
      }

      // Map to final participantsData format
      const finalParticipantsData = participantsData.map(p => ({
        user: p.userId,
        ranking: p.rank,
        rating: p.rating,
        problemsSolved: p.problemsSolved,
        oldRating: p.oldRating,
        newRating: p.newRating,
      }));

      // Step 4: Create/update Contest document
      let contestDoc = await Contest.findOne({ 
        name: latestContestName,
        platform: 'codeforces',
      });

      if (!contestDoc) {
        contestDoc = new Contest({
          name: latestContestName,
          platform: 'codeforces',
          contestId: latestContestId,
          date: latestContestDate,
          participants: finalParticipantsData,
          syncedAt: new Date(),
        });
      } else {
        contestDoc.date = latestContestDate;
        contestDoc.contestId = latestContestId;
        contestDoc.participants = finalParticipantsData;
        contestDoc.syncedAt = new Date();
      }

      await contestDoc.save();

      console.log(
        `✅ Codeforces contest "${latestContestName}" synced with ${participatedCount} participants`,
      );

      // Response
      res.status(200).json({
        message: 'Codeforces contest sync completed successfully.',
        finalizedContest: latestContestName,
        contestId: latestContestId,
        contestDate: latestContestDate,
        participants: participatedCount,
        totalUsersChecked: codeforcesUsers.length,
        errors: errors.length > 0 ? errors : undefined,
      });
    } else {
      console.log(`⚠️ No users participated in the latest contest (ID: ${latestContestId})`);
      res.status(200).json({
        message: 'Contest sync complete but no campus participants found in the latest contest.',
        finalizedContest: latestContestName,
        contestId: latestContestId,
        contestDate: latestContestDate,
        participants: 0,
        totalUsersChecked: codeforcesUsers.length,
        errors: errors.length > 0 ? errors : undefined,
      });
    }
  } catch (error) {
    console.error('❌ Error during Codeforces contest sync:', error);
    res.status(500).json({ error: error.message });
  }
};
