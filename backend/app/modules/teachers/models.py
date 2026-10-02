from dataclasses import dataclass
from typing import Optional


@dataclass
class TeacherModel:
    id: str
    name: str
    subject: str
    dept: str
    max_load: int
    current_load: int
    email: str
    attendance: str
    status: str
