from typing import List, Dict, Any, Optional
from fastapi import HTTPException, status
from app.modules.teachers.schemas import TeacherCreate, TeacherUpdate, TeacherResponse
from app.modules.teachers.service import TeachersService


class TeacherController:
    @staticmethod
    async def list_teachers() -> List[Dict[str, Any]]:
        return TeachersService.get_all()

    @staticmethod
    async def get_teacher_by_id(teacher_id: str) -> Dict[str, Any]:
        teacher = TeachersService.get_by_id(teacher_id)
        if not teacher:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Teacher not found")
        return teacher

    @staticmethod
    async def create_teacher(data: TeacherCreate) -> Dict[str, Any]:
        return TeachersService.create(data)

    @staticmethod
    async def update_teacher(teacher_id: str, data: TeacherUpdate) -> Dict[str, Any]:
        updated = TeachersService.update(teacher_id, data)
        if not updated:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Teacher not found")
        return updated
