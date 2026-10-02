from typing import List, Dict, Any
from fastapi import APIRouter, Depends, status
from app.modules.teachers.schemas import TeacherCreate, TeacherUpdate, TeacherResponse
from app.modules.teachers.controller import TeacherController
from app.core.dependencies import get_current_user, require_roles

router = APIRouter(prefix="/teachers", tags=["Teachers Management"])


@router.get("", response_model=List[TeacherResponse], summary="List all faculty members")
async def list_teachers(current_user: Dict[str, Any] = Depends(get_current_user)):
    return await TeacherController.list_teachers()


@router.get("/{teacher_id}", response_model=TeacherResponse, summary="Get teacher details")
async def get_teacher(teacher_id: str, current_user: Dict[str, Any] = Depends(get_current_user)):
    return await TeacherController.get_teacher_by_id(teacher_id)


@router.post("", response_model=TeacherResponse, status_code=status.HTTP_201_CREATED, summary="Add new teacher")
async def create_teacher(
    data: TeacherCreate,
    current_user: Dict[str, Any] = Depends(require_roles("admin", "principal")),
):
    return await TeacherController.create_teacher(data)


@router.put("/{teacher_id}", response_model=TeacherResponse, summary="Update teacher")
async def update_teacher(
    teacher_id: str,
    data: TeacherUpdate,
    current_user: Dict[str, Any] = Depends(require_roles("admin", "principal", "viceprincipal")),
):
    return await TeacherController.update_teacher(teacher_id, data)
