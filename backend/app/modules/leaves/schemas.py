from pydantic import BaseModel
from typing import Optional, List, Dict, Any


class AffectedClass(BaseModel):
    period: str
    class_name: str
    room: str
    status: str = "Unassigned"


class LeaveBase(BaseModel):
    teacher_id: str
    teacher_name: str
    subject: str
    department: str
    dates: str
    reason: str
    type: str = "Medical Leave"
    impact_level: str = "Moderate"
    affected_classes: List[AffectedClass] = []


class LeaveCreate(LeaveBase):
    pass


class LeaveStatusUpdate(BaseModel):
    status: str  # "Approved" | "Rejected" | "Under Review"
    admin_notes: Optional[str] = None
    substitute_plan: Optional[List[Dict[str, Any]]] = None


class LeaveResponse(LeaveBase):
    id: str
    status: str
    applied_on: str
    admin_notes: Optional[str] = None
    substitute_plan: Optional[List[Dict[str, Any]]] = None
