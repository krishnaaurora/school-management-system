from typing import List, Dict, Any
from fastapi import HTTPException, status
from app.modules.students.schemas import StudentCreate, StudentResponse
from app.modules.students.service import StudentsService


class StudentController:
    @staticmethod
    async def list_students() -> List[Dict[str, Any]]:
        return StudentsService.get_all()

    @staticmethod
    async def get_student_by_id(student_id: str) -> Dict[str, Any]:
        student = StudentsService.get_by_id(student_id)
        if not student:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
        return student

    @staticmethod
    async def enroll_student(data: StudentCreate) -> Dict[str, Any]:
        return StudentsService.create(data)
