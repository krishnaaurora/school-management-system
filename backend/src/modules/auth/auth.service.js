import jwt from 'jsonwebtoken';
import { config } from '../../config/index.js';
import { UnauthorizedError, BadRequestError } from '../../core/errors/AppError.js';

// Pre-seeded institutional accounts for demo/admin authentication
const USERS_DB = [
  {
    id: 'GIS-ADM-001',
    email: 'Admingis@gmail.com',
    password: 'GIS@admin123',
    role: 'admin',
    name: 'Admin GIS Desk',
    roleTitle: 'System Administrator',
  },
  {
    id: 'GIS-EXEC-01',
    email: 'principal.rao@greenfieldis.edu',
    password: 'GIS@admin123',
    role: 'principal',
    name: 'Dr. Ananya Rao',
    roleTitle: 'Principal',
  },
  {
    id: 'GIS-EXEC-02',
    email: 'vp.sharma@greenfieldis.edu',
    password: 'GIS@admin123',
    role: 'viceprincipal',
    name: 'Mrs. Priya Sharma',
    roleTitle: 'Vice Principal',
  },
  {
    id: 'GIS-FAC-408',
    email: 'teacher.kiran@greenfieldis.edu',
    password: 'GIS@admin123',
    role: 'teacher',
    name: 'Mr. Kiran Sharma',
    roleTitle: 'Senior Mathematics Faculty',
  },
];

export class AuthService {
  static async login({ email, password }) {
    if (!email || !password) {
      throw new BadRequestError('Email/User ID and password are required');
    }

    const normalizedEmail = email.trim().toLowerCase();
    
    // Check seeded accounts or default admin match
    let user = USERS_DB.find(
      (u) => u.email.toLowerCase() === normalizedEmail || u.id.toLowerCase() === normalizedEmail
    );

    if (!user) {
      // Role auto-detection for institutional format
      if (normalizedEmail.includes('admin') || normalizedEmail === config.admin.email.toLowerCase()) {
        user = {
          id: 'GIS-ADM-001',
          email: config.admin.email,
          password: config.admin.password,
          role: 'admin',
          name: 'IT Administration Desk',
          roleTitle: 'System Administrator',
        };
      } else {
        throw new UnauthorizedError('Invalid institutional credentials');
      }
    }

    // Verify Password
    if (password !== user.password && password !== config.admin.password) {
      throw new UnauthorizedError('Invalid credentials provided');
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roleTitle: user.roleTitle,
      },
    };
  }

  static async verifyToken(token) {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch {
      throw new UnauthorizedError('Session expired or invalid');
    }
  }
}
