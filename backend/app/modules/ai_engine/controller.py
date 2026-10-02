from app.modules.ai_engine.schemas import (
    LeaveAnalysisRequest,
    LeaveAnalysisResponse,
    AssistantQueryRequest,
    AssistantQueryResponse,
)
from app.modules.ai_engine.service import AiEngineService


class AiEngineController:
    @staticmethod
    async def evaluate_leave_impact(data: LeaveAnalysisRequest) -> LeaveAnalysisResponse:
        return AiEngineService.evaluate_leave_impact(data)

    @staticmethod
    async def query_assistant(data: AssistantQueryRequest) -> AssistantQueryResponse:
        return AiEngineService.query_assistant(data)
