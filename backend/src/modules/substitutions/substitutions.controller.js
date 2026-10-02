import { SubstitutionsService } from './substitutions.service.js';
import { ApiResponse } from '../../core/utils/apiResponse.js';

export class SubstitutionsController {
  static async list(req, res, next) {
    try {
      const substitutions = await SubstitutionsService.getAllSubstitutions();
      return ApiResponse.success(res, substitutions, 'Substitution matrix fetched');
    } catch (err) {
      next(err);
    }
  }

  static async assign(req, res, next) {
    try {
      const { substituteTeacherId, substituteTeacherName, notes } = req.body;
      const updated = await SubstitutionsService.assignSubstitute(req.params.id, {
        substituteTeacherId,
        substituteTeacherName,
        notes,
      });
      return ApiResponse.success(res, updated, 'Substitute allocated and dispatched');
    } catch (err) {
      next(err);
    }
  }

  static async getForLeave(req, res, next) {
    try {
      const list = await SubstitutionsService.generateRecommendationsForLeave(req.params.leaveId);
      return ApiResponse.success(res, list, 'AI recommendations for leave request');
    } catch (err) {
      next(err);
    }
  }
}
