from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any


class LoginRequest(BaseModel):
    email: str
    password: str


class UserProfile(BaseModel):
    id: str
    name: str
    email: str
    role: str
    role_title: str
    permissions: List[str] = []


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserProfile
