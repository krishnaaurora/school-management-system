import { Router } from 'express';
import { StudentsController } from './students.controller.js';
import { authenticateToken } from '../../core/middleware/auth.middleware.js';
import { requireRoles } from '../../core/middleware/rbac.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', StudentsController.list);
router.get('/:id', StudentsController.getById);
router.post('/', requireRoles('admin', 'principal'), StudentsController.create);

export default router;
