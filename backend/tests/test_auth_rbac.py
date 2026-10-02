import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.modules.auth.repository import UserRepository
from app.core.security import get_password_hash

client = TestClient(app)


@pytest.fixture(autouse=True)
def ensure_test_admin():
    # Setup standard test users in repository
    import asyncio
    async def _setup():
        await UserRepository.create_user({
            "id": "GIS-ADM-001",
            "name": "Admin GIS Desk",
            "email": "admingis@gmail.com",
            "passwordHash": get_password_hash("GIS@admin123"),
            "role": "ADMIN",
            "status": "ACTIVE",
            "createdBy": "SYSTEM_TEST",
        })
        await UserRepository.create_user({
            "id": "USR-TEA-TEST",
            "name": "Ananya Sharma",
            "email": "teacher.ananya@greenfieldis.edu",
            "passwordHash": get_password_hash("GIS@teacher123"),
            "role": "TEACHER",
            "status": "ACTIVE",
            "profileId": "GIS-T-023",
            "createdBy": "GIS-ADM-001",
        })
        await UserRepository.create_user({
            "id": "USR-STU-TEST",
            "name": "Aarav Kumar",
            "email": "student.aarav@greenfieldis.edu",
            "passwordHash": get_password_hash("GIS@student123"),
            "role": "STUDENT",
            "status": "ACTIVE",
            "profileId": "GIS-STU-10A-024",
            "createdBy": "GIS-ADM-001",
        })
    asyncio.run(_setup())


# 1. Valid Admin Login
def test_01_valid_admin_login():
    res = client.post("/api/v1/auth/login", json={"email": "admingis@gmail.com", "password": "GIS@admin123"})
    assert res.status_code == 200
    data = res.json()
    assert "access_token" in data
    assert data["user"]["role"] == "ADMIN"
    assert data["user"]["email"] == "admingis@gmail.com"
    assert "password" not in data["user"]
    assert "passwordHash" not in data["user"]


# 2. Invalid Password (generic error)
def test_02_invalid_password():
    res = client.post("/api/v1/auth/login", json={"email": "admingis@gmail.com", "password": "WrongPassword999"})
    assert res.status_code == 401
    assert "Invalid email or password" in res.json()["detail"]


# 3. Inactive Account Check
def test_03_inactive_account_blocked():
    import asyncio
    asyncio.run(UserRepository.create_user({
        "id": "USR-INACTIVE-01",
        "name": "Inactive Staff",
        "email": "inactive.staff@greenfieldis.edu",
        "passwordHash": get_password_hash("GIS@staff123"),
        "role": "TEACHER",
        "status": "INACTIVE",
    }))

    res = client.post("/api/v1/auth/login", json={"email": "inactive.staff@greenfieldis.edu", "password": "GIS@staff123"})
    assert res.status_code == 403
    assert "Account is inactive" in res.json()["detail"]


# 4. Admin Creates Teacher
def test_04_admin_creates_teacher():
    admin_login = client.post("/api/v1/auth/login", json={"email": "admingis@gmail.com", "password": "GIS@admin123"}).json()
    token = admin_login["access_token"]

    teacher_payload = {
        "name": "Kiran Verma",
        "email": "kiran.verma@greenfieldis.edu",
        "employeeId": "GIS-T-999",
        "phone": "+91 9988776655",
        "department": "Science",
        "subjects": ["Chemistry"],
        "initialPassword": "GIS@kiran123",
        "status": "ACTIVE"
    }

    res = client.post(
        "/api/v1/admin/teachers",
        json=teacher_payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    assert res.status_code == 200
    res_data = res.json()
    assert res_data["success"] is True
    assert res_data["data"]["role"] == "TEACHER"
    assert res_data["data"]["employeeId"] == "GIS-T-999"


# 5. Admin Creates Student
def test_05_admin_creates_student():
    admin_login = client.post("/api/v1/auth/login", json={"email": "admingis@gmail.com", "password": "GIS@admin123"}).json()
    token = admin_login["access_token"]

    student_payload = {
        "name": "Rohan Das",
        "admissionNumber": "GIS-2026-9999",
        "email": "rohan.das@greenfieldis.edu",
        "className": "10-B",
        "section": "B",
        "rollNumber": 15,
        "initialPassword": "GIS@rohan123",
        "status": "ACTIVE"
    }

    res = client.post(
        "/api/v1/admin/students",
        json=student_payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    assert res.status_code == 200
    res_data = res.json()
    assert res_data["success"] is True
    assert res_data["data"]["role"] == "STUDENT"
    assert res_data["data"]["admissionNumber"] == "GIS-2026-9999"


# 6. Duplicate Email Prevention
def test_06_duplicate_email_prevention():
    admin_login = client.post("/api/v1/auth/login", json={"email": "admingis@gmail.com", "password": "GIS@admin123"}).json()
    token = admin_login["access_token"]

    duplicate_payload = {
        "name": "Duplicate Teacher",
        "email": "kiran.verma@greenfieldis.edu",  # already registered in test 4
        "employeeId": "GIS-T-888",
        "department": "Science",
        "subjects": ["Biology"],
    }
    res = client.post(
        "/api/v1/admin/teachers",
        json=duplicate_payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    assert res.status_code == 400
    assert "already registered" in res.json()["detail"].lower()


# 7. Duplicate Employee ID Prevention
def test_07_duplicate_employee_id_prevention():
    admin_login = client.post("/api/v1/auth/login", json={"email": "admingis@gmail.com", "password": "GIS@admin123"}).json()
    token = admin_login["access_token"]

    duplicate_emp_payload = {
        "name": "Another Faculty",
        "email": "unique.emp@greenfieldis.edu",
        "employeeId": "GIS-T-999",  # already exists from test 4
        "department": "Physics",
        "subjects": ["Physics"],
    }
    res = client.post(
        "/api/v1/admin/teachers",
        json=duplicate_emp_payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    assert res.status_code == 400
    assert "already exists" in res.json()["detail"].lower()


# 8. Duplicate Student ID / Admission Number Prevention
def test_08_duplicate_student_id_prevention():
    admin_login = client.post("/api/v1/auth/login", json={"email": "admingis@gmail.com", "password": "GIS@admin123"}).json()
    token = admin_login["access_token"]

    duplicate_stu_payload = {
        "name": "Another Student",
        "admissionNumber": "GIS-2026-9999",  # already exists from test 5
        "email": "another.student@greenfieldis.edu",
        "className": "10-A",
    }
    res = client.post(
        "/api/v1/admin/students",
        json=duplicate_stu_payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    assert res.status_code == 400
    assert "already exists" in res.json()["detail"].lower()


# 9. Teacher Login
def test_09_teacher_login():
    res = client.post("/api/v1/auth/login", json={"email": "teacher.ananya@greenfieldis.edu", "password": "GIS@teacher123"})
    assert res.status_code == 200
    data = res.json()
    assert data["user"]["role"] == "TEACHER"
    assert data["user"]["email"] == "teacher.ananya@greenfieldis.edu"


# 10. Student Login
def test_10_student_login():
    res = client.post("/api/v1/auth/login", json={"email": "student.aarav@greenfieldis.edu", "password": "GIS@student123"})
    assert res.status_code == 200
    data = res.json()
    assert data["user"]["role"] == "STUDENT"
    assert data["user"]["email"] == "student.aarav@greenfieldis.edu"


# 11. Teacher accessing Admin API -> DENIED (403 Forbidden)
def test_11_teacher_access_admin_api_denied():
    teacher_login = client.post("/api/v1/auth/login", json={"email": "teacher.ananya@greenfieldis.edu", "password": "GIS@teacher123"}).json()
    teacher_token = teacher_login["access_token"]

    res = client.get(
        "/api/v1/admin/users",
        headers={"Authorization": f"Bearer {teacher_token}"}
    )
    assert res.status_code == 403


# 12. Student accessing Admin API -> DENIED (403 Forbidden)
def test_12_student_access_admin_api_denied():
    student_login = client.post("/api/v1/auth/login", json={"email": "student.aarav@greenfieldis.edu", "password": "GIS@student123"}).json()
    student_token = student_login["access_token"]

    res = client.get(
        "/api/v1/admin/users",
        headers={"Authorization": f"Bearer {student_token}"}
    )
    assert res.status_code == 403


# 13. Student accessing Teacher API -> DENIED (403 Forbidden)
def test_13_student_access_teacher_api_denied():
    student_login = client.post("/api/v1/auth/login", json={"email": "student.aarav@greenfieldis.edu", "password": "GIS@student123"}).json()
    student_token = student_login["access_token"]

    res = client.post(
        "/api/v1/teachers",
        json={
            "name": "Test Faculty",
            "email": "test.faculty@greenfieldis.edu",
            "department": "Science",
            "role": "Teacher",
            "assigned_classes": ["10-A"],
            "subjects": ["Math"]
        },
        headers={"Authorization": f"Bearer {student_token}"}
    )
    assert res.status_code == 403


# 14. Unauthenticated API request -> DENIED (401 Unauthorized)
def test_14_unauthenticated_request_denied():
    res = client.get("/api/v1/auth/me")
    assert res.status_code == 401


# 15. Admin Password Reset
def test_15_admin_password_reset():
    admin_login = client.post("/api/v1/auth/login", json={"email": "admingis@gmail.com", "password": "GIS@admin123"}).json()
    token = admin_login["access_token"]

    # Reset Teacher Ananya's password
    reset_res = client.post(
        "/api/v1/admin/users/USR-TEA-TEST/reset-password",
        json={"newPassword": "NewSecretPassword2026!"},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert reset_res.status_code == 200
    assert reset_res.json()["success"] is True

    # Old password must fail
    old_login = client.post("/api/v1/auth/login", json={"email": "teacher.ananya@greenfieldis.edu", "password": "GIS@teacher123"})
    assert old_login.status_code == 401

    # New password must succeed
    new_login = client.post("/api/v1/auth/login", json={"email": "teacher.ananya@greenfieldis.edu", "password": "NewSecretPassword2026!"})
    assert new_login.status_code == 200
    assert new_login.json()["user"]["role"] == "TEACHER"


# 16. Logout
def test_16_logout():
    admin_login = client.post("/api/v1/auth/login", json={"email": "admingis@gmail.com", "password": "GIS@admin123"}).json()
    token = admin_login["access_token"]

    res = client.post("/api/v1/auth/logout", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    assert res.json()["success"] is True


# 17. Current User /api/v1/auth/me
def test_17_get_current_user_me():
    admin_login = client.post("/api/v1/auth/login", json={"email": "admingis@gmail.com", "password": "GIS@admin123"}).json()
    token = admin_login["access_token"]

    res = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    user_info = res.json()
    assert user_info["email"] == "admingis@gmail.com"
    assert user_info["role"] == "ADMIN"
    assert "password" not in user_info
    assert "passwordHash" not in user_info
