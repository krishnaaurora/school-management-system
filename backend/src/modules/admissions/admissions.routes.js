import { Router } from 'express';
import { AdmissionsController } from './admissions.controller.js';
import { authenticateToken } from '../../core/middleware/auth.middleware.js';
import { requireRoles } from '../../core/middleware/rbac.middleware.js';

const router = Router();

// Public submission route
router.post('/inquire', AdmissionsController.submit);

// Protected admin review route
router.get(
  '/inquiries',
  authenticateToken,
  requireRoles('admin', 'principal'),
  AdmissionsController.list
);

export default router;
