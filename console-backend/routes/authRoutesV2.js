import express from 'express';
import { 
  register, 
  login, 
  verifyEmail, 
  resendVerificationEmail, 
  getPendingStatus,
  cleanupExpired
} from '../controller/authControllerV2.js';

// Importing the platform and profile methods from the original controller
import { 
  getProfile, 
  updateProfile, 
  validatePlatformHandle, 
  submitPlatformHandle, 
  verifyPlatformHandle, 
  refreshPlatformData, 
  debugPlatformProfile 
} from '../controller/authController.js';

import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Public routes - improved auth flow
router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);
router.get('/pending-status', getPendingStatus);

// Maintenance routes
router.post('/cleanup', cleanupExpired);

// System stats endpoint
router.get('/stats', async (req, res) => {
  try {
    const CleanupService = (await import('../utils/cleanupService.js')).default;
    const stats = await CleanupService.getStats();
    res.json({
      message: 'Verification system stats',
      data: stats
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

// Protected routes - reusing from the original controller
router.get('/profile', userAuth, getProfile);
router.put('/profile', userAuth, updateProfile);
router.post('/platform/validate', userAuth, validatePlatformHandle);
router.post('/platform/submit', userAuth, submitPlatformHandle);
router.post('/platform/verify', userAuth, verifyPlatformHandle);
router.post('/platform/refresh', userAuth, refreshPlatformData);

// Debug route (for development)
router.get('/platform/:platform/debug', userAuth, debugPlatformProfile);

export default router;
