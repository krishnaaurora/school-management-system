import { StudentsService } from './students.service.js';
import { ApiResponse } from '../../core/utils/apiResponse.js';
import { NotFoundError } from '../../core/errors/AppError.js';

export class StudentsController {
  static async list(req, res, next) {
    try {
      const students = await StudentsService.getAllStudents();
      return ApiResponse.success(res, students, 'Students directory fetched');
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const student = await StudentsService.getStudentById(req.params.id);
      if (!student) throw new NotFoundError('Student not found');
      return ApiResponse.success(res, student, 'Student details retrieved');
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const student = await StudentsService.createStudent(req.body);
      return ApiResponse.created(res, student, 'Student enrolled successfully');
    } catch (err) {
      next(err);
    }
  }
}
