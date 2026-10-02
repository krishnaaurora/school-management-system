from datetime import datetime
from app.modules.ai_engine.schemas import (
    LeaveAnalysisRequest,
    LeaveAnalysisResponse,
    RecommendationItem,
    AssistantQueryRequest,
    AssistantQueryResponse,
)


class AiEngineService:
    @staticmethod
    def evaluate_leave_impact(data: LeaveAnalysisRequest) -> LeaveAnalysisResponse:
        count = len(data.affected_classes)
        risk_score = 88 if count > 2 else 55
        risk_level = "HIGH RISK" if risk_score > 75 else "MODERATE RISK"

        recommendations = [
            RecommendationItem(
                recommendation="Auto-dispatch Mr. Arvind Swaminathan for Class 10-A Math",
                confidence=96,
                reason="Zero timetable clash and identical curriculum track (CBSE Class 10).",
            ),
            RecommendationItem(
                recommendation="Combine Grade 12 Advanced Math with Physics Lab tutorial session",
                confidence=84,
                reason="Utilizes Mr. Rajesh Kumar during Period 3 with minimal friction.",
            ),
        ]

        return LeaveAnalysisResponse(
            teacher_name=data.teacher_name,
            subject=data.subject,
            dates=data.dates,
            impact_risk_score=risk_score,
            risk_level=risk_level,
            analysis_summary=f"Absence affects {count} critical academic periods. Immediate substitution recommended to prevent syllabus disruption.",
            recommendations=recommendations,
            timestamp=datetime.now().isoformat(),
        )

    @staticmethod
    def query_assistant(data: AssistantQueryRequest) -> AssistantQueryResponse:
        prompt_lower = data.prompt.lower()

        if "leave" in prompt_lower or "substitute" in prompt_lower:
            return AssistantQueryResponse(
                answer="Currently there are 2 pending leave applications (Mr. Kiran Sharma & Dr. Sunita Menon). The AI Matchmaker has 3 verified substitute allocations ready for administrative confirmation.",
                category="Leaves & Substitutions",
                suggested_actions=["Open AI Leave Analysis", "Review Substitution Matrix"],
            )

        if "admission" in prompt_lower or "fee" in prompt_lower:
            return AssistantQueryResponse(
                answer="Admissions for Academic Year 2026-27 are active for Pre-K through Grade 11. Fee structures and pending student receipts can be managed via the Admin Finance Console.",
                category="Admissions & Finance",
                suggested_actions=["Open Admissions Desk", "Check Fee Master"],
            )

        return AssistantQueryResponse(
            answer="Greenfield International School AI Operational Core is active. All live telemetry, master timetables, and teacher workloads are synchronized.",
            category="General Telemetry",
            suggested_actions=["View Dashboard Metrics", "Inspect Timetables"],
        )
