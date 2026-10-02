import { AiEngineService } from './ai.service.js';
import { ApiResponse } from '../../core/utils/apiResponse.js';

export class AiEngineController {
  static async analyzeLeaveImpact(req, res, next) {
    try {
      const analysis = await AiEngineService.evaluateLeaveImpact(req.body);
      return ApiResponse.success(res, analysis, 'AI Leave Impact Analysis generated');
    } catch (err) {
      next(err);
    }
  }

  static async queryAssistant(req, res, next) {
    try {
      const { prompt } = req.body;
      const result = await AiEngineService.queryAssistant(prompt);
      return ApiResponse.success(res, result, 'AI Assistant query response');
    } catch (err) {
      next(err);
    }
  }
}
