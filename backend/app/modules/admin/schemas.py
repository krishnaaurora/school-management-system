from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Any
from datetime import datetime


class CreateTeacherRequest(BaseModel):
    name: str = Field(..., min_length=2, description="Teacher full name")
    email: EmailStr = Field(..., description="Teacher institutional email")
    employeeId: str = Field(..., min_length=2, description="Institutional employee code e.g. GIS-T-023")
    phone: Optional[str] = None
    department: str = Field(..., description="Academic department or discipline")
    subjects: List[str] = Field(default_factory=list, description="Assigned teaching subjects")
    initialPassword: Optional[str] = Field(None, min_length=6, description="Initial temporary password")
    status: str = Field("ACTIVE", description="ACTIVE or INACTIVE")


class CreateStudentRequest(BaseModel):
    name: str = Field(..., min_length=2, description="Student full name")
    admissionNumber: str = Field(..., min_length=2, description="Student admission ID e.g. GIS-2026-1024")
    email: EmailStr = Field(..., description="Student institutional email or username")
    className: str = Field(..., description="Assigned class grade e.g. 10-A")
    section: Optional[str] = "A"
    rollNumber: Optional[int] = 1
    initialPassword: Optional[str] = Field(None, min_length=6, description="Initial temporary password")
    status: str = Field("ACTIVE", description="ACTIVE or INACTIVE")


class UpdateUserStatusRequest(BaseModel):
    status: str = Field(..., description="ACTIVE or INACTIVE")


class ResetPasswordRequest(BaseModel):
    newPassword: Optional[str] = Field(None, min_length=6, description="New password or auto-generate if empty")


class AdminApiResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None
