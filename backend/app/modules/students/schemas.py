from pydantic import BaseModel
from typing import Optional, List


class StudentBase(BaseModel):
    name: str
    grade: str
    section: str
    roll_no: str
    attendance: str = "100%"
    gpa: str = "4.00"
    parent_name: str
    fee_status: str = "Paid"


class StudentCreate(StudentBase):
    pass


class StudentResponse(StudentBase):
    id: str
