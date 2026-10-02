from pydantic import BaseModel
from typing import Optional, List


class SubstitutionBase(BaseModel):
    leave_id: str
    original_teacher: str
    period: str
    class_name: str
    subject: str
    room: str
    date: str
    recommended_teacher: str
    recommended_teacher_id: str
    score: int
    status: str = "Pending Confirmation"
    reasoning: str


class SubstitutionAssign(BaseModel):
    substitute_teacher_id: Optional[str] = None
    substitute_teacher_name: Optional[str] = None
    notes: Optional[str] = None


class SubstitutionResponse(SubstitutionBase):
    id: str
    notes: Optional[str] = None
