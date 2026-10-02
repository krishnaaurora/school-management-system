import { Router } from 'express';
import { LeavesController } from './leaves.controller.js';
import { authenticateToken } from '../../core/middleware/auth.middleware.js';
import { requireRoles } from '../../core/middleware/rbac.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', LeavesController.list);
router.get('/:id', LeavesController.getById);
router.post('/', LeavesController.create);
router.patch(
  '/:id/status',
  requireRoles('admin', 'principal', 'viceprincipal'),
  LeavesController.updateStatus
);

export default router;
