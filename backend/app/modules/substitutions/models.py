from dataclasses import dataclass
from typing import Optional


@dataclass
class SubstitutionModel:
    id: str
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
    status: str
    reasoning: str
    notes: Optional[str] = None
