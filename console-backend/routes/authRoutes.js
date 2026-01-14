import express from 'express';
import { register, login, verifyEmail, resendVerificationEmail, getProfile, updateProfile, validatePlatformHandle, submitPlatformHandle, verifyPlatformHandle, refreshPlatformData, debugPlatformProfile } from '../controller/authController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);

// Protected routes
router.get('/profile', userAuth, getProfile);
router.put('/profile', userAuth, updateProfile);
router.post('/platform/validate', userAuth, validatePlatformHandle);
router.post('/platform/submit', userAuth, submitPlatformHandle);
router.post('/platform/verify', userAuth, verifyPlatformHandle);
router.post('/platform/refresh', userAuth, refreshPlatformData);

// Debug route (for development)
router.get('/platform/:platform/debug', userAuth, debugPlatformProfile);

export default router;
