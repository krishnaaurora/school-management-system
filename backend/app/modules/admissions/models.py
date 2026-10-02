from dataclasses import dataclass


@dataclass
class AdmissionModel:
    id: str
    student_name: str
    grade_applying_for: str
    parent_name: str
    parent_email: str
    parent_phone: str
    status: str
    submitted_at: str
