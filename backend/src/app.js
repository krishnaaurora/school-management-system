import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/index.js';

// Domain Modules
import authRoutes from './modules/auth/index.js';
import teacherRoutes from './modules/teachers/index.js';
import studentRoutes from './modules/students/index.js';
import leaveRoutes from './modules/leaves/index.js';
import substitutionRoutes from './modules/substitutions/index.js';
import timetableRoutes from './modules/timetables/index.js';
import aiRoutes from './modules/ai-engine/index.js';
import admissionRoutes from './modules/admissions/index.js';

// Core Middlewares & Errors
import { errorHandler } from './core/middleware/error.middleware.js';
import { NotFoundError } from './core/errors/AppError.js';
import { ApiResponse } from './core/utils/apiResponse.js';

const app = express();

// ── Global Middlewares ──
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// ── System Health Check ──
app.get('/api/health', (req, res) => {
  return ApiResponse.success(res, {
    status: 'OPERATIONAL',
    system: 'Greenfield International School Modular Monolith API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  }, 'System status is optimal');
});

// ── Mount Domain Module Routers (Bounded Contexts) ──
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/teachers', teacherRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/leaves', leaveRoutes);
app.use('/api/v1/substitutions', substitutionRoutes);
app.use('/api/v1/timetables', timetableRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/admissions', admissionRoutes);

// ── 404 Catch-All ──
app.use('*', (req, res, next) => {
  next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl} - Route not found on GIS API`));
});

// ── Centralized Error Handler ──
app.use(errorHandler);

export default app;
