from typing import Dict, Any
from fastapi import APIRouter, Depends
from app.modules.auth.schemas import LoginRequest, LoginResponse, UserProfile
from app.modules.auth.service import AuthService
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication & RBAC"])


@router.post("/login", response_model=LoginResponse, summary="Institutional User Login")
async def login(credentials: LoginRequest):
    """Authenticate institutional staff, admins, faculty, or students and return signed JWT."""
    return AuthService.authenticate(credentials)


@router.get("/me", summary="Get Authenticated User Profile")
async def get_me(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Retrieve active authenticated session profile and permissions."""
    return {"user": current_user}
