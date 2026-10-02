import secrets
import string
from typing import Dict, Any, List, Optional
from fastapi import HTTPException, status
from app.core.security import get_password_hash
from app.modules.auth.repository import UserRepository
from app.modules.admin.repository import AdminRepository
from app.modules.admin.schemas import (
    CreateTeacherRequest,
    CreateStudentRequest,
    AdminApiResponse,
)


def generate_temp_password(length: int = 10) -> str:
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
    return "".join(secrets.choice(alphabet) for _ in range(length))


class AdminService:
    # ── Teacher Management ──
    @classmethod
    async def create_teacher(cls, data: CreateTeacherRequest, admin_user: Dict[str, Any]) -> AdminApiResponse:
        email = data.email.strip().lower()
        employee_id = data.employeeId.strip().upper()

        # 1. Duplicate email check
        existing_user = await UserRepository.find_by_email(email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered in the institutional identity registry",
            )

        # 2. Duplicate Employee ID check
        existing_emp = await AdminRepository.find_teacher_by_employee_id(employee_id)
        if existing_emp:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Employee ID '{employee_id}' already exists in faculty records",
            )

        # 3. Create Teacher Profile document
        teacher_profile = await AdminRepository.create_teacher_profile({
            "name": data.name,
            "email": email,
            "employeeId": employee_id,
            "phone": data.phone,
            "department": data.department,
            "subjects": data.subjects,
            "status": data.status.upper(),
        })

        # 4. Create User account with role = TEACHER
        raw_password = data.initialPassword or "GIS@teacher123"
        hashed_password = get_password_hash(raw_password)

        user_account = await UserRepository.create_user({
            "name": data.name,
            "email": email,
            "passwordHash": hashed_password,
            "role": "TEACHER",
            "status": data.status.upper(),
            "profileId": teacher_profile["id"],
            "createdBy": admin_user.get("userId") or admin_user.get("id"),
        })

        return AdminApiResponse(
            success=True,
            message="Teacher created successfully",
            data={
                "userId": user_account["id"],
                "teacherId": teacher_profile["id"],
                "name": data.name,
                "email": email,
                "employeeId": employee_id,
                "role": "TEACHER",
                "status": data.status.upper(),
            },
        )

    @classmethod
    async def list_teachers(cls) -> AdminApiResponse:
        teachers = await AdminRepository.find_all_teachers()
        return AdminApiResponse(
            success=True,
            message="Teachers retrieved successfully",
            data=teachers,
        )

    @classmethod
    async def get_teacher(cls, teacher_id: str) -> AdminApiResponse:
        teacher = await AdminRepository.find_teacher_by_id(teacher_id)
        if not teacher:
            teacher = await AdminRepository.find_teacher_by_employee_id(teacher_id)
        if not teacher:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Teacher not found")
        return AdminApiResponse(success=True, message="Teacher found", data=teacher)

    # ── Student Management ──
    @classmethod
    async def create_student(cls, data: CreateStudentRequest, admin_user: Dict[str, Any]) -> AdminApiResponse:
        email = data.email.strip().lower()
        adm_no = data.admissionNumber.strip().upper()

        # 1. Duplicate email check
        existing_user = await UserRepository.find_by_email(email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered in the institutional identity registry",
            )

        # 2. Duplicate Admission Number check
        existing_adm = await AdminRepository.find_student_by_admission_number(adm_no)
        if existing_adm:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Student ID / admission number '{adm_no}' already exists",
            )

        # 3. Create Student Profile document
        student_profile = await AdminRepository.create_student_profile({
            "name": data.name,
            "email": email,
            "admissionNumber": adm_no,
            "className": data.className,
            "section": data.section,
            "rollNumber": data.rollNumber,
            "status": data.status.upper(),
        })

        # 4. Create User account with role = STUDENT
        raw_password = data.initialPassword or "GIS@student123"
        hashed_password = get_password_hash(raw_password)

        user_account = await UserRepository.create_user({
            "name": data.name,
            "email": email,
            "passwordHash": hashed_password,
            "role": "STUDENT",
            "status": data.status.upper(),
            "profileId": student_profile["id"],
            "createdBy": admin_user.get("userId") or admin_user.get("id"),
        })

        return AdminApiResponse(
            success=True,
            message="Student created successfully",
            data={
                "userId": user_account["id"],
                "studentId": student_profile["id"],
                "name": data.name,
                "email": email,
                "admissionNumber": adm_no,
                "className": data.className,
                "role": "STUDENT",
                "status": data.status.upper(),
            },
        )

    @classmethod
    async def list_students(cls) -> AdminApiResponse:
        students = await AdminRepository.find_all_students()
        return AdminApiResponse(
            success=True,
            message="Students retrieved successfully",
            data=students,
        )

    @classmethod
    async def get_student(cls, student_id: str) -> AdminApiResponse:
        student = await AdminRepository.find_student_by_id(student_id)
        if not student:
            student = await AdminRepository.find_student_by_admission_number(student_id)
        if not student:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
        return AdminApiResponse(success=True, message="Student found", data=student)

    # ── User Account Lifecycle & Password Reset ──
    @classmethod
    async def list_users(cls, role: Optional[str] = None, status_filter: Optional[str] = None) -> AdminApiResponse:
        query = {}
        if role:
            query["role"] = role.upper()
        if status_filter:
            query["status"] = status_filter.upper()

        users = await UserRepository.find_all(query)
        # Sanitize: Remove passwordHash
        sanitized = []
        for u in users:
            s_copy = dict(u)
            s_copy.pop("passwordHash", None)
            s_copy.pop("password", None)
            sanitized.append(s_copy)

        return AdminApiResponse(
            success=True,
            message="Users retrieved successfully",
            data=sanitized,
        )

    @classmethod
    async def update_user_status(cls, user_id: str, new_status: str) -> AdminApiResponse:
        valid_status = new_status.strip().upper()
        if valid_status not in ["ACTIVE", "INACTIVE"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Status must be either 'ACTIVE' or 'INACTIVE'",
            )

        user = await UserRepository.find_by_id(user_id)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User account not found")

        updated = await UserRepository.update_user(user_id, {"status": valid_status})
        updated.pop("passwordHash", None)

        return AdminApiResponse(
            success=True,
            message=f"User status successfully changed to {valid_status}",
            data=updated,
        )

    @classmethod
    async def reset_password(cls, user_id: str, new_password: Optional[str]) -> AdminApiResponse:
        user = await UserRepository.find_by_id(user_id)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User account not found")

        pwd_to_set = new_password or generate_temp_password(10)
        hashed_pwd = get_password_hash(pwd_to_set)

        await UserRepository.update_user(user_id, {"passwordHash": hashed_pwd})

        return AdminApiResponse(
            success=True,
            message="Password reset successfully. New hash stored securely.",
            data={
                "userId": user_id,
                "email": user["email"],
                "temporaryPassword": pwd_to_set if not new_password else None,
            },
        )
