import express from 'express';
import { submitReport, getAllReports } from '../controllers/reportController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/submit', authMiddleware, submitReport);  // ← protected
router.get('/all', getAllReports);                      // ← public, anyone can view

export default router;