import secrets
import string
from typing import Dict, Any, List, Optional
from fastapi import HTTPException, status
from app.core.security import get_password_hash
from app.modules.auth.repository import UserRepository
from app.modules.admin.repository import AdminRepository
from app.modules.admin.schemas import (
    CreateTeacherRequest,
    UpdateTeacherRequest,
    CreateStudentRequest,
    UpdateStudentRequest,
    AdminApiResponse,
)


def generate_temp_password(prefix: str = "GIS@", length: int = 6) -> str:
    alphabet = string.ascii_letters + string.digits
    rand_chars = "".join(secrets.choice(alphabet) for _ in range(length))
    return f"{prefix}{rand_chars}"


class AdminService:
    # ── Teacher Management ──
    @classmethod
    async def create_teacher(cls, data: CreateTeacherRequest, admin_user: Dict[str, Any]) -> AdminApiResponse:
        email = data.email.strip().lower()
        employee_id = data.employeeId.strip().upper()

        # Build full name
        full_name = data.name or f"{(data.firstName or '').strip()} {(data.lastName or '').strip()}".strip()
        if not full_name:
            full_name = "Faculty Member"

        # 1. Duplicate email check
        existing_user = await UserRepository.find_by_email(email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email is already registered in the institutional registry",
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
            "name": full_name,
            "firstName": data.firstName,
            "lastName": data.lastName,
            "email": email,
            "personalEmail": data.personalEmail,
            "employeeId": employee_id,
            "phone": data.phone,
            "dateOfBirth": data.dateOfBirth,
            "gender": data.gender,
            "address": data.address,
            "city": data.city,
            "state": data.state,
            "pincode": data.pincode,
            "qualification": data.qualification,
            "specialization": data.specialization,
            "experience": data.experience,
            "joiningDate": data.joiningDate,
            "department": data.department,
            "designation": data.designation or "Faculty Teacher",
            "subjects": data.subjects,
            "assignedClasses": data.assignedClasses,
            "assignedSections": data.assignedSections,
            "workingHours": data.workingHours or "8:00 AM – 4:00 PM",
            "status": data.status.upper(),
        })

        # 4. Generate / set temporary password
        raw_password = data.initialPassword if (data.initialPassword and data.initialPassword.strip()) else generate_temp_password("GIS@TCH")
        hashed_password = get_password_hash(raw_password)

        # 5. Create User account with role = TEACHER
        admin_id = admin_user.get("userId") or admin_user.get("id") or "ADMIN"
        user_account = await UserRepository.create_user({
            "name": full_name,
            "email": email,
            "username": data.username or email,
            "passwordHash": hashed_password,
            "role": "TEACHER",
            "status": data.status.upper(),
            "profileId": teacher_profile["id"],
            "createdBy": admin_id,
        })

        return AdminApiResponse(
            success=True,
            message="Teacher registered successfully",
            data={
                "userId": user_account["id"],
                "teacherId": teacher_profile["id"],
                "name": full_name,
                "email": email,
                "username": data.username or email,
                "employeeId": employee_id,
                "department": data.department,
                "temporaryPassword": raw_password,
                "role": "TEACHER",
                "status": data.status.upper(),
            },
        )

    @classmethod
    async def list_teachers(cls, search: Optional[str] = None, department: Optional[str] = None, status_filter: Optional[str] = None) -> AdminApiResponse:
        teachers = await AdminRepository.find_all_teachers()

        if search:
            q = search.lower().strip()
            teachers = [
                t for t in teachers
                if q in t.get("name", "").lower()
                or q in t.get("email", "").lower()
                or q in t.get("employeeId", "").lower()
                or q in t.get("department", "").lower()
            ]

        if department and department != "All":
            teachers = [t for t in teachers if t.get("department") == department]

        if status_filter and status_filter != "All":
            teachers = [t for t in teachers if t.get("status", "ACTIVE").upper() == status_filter.upper()]

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

    @classmethod
    async def update_teacher(cls, teacher_id: str, data: UpdateTeacherRequest) -> AdminApiResponse:
        teacher = await AdminRepository.find_teacher_by_id(teacher_id)
        if not teacher:
            teacher = await AdminRepository.find_teacher_by_employee_id(teacher_id)
        if not teacher:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Teacher not found")

        update_dict = data.model_dump(exclude_unset=True)
        if "name" not in update_dict and ("firstName" in update_dict or "lastName" in update_dict):
            fn = update_dict.get("firstName", teacher.get("firstName", ""))
            ln = update_dict.get("lastName", teacher.get("lastName", ""))
            update_dict["name"] = f"{fn} {ln}".strip()

        updated_profile = await AdminRepository.update_teacher_profile(teacher["id"], update_dict)

        # If status updated, sync with linked user account
        if "status" in update_dict:
            users = await UserRepository.find_all({"profileId": teacher["id"]})
            for u in users:
                await UserRepository.update_user(u["id"], {"status": update_dict["status"].upper()})

        return AdminApiResponse(
            success=True,
            message="Teacher profile updated successfully",
            data=updated_profile,
        )

    @classmethod
    async def update_teacher_status(cls, teacher_id: str, new_status: str) -> AdminApiResponse:
        valid_status = new_status.strip().upper()
        if valid_status not in ["ACTIVE", "INACTIVE"]:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Status must be 'ACTIVE' or 'INACTIVE'")

        teacher = await AdminRepository.find_teacher_by_id(teacher_id)
        if not teacher:
            teacher = await AdminRepository.find_teacher_by_employee_id(teacher_id)
        if not teacher:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Teacher not found")

        updated = await AdminRepository.update_teacher_profile(teacher["id"], {"status": valid_status})

        # Sync linked user
        users = await UserRepository.find_all()
        for u in users:
            if u.get("profileId") == teacher["id"] or u.get("email") == teacher.get("email"):
                await UserRepository.update_user(u["id"], {"status": valid_status})

        return AdminApiResponse(
            success=True,
            message=f"Teacher account status changed to {valid_status}",
            data=updated,
        )

    @classmethod
    async def reset_teacher_password(cls, teacher_id: str, new_password: Optional[str]) -> AdminApiResponse:
        teacher = await AdminRepository.find_teacher_by_id(teacher_id)
        if not teacher:
            teacher = await AdminRepository.find_teacher_by_employee_id(teacher_id)
        if not teacher:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Teacher not found")

        users = await UserRepository.find_all()
        target_user = None
        for u in users:
            if u.get("profileId") == teacher["id"] or u.get("email") == teacher.get("email"):
                target_user = u
                break

        if not target_user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Linked login user account not found")

        pwd_to_set = new_password or generate_temp_password("GIS@TCH")
        hashed_pwd = get_password_hash(pwd_to_set)

        await UserRepository.update_user(target_user["id"], {"passwordHash": hashed_pwd})

        return AdminApiResponse(
            success=True,
            message="Teacher password reset successfully. Temporary credentials generated.",
            data={
                "userId": target_user["id"],
                "name": teacher["name"],
                "email": teacher["email"],
                "temporaryPassword": pwd_to_set,
            },
        )

    # ── Student Management ──
    @classmethod
    async def create_student(cls, data: CreateStudentRequest, admin_user: Dict[str, Any]) -> AdminApiResponse:
        email = data.email.strip().lower()
        adm_no = data.admissionNumber.strip().upper()

        full_name = data.name or f"{(data.firstName or '').strip()} {(data.lastName or '').strip()}".strip()
        if not full_name:
            full_name = "Enrolled Student"

        # 1. Duplicate email check
        existing_user = await UserRepository.find_by_email(email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email is already registered in the institutional registry",
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
            "name": full_name,
            "firstName": data.firstName,
            "lastName": data.lastName,
            "email": email,
            "personalEmail": data.personalEmail,
            "admissionNumber": adm_no,
            "admissionDate": data.admissionDate,
            "className": data.className,
            "section": data.section or "A",
            "rollNumber": data.rollNumber or 1,
            "academicYear": data.academicYear or "2026–27",
            "dateOfBirth": data.dateOfBirth,
            "gender": data.gender,
            "phone": data.phone,
            "address": data.address,
            "city": data.city,
            "state": data.state,
            "pincode": data.pincode,
            "guardianName": data.guardianName,
            "relationship": data.relationship,
            "guardianPhone": data.guardianPhone,
            "guardianEmail": data.guardianEmail,
            "guardianAddress": data.guardianAddress,
            "status": data.status.upper(),
        })

        # 4. Generate / set temporary password
        raw_password = data.initialPassword if (data.initialPassword and data.initialPassword.strip()) else generate_temp_password("GIS@STU")
        hashed_password = get_password_hash(raw_password)

        # 5. Create User account with role = STUDENT
        admin_id = admin_user.get("userId") or admin_user.get("id") or "ADMIN"
        user_account = await UserRepository.create_user({
            "name": full_name,
            "email": email,
            "username": data.username or email,
            "passwordHash": hashed_password,
            "role": "STUDENT",
            "status": data.status.upper(),
            "profileId": student_profile["id"],
            "createdBy": admin_id,
        })

        return AdminApiResponse(
            success=True,
            message="Student registered successfully",
            data={
                "userId": user_account["id"],
                "studentId": student_profile["id"],
                "name": full_name,
                "email": email,
                "username": data.username or email,
                "admissionNumber": adm_no,
                "className": data.className,
                "temporaryPassword": raw_password,
                "role": "STUDENT",
                "status": data.status.upper(),
            },
        )

    @classmethod
    async def list_students(cls, search: Optional[str] = None, class_name: Optional[str] = None, status_filter: Optional[str] = None) -> AdminApiResponse:
        students = await AdminRepository.find_all_students()

        if search:
            q = search.lower().strip()
            students = [
                s for s in students
                if q in s.get("name", "").lower()
                or q in s.get("email", "").lower()
                or q in s.get("admissionNumber", "").lower()
                or q in s.get("className", "").lower()
            ]

        if class_name and class_name != "All":
            students = [s for s in students if s.get("className") == class_name]

        if status_filter and status_filter != "All":
            students = [s for s in students if s.get("status", "ACTIVE").upper() == status_filter.upper()]

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

    @classmethod
    async def update_student(cls, student_id: str, data: UpdateStudentRequest) -> AdminApiResponse:
        student = await AdminRepository.find_student_by_id(student_id)
        if not student:
            student = await AdminRepository.find_student_by_admission_number(student_id)
        if not student:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")

        update_dict = data.model_dump(exclude_unset=True)
        if "name" not in update_dict and ("firstName" in update_dict or "lastName" in update_dict):
            fn = update_dict.get("firstName", student.get("firstName", ""))
            ln = update_dict.get("lastName", student.get("lastName", ""))
            update_dict["name"] = f"{fn} {ln}".strip()

        updated_profile = await AdminRepository.update_student_profile(student["id"], update_dict)

        if "status" in update_dict:
            users = await UserRepository.find_all({"profileId": student["id"]})
            for u in users:
                await UserRepository.update_user(u["id"], {"status": update_dict["status"].upper()})

        return AdminApiResponse(
            success=True,
            message="Student profile updated successfully",
            data=updated_profile,
        )

    @classmethod
    async def update_student_status(cls, student_id: str, new_status: str) -> AdminApiResponse:
        valid_status = new_status.strip().upper()
        if valid_status not in ["ACTIVE", "INACTIVE"]:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Status must be 'ACTIVE' or 'INACTIVE'")

        student = await AdminRepository.find_student_by_id(student_id)
        if not student:
            student = await AdminRepository.find_student_by_admission_number(student_id)
        if not student:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")

        updated = await AdminRepository.update_student_profile(student["id"], {"status": valid_status})

        # Sync linked user
        users = await UserRepository.find_all()
        for u in users:
            if u.get("profileId") == student["id"] or u.get("email") == student.get("email"):
                await UserRepository.update_user(u["id"], {"status": valid_status})

        return AdminApiResponse(
            success=True,
            message=f"Student account status changed to {valid_status}",
            data=updated,
        )

    @classmethod
    async def reset_student_password(cls, student_id: str, new_password: Optional[str]) -> AdminApiResponse:
        student = await AdminRepository.find_student_by_id(student_id)
        if not student:
            student = await AdminRepository.find_student_by_admission_number(student_id)
        if not student:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")

        users = await UserRepository.find_all()
        target_user = None
        for u in users:
            if u.get("profileId") == student["id"] or u.get("email") == student.get("email"):
                target_user = u
                break

        if not target_user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Linked login user account not found")

        pwd_to_set = new_password or generate_temp_password("GIS@STU")
        hashed_pwd = get_password_hash(pwd_to_set)

        await UserRepository.update_user(target_user["id"], {"passwordHash": hashed_pwd})

        return AdminApiResponse(
            success=True,
            message="Student password reset successfully. Temporary credentials generated.",
            data={
                "userId": target_user["id"],
                "name": student["name"],
                "email": student["email"],
                "temporaryPassword": pwd_to_set,
            },
        )

    # ── User Account Lifecycle ──
    @classmethod
    async def list_users(cls, role: Optional[str] = None, status_filter: Optional[str] = None) -> AdminApiResponse:
        query = {}
        if role:
            query["role"] = role.upper()
        if status_filter:
            query["status"] = status_filter.upper()

        users = await UserRepository.find_all(query)
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

        pwd_to_set = new_password or generate_temp_password("GIS@")
        hashed_pwd = get_password_hash(pwd_to_set)

        await UserRepository.update_user(user_id, {"passwordHash": hashed_pwd})

        return AdminApiResponse(
            success=True,
            message="Password reset successfully. New hash stored securely.",
            data={
                "userId": user_id,
                "email": user["email"],
                "temporaryPassword": pwd_to_set,
            },
        )
