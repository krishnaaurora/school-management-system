from typing import List, Dict, Any
from fastapi import APIRouter, Depends, status
from app.modules.students.schemas import StudentCreate, StudentResponse
from app.modules.students.controller import StudentController
from app.core.dependencies import get_current_user, require_roles

router = APIRouter(prefix="/students", tags=["Students Directory"])


@router.get("", response_model=List[StudentResponse], summary="List all students")
async def list_students(current_user: Dict[str, Any] = Depends(get_current_user)):
    return await StudentController.list_students()


@router.get("/{student_id}", response_model=StudentResponse, summary="Get student profile")
async def get_student(student_id: str, current_user: Dict[str, Any] = Depends(get_current_user)):
    return await StudentController.get_student_by_id(student_id)


@router.post("", response_model=StudentResponse, status_code=status.HTTP_201_CREATED, summary="Enroll new student")
async def enroll_student(
    data: StudentCreate,
    current_user: Dict[str, Any] = Depends(require_roles("admin", "principal")),
):
    return await StudentController.enroll_student(data)
