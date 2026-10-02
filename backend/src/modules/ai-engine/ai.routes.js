import { Router } from 'express';
import { AiEngineController } from './ai.controller.js';
import { authenticateToken } from '../../core/middleware/auth.middleware.js';

const router = Router();

// Public / Assistant query endpoint
router.post('/query', AiEngineController.queryAssistant);

// Protected AI Analysis endpoint
router.post('/analyze-leave', authenticateToken, AiEngineController.analyzeLeaveImpact);

export default router;
