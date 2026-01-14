import express from 'express';
import { getUserData, getUserStats } from '../controller/cfController.js';

const router = express.Router();

router.get('/user/:username', getUserData);
router.get('/stats/:username', getUserStats);

export default router;
