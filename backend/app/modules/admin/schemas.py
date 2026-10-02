from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Any
from datetime import datetime


# ── Teacher Registration & Management Schemas ──
class CreateTeacherRequest(BaseModel):
    # Personal Details
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    name: Optional[str] = Field(None, description="Full name or constructed from first+last")
    dateOfBirth: Optional[str] = None
    gender: Optional[str] = None
    phone: Optional[str] = None
    email: EmailStr = Field(..., description="Teacher institutional email")
    personalEmail: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None

    # Professional Details
    employeeId: str = Field(..., min_length=2, description="Institutional employee code e.g. GIS-T-023")
    qualification: Optional[str] = None
    specialization: Optional[str] = None
    experience: Optional[str] = None
    joiningDate: Optional[str] = None
    department: str = Field(..., description="Academic department or discipline")
    designation: Optional[str] = "Faculty Teacher"
    subjects: List[str] = Field(default_factory=list, description="Assigned teaching subjects")

    # School Details
    assignedClasses: List[str] = Field(default_factory=list, description="Assigned class grades e.g. 10-A")
    assignedSections: List[str] = Field(default_factory=list, description="Assigned sections e.g. A, B")
    workingHours: Optional[str] = "8:00 AM – 4:00 PM"
    status: str = Field("ACTIVE", description="ACTIVE or INACTIVE")

    # Account Details
    username: Optional[str] = None
    initialPassword: Optional[str] = Field(None, min_length=6, description="Initial temporary password or auto-generate")
    confirmPassword: Optional[str] = None


class UpdateTeacherRequest(BaseModel):
    name: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    phone: Optional[str] = None
    dateOfBirth: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    qualification: Optional[str] = None
    specialization: Optional[str] = None
    experience: Optional[str] = None
    department: Optional[str] = None
    designation: Optional[str] = None
    subjects: Optional[List[str]] = None
    assignedClasses: Optional[List[str]] = None
    assignedSections: Optional[List[str]] = None
    workingHours: Optional[str] = None
    status: Optional[str] = None


# ── Student Registration & Management Schemas ──
class CreateStudentRequest(BaseModel):
    # Personal Details
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    name: Optional[str] = Field(None, description="Full name or constructed from first+last")
    dateOfBirth: Optional[str] = None
    gender: Optional[str] = None
    phone: Optional[str] = None
    email: EmailStr = Field(..., description="Student institutional email or username")
    personalEmail: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None

    # Academic Details
    admissionNumber: str = Field(..., min_length=2, description="Student admission ID e.g. GIS-2026-1024")
    admissionDate: Optional[str] = None
    className: str = Field(..., description="Assigned class grade e.g. 10-A")
    section: Optional[str] = "A"
    rollNumber: Optional[int] = 1
    academicYear: Optional[str] = "2026–27"

    # Guardian Details
    guardianName: Optional[str] = None
    relationship: Optional[str] = None
    guardianPhone: Optional[str] = None
    guardianEmail: Optional[str] = None
    guardianAddress: Optional[str] = None

    # Account Details
    username: Optional[str] = None
    initialPassword: Optional[str] = Field(None, min_length=6, description="Initial temporary password or auto-generate")
    confirmPassword: Optional[str] = None
    status: str = Field("ACTIVE", description="ACTIVE or INACTIVE")


class UpdateStudentRequest(BaseModel):
    name: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    phone: Optional[str] = None
    dateOfBirth: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    className: Optional[str] = None
    section: Optional[str] = None
    rollNumber: Optional[int] = None
    academicYear: Optional[str] = None
    guardianName: Optional[str] = None
    relationship: Optional[str] = None
    guardianPhone: Optional[str] = None
    guardianEmail: Optional[str] = None
    status: Optional[str] = None


# ── Status & Reset Password Schemas ──
class UpdateUserStatusRequest(BaseModel):
    status: str = Field(..., description="ACTIVE or INACTIVE")


class ResetPasswordRequest(BaseModel):
    newPassword: Optional[str] = Field(None, min_length=6, description="New password or auto-generate if empty")


class AdminApiResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None
