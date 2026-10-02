from pydantic import BaseModel
from typing import Optional, List


class TeacherBase(BaseModel):
    name: str
    subject: str
    dept: str
    max_load: int = 28
    current_load: int = 0
    email: str
    attendance: str = "100%"
    status: str = "Active"


class TeacherCreate(TeacherBase):
    pass


class TeacherUpdate(BaseModel):
    name: Optional[str] = None
    subject: Optional[str] = None
    dept: Optional[str] = None
    max_load: Optional[int] = None
    current_load: Optional[int] = None
    status: Optional[str] = None
    attendance: Optional[str] = None


class TeacherResponse(TeacherBase):
    id: str
