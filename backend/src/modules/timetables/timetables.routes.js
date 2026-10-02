import { Router } from 'express';
import { TimetablesController } from './timetables.controller.js';
import { authenticateToken } from '../../core/middleware/auth.middleware.js';
import { requireRoles } from '../../core/middleware/rbac.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', TimetablesController.getDailySchedule);
router.patch(
  '/:id',
  requireRoles('admin', 'principal', 'viceprincipal'),
  TimetablesController.updatePeriod
);

export default router;
