import { AuthService } from './auth.service.js';
import { ApiResponse } from '../../core/utils/apiResponse.js';

export class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login({ email, password });
      return ApiResponse.success(res, result, 'Institutional login successful');
    } catch (err) {
      next(err);
    }
  }

  static async me(req, res, next) {
    try {
      return ApiResponse.success(res, req.user, 'Active user profile retrieved');
    } catch (err) {
      next(err);
    }
  }
}
