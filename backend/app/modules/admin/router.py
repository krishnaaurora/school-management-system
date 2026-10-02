from typing import Optional
from fastapi import APIRouter, Depends, status
from app.core.dependencies import require_roles
from app.modules.admin.schemas import (
    CreateTeacherRequest,
    CreateStudentRequest,
    UpdateUserStatusRequest,
    ResetPasswordRequest,
    AdminApiResponse,
)
from app.modules.admin.service import AdminService

admin_router = APIRouter(prefix="/admin", tags=["Administration & User Governance"])


# ── Teacher Management ──
@admin_router.post(
    "/teachers",
    response_model=AdminApiResponse,
    summary="Admin provisions a new Teacher profile & User account",
)
async def create_teacher(
    data: CreateTeacherRequest,
    current_admin: dict = Depends(require_roles("ADMIN")),
):
    return await AdminService.create_teacher(data, current_admin)


@admin_router.get(
    "/teachers",
    response_model=AdminApiResponse,
    summary="Admin lists all verified teachers",
)
async def list_teachers(current_admin: dict = Depends(require_roles("ADMIN"))):
    return await AdminService.list_teachers()


@admin_router.get(
    "/teachers/{teacher_id}",
    response_model=AdminApiResponse,
    summary="Admin retrieves teacher details by ID or Employee ID",
)
async def get_teacher(
    teacher_id: str,
    current_admin: dict = Depends(require_roles("ADMIN")),
):
    return await AdminService.get_teacher(teacher_id)


# ── Student Management ──
@admin_router.post(
    "/students",
    response_model=AdminApiResponse,
    summary="Admin provisions a new Student profile & User account",
)
async def create_student(
    data: CreateStudentRequest,
    current_admin: dict = Depends(require_roles("ADMIN")),
):
    return await AdminService.create_student(data, current_admin)


@admin_router.get(
    "/students",
    response_model=AdminApiResponse,
    summary="Admin lists all enrolled students",
)
async def list_students(current_admin: dict = Depends(require_roles("ADMIN"))):
    return await AdminService.list_students()


@admin_router.get(
    "/students/{student_id}",
    response_model=AdminApiResponse,
    summary="Admin retrieves student details by ID or Admission Number",
)
async def get_student(
    student_id: str,
    current_admin: dict = Depends(require_roles("ADMIN")),
):
    return await AdminService.get_student(student_id)


# ── User Account Lifecycle & RBAC Management ──
@admin_router.get(
    "/users",
    response_model=AdminApiResponse,
    summary="Admin lists/searches user accounts across all roles",
)
async def list_users(
    role: Optional[str] = None,
    status: Optional[str] = None,
    current_admin: dict = Depends(require_roles("ADMIN")),
):
    return await AdminService.list_users(role=role, status_filter=status)


@admin_router.patch(
    "/users/{user_id}/status",
    response_model=AdminApiResponse,
    summary="Admin activates or deactivates a user account",
)
async def update_user_status(
    user_id: str,
    data: UpdateUserStatusRequest,
    current_admin: dict = Depends(require_roles("ADMIN")),
):
    return await AdminService.update_user_status(user_id, data.status)


@admin_router.post(
    "/users/{user_id}/reset-password",
    response_model=AdminApiResponse,
    summary="Admin resets a user password (stores secure hash, never reveals previous)",
)
async def reset_password(
    user_id: str,
    data: ResetPasswordRequest,
    current_admin: dict = Depends(require_roles("ADMIN")),
):
    return await AdminService.reset_password(user_id, data.newPassword)


# ── Admin Dashboard Metrics ──
@admin_router.get(
    "/dashboard",
    response_model=AdminApiResponse,
    summary="Admin dashboard operational summary",
)
async def get_admin_dashboard(current_admin: dict = Depends(require_roles("ADMIN"))):
    teachers_res = await AdminService.list_teachers()
    students_res = await AdminService.list_students()
    users_res = await AdminService.list_users()

    return AdminApiResponse(
        success=True,
        message="Admin operational dashboard metrics",
        data={
            "totalTeachers": len(teachers_res.data or []),
            "totalStudents": len(students_res.data or []),
            "totalUsers": len(users_res.data or []),
            "adminName": current_admin.get("name"),
            "adminEmail": current_admin.get("email"),
            "activeLeaveRequests": 1,
            "substituteCoverages": 3,
        },
    )
