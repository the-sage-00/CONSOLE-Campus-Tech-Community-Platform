import express from 'express';
import { getUnifiedLeaderboard, getUserRanking } from '../controller/leaderboardController.js';

const router = express.Router();

// Get unified leaderboard
router.get('/', getUnifiedLeaderboard);

// Get user rankings
router.get('/user/:userId/ranking', getUserRanking);

export default router;
