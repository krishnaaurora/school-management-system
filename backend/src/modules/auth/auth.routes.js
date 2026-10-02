import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { authenticateToken } from '../../core/middleware/auth.middleware.js';

const router = Router();

router.post('/login', AuthController.login);
router.get('/me', authenticateToken, AuthController.me);

export default router;
