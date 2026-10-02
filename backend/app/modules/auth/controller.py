from app.modules.auth.schemas import LoginRequest, LoginResponse
from app.modules.auth.service import AuthService


class AuthController:
    @staticmethod
    async def login(credentials: LoginRequest) -> LoginResponse:
        return AuthService.authenticate(credentials)

    @staticmethod
    async def get_current_user_profile(user_payload: dict) -> dict:
        return {"user": user_payload}
