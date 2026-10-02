from pydantic import BaseModel
from typing import Optional, List


class PeriodBase(BaseModel):
    period: str
    time: str
    class_name: str
    subject: str
    teacher: str
    room: str
    status: str = "Normal"
    impact: str = "None"


class PeriodUpdate(BaseModel):
    teacher: Optional[str] = None
    room: Optional[str] = None
    status: Optional[str] = None
    impact: Optional[str] = None


class PeriodResponse(PeriodBase):
    id: str
