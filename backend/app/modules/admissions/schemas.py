from pydantic import BaseModel
from typing import Optional, List


class AdmissionInquiryBase(BaseModel):
    student_name: str
    grade_applying_for: str
    parent_name: str
    parent_email: str
    parent_phone: str


class AdmissionInquiryCreate(AdmissionInquiryBase):
    pass


class AdmissionInquiryResponse(AdmissionInquiryBase):
    id: str
    status: str = "Submitted"
    submitted_at: str
