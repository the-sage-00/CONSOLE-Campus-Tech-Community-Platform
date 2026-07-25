import express from 'express';
import { getUnifiedLeaderboard } from '../controller/leaderboardController.js';

const router = express.Router();

// Get leaderboard
router.get('/', getUnifiedLeaderboard);

export default router;
