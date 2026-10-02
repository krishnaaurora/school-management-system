from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Any
from datetime import datetime


class LoginRequest(BaseModel):
    email: str = Field(..., description="User institutional email or username")
    password: str = Field(..., min_length=1, description="Account password")


class UserProfileResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str  # "ADMIN" | "TEACHER" | "STUDENT"
    status: str  # "ACTIVE" | "INACTIVE"
    profileId: Optional[str] = None
    createdBy: Optional[str] = None
    createdAt: Optional[datetime] = None
    lastLoginAt: Optional[datetime] = None


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserProfileResponse


class ApiResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None
