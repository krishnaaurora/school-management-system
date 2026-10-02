import { AdmissionsService } from './admissions.service.js';
import { ApiResponse } from '../../core/utils/apiResponse.js';

export class AdmissionsController {
  static async list(req, res, next) {
    try {
      const list = await AdmissionsService.getAllInquiries();
      return ApiResponse.success(res, list, 'Admissions inquiries fetched');
    } catch (err) {
      next(err);
    }
  }

  static async submit(req, res, next) {
    try {
      const newInquiry = await AdmissionsService.submitInquiry(req.body);
      return ApiResponse.created(res, newInquiry, 'Admissions inquiry submitted successfully');
    } catch (err) {
      next(err);
    }
  }
}
