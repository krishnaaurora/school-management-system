import { Router } from 'express';
import { SubstitutionsController } from './substitutions.controller.js';
import { authenticateToken } from '../../core/middleware/auth.middleware.js';
import { requireRoles } from '../../core/middleware/rbac.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', SubstitutionsController.list);
router.get('/leave/:leaveId', SubstitutionsController.getForLeave);
router.patch(
  '/:id/assign',
  requireRoles('admin', 'principal', 'viceprincipal'),
  SubstitutionsController.assign
);

export default router;
