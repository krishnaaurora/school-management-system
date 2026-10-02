from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from app.modules.timetables.schemas import PeriodResponse, PeriodUpdate
from app.modules.timetables.service import TimetablesService
from app.core.dependencies import get_current_user, require_roles

router = APIRouter(prefix="/timetables", tags=["Live Master Timetable"])


@router.get("", response_model=List[PeriodResponse], summary="Get live daily schedule")
async def get_schedule(current_user: Dict[str, Any] = Depends(get_current_user)):
    return TimetablesService.get_all()


@router.patch("/{period_id}", response_model=PeriodResponse, summary="Update period details")
async def update_period(
    period_id: str,
    data: PeriodUpdate,
    current_user: Dict[str, Any] = Depends(require_roles("admin", "principal", "viceprincipal")),
):
    updated = TimetablesService.update_period(period_id, data)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Period not found")
    return updated
