from typing import Dict, Any
from fastapi import APIRouter, Depends
from app.modules.ai_engine.schemas import (
    LeaveAnalysisRequest,
    LeaveAnalysisResponse,
    AssistantQueryRequest,
    AssistantQueryResponse,
)
from app.modules.ai_engine.service import AiEngineService
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/ai", tags=["AI Leave & Operational Intelligence"])


@router.post("/analyze-leave", response_model=LeaveAnalysisResponse, summary="Analyze Leave Impact Risk & Match Substitutes")
async def analyze_leave(
    data: LeaveAnalysisRequest,
    current_user: Dict[str, Any] = Depends(get_current_user),
):
    return AiEngineService.evaluate_leave_impact(data)


@router.post("/query", response_model=AssistantQueryResponse, summary="Natural Language School Operations Query")
async def assistant_query(data: AssistantQueryRequest):
    return AiEngineService.query_assistant(data)
