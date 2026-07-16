import express from 'express';
import { 
  adminLogin, 
  getAllUsers, 
  refreshUserData, 
  getDashboardStats,
  deleteUser,
  getParticipationStats,
  refreshAllUsersData,
} from '../controller/adminController.js';
import { getNonParticipants } from '../controller/contestController.js';
import _userAuth from '../middleware/userAuth.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Admin login (no auth required)
router.post('/login', adminLogin);

// Admin dashboard stats
router.get('/stats', adminAuth, getDashboardStats);

// Get all users
router.get('/users', adminAuth, getAllUsers);

// Refresh all users data
router.post('/users/refresh-all', adminAuth, refreshAllUsersData);

// Refresh user data
router.post('/users/:userId/refresh', adminAuth, refreshUserData);

// Delete user
router.delete('/users/:userId', adminAuth, deleteUser);

// Get non-participants for the latest contest (admin only)
router.get('/nonParticipants', adminAuth, getNonParticipants);

// Get detailed participation statistics
router.get('/participation-stats', adminAuth, getParticipationStats);

export default router;
