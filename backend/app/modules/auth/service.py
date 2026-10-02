from typing import Dict, Any, Optional
from fastapi import HTTPException, status
from app.core.config import settings
from app.core.security import create_access_token, verify_password
from app.modules.auth.schemas import LoginRequest, LoginResponse, UserProfile

# Seeded Institutional Accounts for Authentication & RBAC
SEEDED_USERS: Dict[str, Dict[str, Any]] = {
    "admingis@gmail.com": {
        "id": "GIS-ADM-001",
        "email": "Admingis@gmail.com",
        "password": "GIS@admin123",
        "role": "admin",
        "name": "Admin GIS Desk",
        "role_title": "System Administrator",
        "permissions": ["Full User Provisioning", "Security & Audit Logs", "Fee Master", "System Governance", "AI Override"],
    },
    "principal.rao@greenfieldis.edu": {
        "id": "GIS-EXEC-01",
        "email": "principal.rao@greenfieldis.edu",
        "password": "GIS@admin123",
        "role": "principal",
        "name": "Dr. Ananya Rao",
        "role_title": "Principal",
        "permissions": ["Institutional Governance", "Academic Board Review", "Faculty Approvals", "Strategic Planning"],
    },
    "vp.sharma@greenfieldis.edu": {
        "id": "GIS-EXEC-02",
        "email": "vp.sharma@greenfieldis.edu",
        "password": "GIS@admin123",
        "role": "viceprincipal",
        "name": "Mrs. Priya Sharma",
        "role_title": "Vice Principal",
        "permissions": ["Daily Academic Timetables", "Discipline Oversight", "Examination Protocols", "Student Council"],
    },
    "teacher.kiran@greenfieldis.edu": {
        "id": "GIS-FAC-408",
        "email": "teacher.kiran@greenfieldis.edu",
        "password": "GIS@admin123",
        "role": "teacher",
        "name": "Mr. Kiran Sharma",
        "role_title": "Senior Mathematics Faculty",
        "permissions": ["Classroom Attendance", "Gradebook & Evaluation", "Lesson Plan Management", "Parent Remarks"],
    },
}


class AuthService:
    @staticmethod
    def authenticate(login_data: LoginRequest) -> LoginResponse:
        email_key = login_data.email.strip().lower()
        
        # Match from seeded accounts or default admin
        user_record = SEEDED_USERS.get(email_key)
        
        if not user_record:
            # Check by ID match or fallback
            for user in SEEDED_USERS.values():
                if user["id"].lower() == email_key:
                    user_record = user
                    break

        # Check default admin credentials from config
        if not user_record and (email_key == settings.ADMIN_EMAIL.lower() or "admin" in email_key):
            user_record = SEEDED_USERS["admingis@gmail.com"]

        if not user_record or not verify_password(login_data.password, user_record["password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid institutional credentials provided",
                headers={"WWW-Authenticate": "Bearer"},
            )

        token = create_access_token(
            subject={
                "id": user_record["id"],
                "email": user_record["email"],
                "role": user_record["role"],
                "name": user_record["name"],
            }
        )

        return LoginResponse(
            access_token=token,
            user=UserProfile(
                id=user_record["id"],
                name=user_record["name"],
                email=user_record["email"],
                role=user_record["role"],
                role_title=user_record["role_title"],
                permissions=user_record["permissions"],
            ),
        )
