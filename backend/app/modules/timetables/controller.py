from typing import List, Dict, Any
from fastapi import HTTPException, status
from app.modules.timetables.schemas import PeriodResponse, PeriodUpdate
from app.modules.timetables.service import TimetablesService


class TimetableController:
    @staticmethod
    async def get_schedule() -> List[Dict[str, Any]]:
        return TimetablesService.get_all()

    @staticmethod
    async def update_period(period_id: str, data: PeriodUpdate) -> Dict[str, Any]:
        updated = TimetablesService.update_period(period_id, data)
        if not updated:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Period not found")
        return updated
