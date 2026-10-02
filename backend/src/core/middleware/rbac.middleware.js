import { ForbiddenError } from '../errors/AppError.js';

/**
 * Role-Based Access Control Middleware
 * Supports granular role gating: 'admin', 'principal', 'viceprincipal', 'teacher', 'student', 'parent'
 */
export const requireRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ForbiddenError('User identity unverified'));
    }

    const userRole = (req.user.role || '').toLowerCase();
    const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase());

    if (!normalizedAllowed.includes(userRole)) {
      return next(
        new ForbiddenError(
          `Access restricted to roles: [${allowedRoles.join(', ')}]. Current role: ${userRole}`
        )
      );
    }

    next();
  };
};
