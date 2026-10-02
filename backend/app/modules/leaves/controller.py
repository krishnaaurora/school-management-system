from typing import List, Dict, Any
from fastapi import HTTPException, status
from app.modules.leaves.schemas import LeaveCreate, LeaveStatusUpdate, LeaveResponse
from app.modules.leaves.service import LeavesService


class LeaveController:
    @staticmethod
    async def list_leaves() -> List[Dict[str, Any]]:
        return LeavesService.get_all()

    @staticmethod
    async def get_leave_by_id(leave_id: str) -> Dict[str, Any]:
        leave = LeavesService.get_by_id(leave_id)
        if not leave:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Leave request not found")
        return leave

    @staticmethod
    async def submit_leave(data: LeaveCreate) -> Dict[str, Any]:
        return await LeavesService.create(data)

    @staticmethod
    async def update_leave_status(leave_id: str, data: LeaveStatusUpdate) -> Dict[str, Any]:
        updated = await LeavesService.update_status(leave_id, data)
        if not updated:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Leave request not found")
        return updated
