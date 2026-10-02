import { TeachersService } from './teachers.service.js';
import { ApiResponse } from '../../core/utils/apiResponse.js';
import { NotFoundError } from '../../core/errors/AppError.js';

export class TeachersController {
  static async list(req, res, next) {
    try {
      const teachers = await TeachersService.getAllTeachers();
      return ApiResponse.success(res, teachers, 'Teachers list fetched successfully');
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const teacher = await TeachersService.getTeacherById(req.params.id);
      if (!teacher) throw new NotFoundError('Teacher not found');
      return ApiResponse.success(res, teacher, 'Teacher details retrieved');
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const teacher = await TeachersService.createTeacher(req.body);
      return ApiResponse.created(res, teacher, 'Teacher registered successfully');
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const updated = await TeachersService.updateTeacher(req.params.id, req.body);
      if (!updated) throw new NotFoundError('Teacher not found');
      return ApiResponse.success(res, updated, 'Teacher updated successfully');
    } catch (err) {
      next(err);
    }
  }
}
