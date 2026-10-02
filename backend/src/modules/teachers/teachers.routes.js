import { Router } from 'express';
import { TeachersController } from './teachers.controller.js';
import { authenticateToken } from '../../core/middleware/auth.middleware.js';
import { requireRoles } from '../../core/middleware/rbac.middleware.js';

const router = Router();

// All teacher management routes require institutional login
router.use(authenticateToken);

router.get('/', TeachersController.list);
router.get('/:id', TeachersController.getById);
router.post('/', requireRoles('admin', 'principal'), TeachersController.create);
router.put('/:id', requireRoles('admin', 'principal', 'viceprincipal'), TeachersController.update);

export default router;
