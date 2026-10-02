import { TimetablesService } from './timetables.service.js';
import { ApiResponse } from '../../core/utils/apiResponse.js';
import { NotFoundError } from '../../core/errors/AppError.js';

export class TimetablesController {
  static async getDailySchedule(req, res, next) {
    try {
      const schedule = await TimetablesService.getDailySchedule();
      return ApiResponse.success(res, schedule, 'Daily live schedule fetched');
    } catch (err) {
      next(err);
    }
  }

  static async updatePeriod(req, res, next) {
    try {
      const updated = await TimetablesService.updatePeriod(req.params.id, req.body);
      if (!updated) throw new NotFoundError('Period not found');
      return ApiResponse.success(res, updated, 'Period updated successfully');
    } catch (err) {
      next(err);
    }
  }
}
