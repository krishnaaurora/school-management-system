from pydantic import BaseModel
from typing import Optional, List, Dict, Any


class LeaveAnalysisRequest(BaseModel):
    teacher_name: str
    subject: str
    dates: str
    affected_classes: List[Dict[str, Any]] = []


class RecommendationItem(BaseModel):
    recommendation: str
    confidence: int
    reason: str


class LeaveAnalysisResponse(BaseModel):
    teacher_name: str
    subject: str
    dates: str
    impact_risk_score: int
    risk_level: str
    analysis_summary: str
    recommendations: List[RecommendationItem]
    timestamp: str


class AssistantQueryRequest(BaseModel):
    prompt: str


class AssistantQueryResponse(BaseModel):
    answer: str
    category: str
    suggested_actions: List[str] = []
