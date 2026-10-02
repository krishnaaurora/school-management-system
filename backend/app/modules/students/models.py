from dataclasses import dataclass


@dataclass
class StudentModel:
    id: str
    name: str
    grade: str
    section: str
    roll_no: str
    attendance: str
    gpa: str
    parent_name: str
    fee_status: str
