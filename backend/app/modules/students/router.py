from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from app.modules.students.schemas import StudentCreate, StudentResponse
from app.modules.students.service import StudentsService
from app.core.dependencies import get_current_user, require_roles

router = APIRouter(prefix="/students", tags=["Students Directory"])


@router.get("", response_model=List[StudentResponse], summary="List all students")
async def list_students(current_user: Dict[str, Any] = Depends(get_current_user)):
    return StudentsService.get_all()


@router.get("/{student_id}", response_model=StudentResponse, summary="Get student profile")
async def get_student(student_id: str, current_user: Dict[str, Any] = Depends(get_current_user)):
    student = StudentsService.get_by_id(student_id)
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    return student


@router.post("", response_model=StudentResponse, status_code=status.HTTP_201_CREATED, summary="Enroll new student")
async def enroll_student(
    data: StudentCreate,
    current_user: Dict[str, Any] = Depends(require_roles("admin", "principal")),
):
    return StudentsService.create(data)
