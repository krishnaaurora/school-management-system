import { LeavesService } from './leaves.service.js';
import { ApiResponse } from '../../core/utils/apiResponse.js';
import { NotFoundError } from '../../core/errors/AppError.js';

export class LeavesController {
  static async list(req, res, next) {
    try {
      const leaves = await LeavesService.getAllLeaves();
      return ApiResponse.success(res, leaves, 'Leave applications fetched');
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const leave = await LeavesService.getLeaveById(req.params.id);
      if (!leave) throw new NotFoundError('Leave request not found');
      return ApiResponse.success(res, leave, 'Leave request details');
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const newLeave = await LeavesService.createLeave(req.body);
      return ApiResponse.created(res, newLeave, 'Leave application submitted');
    } catch (err) {
      next(err);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { status, adminNotes, substitutePlan } = req.body;
      const updated = await LeavesService.updateStatus(req.params.id, {
        status,
        adminNotes,
        substitutePlan,
      });
      return ApiResponse.success(res, updated, `Leave application status marked as ${status}`);
    } catch (err) {
      next(err);
    }
  }
}
