from datetime import datetime, timezone
from typing import Dict, Any, Optional
from fastapi import HTTPException, status
from app.core.config import settings
from app.core.security import create_access_token, verify_password, get_password_hash
from app.modules.auth.schemas import LoginRequest, LoginResponse, UserProfileResponse
from app.modules.auth.repository import UserRepository


class AuthService:
    @classmethod
    async def authenticate(cls, login_data: LoginRequest) -> LoginResponse:
        email_query = login_data.email.strip().lower()
        user = await UserRepository.find_by_email(email_query)

        # Fallback check for initial seeded admin if database was not yet seeded
        if not user and (email_query == settings.ADMIN_EMAIL.lower() or email_query == "admingis@gmail.com"):
            if login_data.password == settings.ADMIN_PASSWORD or login_data.password == "GIS@admin123":
                user = await UserRepository.create_user({
                    "id": "GIS-ADM-001",
                    "name": "Admin GIS Desk",
                    "email": settings.ADMIN_EMAIL.lower(),
                    "passwordHash": get_password_hash(settings.ADMIN_PASSWORD),
                    "role": "ADMIN",
                    "status": "ACTIVE",
                    "createdBy": "SYSTEM_SEED",
                })

        if not user:
            # Generic safe message - do not reveal if email exists
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Verify password hash
        if not verify_password(login_data.password, user.get("passwordHash", "")):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Check account status
        if user.get("status") == "INACTIVE":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is inactive. Please contact administration.",
            )

        # Update last login timestamp
        now = datetime.now(timezone.utc)
        await UserRepository.update_user(user["id"], {"lastLoginAt": now})

        # Generate signed JWT token
        token = create_access_token(
            subject={
                "sub": user["id"],
                "userId": user["id"],
                "role": user["role"].upper(),
                "profileId": user.get("profileId"),
                "name": user["name"],
                "email": user["email"],
            }
        )

        user_profile = UserProfileResponse(
            id=user["id"],
            name=user["name"],
            email=user["email"],
            role=user["role"].upper(),
            status=user.get("status", "ACTIVE"),
            profileId=user.get("profileId"),
            createdBy=user.get("createdBy"),
            createdAt=user.get("createdAt"),
            lastLoginAt=now,
        )

        return LoginResponse(
            access_token=token,
            token_type="bearer",
            user=user_profile,
        )

    @classmethod
    async def get_me(cls, current_user: Dict[str, Any]) -> UserProfileResponse:
        user_id = current_user.get("sub") or current_user.get("userId") or current_user.get("id")
        user = await UserRepository.find_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User profile not found",
            )

        return UserProfileResponse(
            id=user["id"],
            name=user["name"],
            email=user["email"],
            role=user["role"].upper(),
            status=user.get("status", "ACTIVE"),
            profileId=user.get("profileId"),
            createdBy=user.get("createdBy"),
            createdAt=user.get("createdAt"),
            lastLoginAt=user.get("lastLoginAt"),
        )
