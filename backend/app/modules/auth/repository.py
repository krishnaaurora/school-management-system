from typing import Optional, Dict, Any
from app.modules.auth.models import UserModel

_SEED_USERS: Dict[str, UserModel] = {
    "admingis@gmail.com": UserModel(
        id="GIS-ADM-001",
        email="Admingis@gmail.com",
        password="GIS@admin123",
        role="admin",
        name="Admin GIS Desk",
        role_title="System Administrator",
        permissions=["Full User Provisioning", "Security & Audit Logs", "Fee Master", "System Governance", "AI Override"],
    ),
    "principal.rao@greenfieldis.edu": UserModel(
        id="GIS-EXEC-01",
        email="principal.rao@greenfieldis.edu",
        password="GIS@admin123",
        role="principal",
        name="Dr. Ananya Rao",
        role_title="Principal",
        permissions=["Institutional Governance", "Academic Board Review", "Faculty Approvals", "Strategic Planning"],
    ),
    "vp.sharma@greenfieldis.edu": UserModel(
        id="GIS-EXEC-02",
        email="vp.sharma@greenfieldis.edu",
        password="GIS@admin123",
        role="viceprincipal",
        name="Mrs. Priya Sharma",
        role_title="Vice Principal",
        permissions=["Daily Academic Timetables", "Discipline Oversight", "Examination Protocols", "Student Council"],
    ),
    "teacher.kiran@greenfieldis.edu": UserModel(
        id="GIS-FAC-408",
        email="teacher.kiran@greenfieldis.edu",
        password="GIS@admin123",
        role="teacher",
        name="Mr. Kiran Sharma",
        role_title="Senior Mathematics Faculty",
        permissions=["Classroom Attendance", "Gradebook & Evaluation", "Lesson Plan Management", "Parent Remarks"],
    ),
}


class AuthRepository:
    @staticmethod
    def find_by_email_or_id(identifier: str) -> Optional[UserModel]:
        clean = identifier.strip().lower()
        if clean in _SEED_USERS:
            return _SEED_USERS[clean]
        for user in _SEED_USERS.values():
            if user.id.lower() == clean:
                return user
        return None
