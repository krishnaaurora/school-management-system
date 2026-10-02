from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from app.modules.teachers.schemas import TeacherCreate, TeacherUpdate, TeacherResponse
from app.modules.teachers.service import TeachersService
from app.core.dependencies import get_current_user, require_roles

router = APIRouter(prefix="/teachers", tags=["Teachers Management"])


@router.get("", response_model=List[TeacherResponse], summary="List all faculty members")
async def list_teachers(current_user: Dict[str, Any] = Depends(get_current_user)):
    return TeachersService.get_all()


@router.get("/{teacher_id}", response_model=TeacherResponse, summary="Get teacher details")
async def get_teacher(teacher_id: str, current_user: Dict[str, Any] = Depends(get_current_user)):
    teacher = TeachersService.get_by_id(teacher_id)
    if not teacher:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Teacher not found")
    return teacher


@router.post("", response_model=TeacherResponse, status_code=status.HTTP_201_CREATED, summary="Add new teacher")
async def create_teacher(
    data: TeacherCreate,
    current_user: Dict[str, Any] = Depends(require_roles("admin", "principal")),
):
    return TeachersService.create(data)


@router.put("/{teacher_id}", response_model=TeacherResponse, summary="Update teacher")
async def update_teacher(
    teacher_id: str,
    data: TeacherUpdate,
    current_user: Dict[str, Any] = Depends(require_roles("admin", "principal", "viceprincipal")),
):
    updated = TeachersService.update(teacher_id, data)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Teacher not found")
    return updated
