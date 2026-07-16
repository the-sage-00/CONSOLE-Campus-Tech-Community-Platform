import express from 'express';

// Import Google Auth controller (main authentication method)
import { googleAuthCallback } from '../controller/googleAuthController.js';

// Import platform and profile methods from the original controller
import {
  getProfile,
  updateProfile,
  validatePlatformHandle,
  submitPlatformHandle,
  verifyPlatformHandle,
  refreshPlatformData,
  deletePlatformHandle,
  debugPlatformProfile,
} from '../controller/authController.js';

import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// ============= AUTHENTICATION ROUTES =============

// Google OAuth - Primary authentication method
// This handles both LOGIN and REGISTRATION
router.post('/callback', googleAuthCallback);

// ============= PROFILE ROUTES (Protected) =============
router.get('/profile', userAuth, getProfile);
router.put('/profile', userAuth, updateProfile);

// ============= PLATFORM ROUTES (Protected) =============
router.post('/platform/validate', userAuth, validatePlatformHandle);
router.post('/platform/submit', userAuth, submitPlatformHandle);
router.post('/platform/verify', userAuth, verifyPlatformHandle);
router.post('/platform/refresh', userAuth, refreshPlatformData);
router.post('/platform/delete', userAuth, deletePlatformHandle);

// Debug route (for development)
router.get('/platform/:platform/debug', userAuth, debugPlatformProfile);

// ============= UTILITY ROUTES =============

// Health check for auth service
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Auth service is running',
    authMethod: 'Google OAuth only',
    timestamp: new Date().toISOString(),
  });
});

export default router;
