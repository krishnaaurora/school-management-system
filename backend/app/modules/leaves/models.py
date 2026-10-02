from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any


@dataclass
class LeaveModel:
    id: str
    teacher_id: str
    teacher_name: str
    subject: str
    department: str
    dates: str
    reason: str
    type: str
    status: str
    applied_on: str
    impact_level: str
    affected_classes: List[Dict[str, Any]] = field(default_factory=list)
    admin_notes: Optional[str] = None
    substitute_plan: Optional[List[Dict[str, Any]]] = None
