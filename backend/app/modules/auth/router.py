from typing import Dict, Any
from fastapi import APIRouter, Depends
from app.modules.auth.schemas import LoginRequest, LoginResponse
from app.modules.auth.controller import AuthController
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication & RBAC"])


@router.post("/login", response_model=LoginResponse, summary="Institutional User Login")
async def login(credentials: LoginRequest):
    return await AuthController.login(credentials)


@router.get("/me", summary="Get Authenticated User Profile")
async def get_me(current_user: Dict[str, Any] = Depends(get_current_user)):
    return await AuthController.get_current_user_profile(current_user)
