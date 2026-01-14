import express from 'express';
import { syncLeetcodeContests, syncCodeforcesContests, getContests, getRecentContest, getUserContestHistory, getContestLeaderboard } from '../controller/contestController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Get all contests (admin only)
router.get('/', adminAuth, getContests);

// Get the most recent contest data (public)
router.get('/recent', getRecentContest);

// Get leaderboard for a specific contest
router.get('/:contestId/leaderboard', getContestLeaderboard);

// Get user contest history (admin only)
router.get('/user/:userId/history', adminAuth, getUserContestHistory);

// Trigger contest sync for all verified LeetCode users (admin only)
router.post('/sync/leetcode', adminAuth, syncLeetcodeContests);

// Trigger contest sync for all verified Codeforces users (admin only)
router.post('/sync/codeforces', adminAuth, syncCodeforcesContests);

export default router;
