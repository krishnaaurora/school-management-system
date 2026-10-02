from fastapi import APIRouter, Depends, status
from app.modules.auth.schemas import LoginRequest, LoginResponse, UserProfileResponse, ApiResponse
from app.modules.auth.service import AuthService
from app.core.dependencies import get_current_user

auth_router = APIRouter(prefix="/auth", tags=["Authentication & Identity"])


@auth_router.post("/login", response_model=LoginResponse, summary="Authenticate user and issue JWT session")
async def login(login_data: LoginRequest):
    return await AuthService.authenticate(login_data)


@auth_router.get("/me", response_model=UserProfileResponse, summary="Retrieve authenticated user profile and role")
async def get_me(current_user: dict = Depends(get_current_user)):
    return await AuthService.get_me(current_user)


@auth_router.post("/logout", response_model=ApiResponse, summary="Invalidate client session / logout")
async def logout(current_user: dict = Depends(get_current_user)):
    return ApiResponse(
        success=True,
        message="Session successfully terminated",
        data={"userId": current_user.get("sub") or current_user.get("userId")},
    )
