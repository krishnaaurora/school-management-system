from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from app.modules.substitutions.schemas import SubstitutionResponse, SubstitutionAssign
from app.modules.substitutions.service import SubstitutionsService
from app.core.dependencies import get_current_user, require_roles

router = APIRouter(prefix="/substitutions", tags=["AI Substitution Matchmaker"])


@router.get("", response_model=List[SubstitutionResponse], summary="List all substitution allocations")
async def list_substitutions(current_user: Dict[str, Any] = Depends(get_current_user)):
    return SubstitutionsService.get_all()


@router.get("/leave/{leave_id}", response_model=List[SubstitutionResponse], summary="Get recommendations for a leave request")
async def get_by_leave(leave_id: str, current_user: Dict[str, Any] = Depends(get_current_user)):
    return SubstitutionsService.get_by_leave_id(leave_id)


@router.patch("/{sub_id}/assign", response_model=SubstitutionResponse, summary="Assign and dispatch substitute teacher")
async def assign_substitute(
    sub_id: str,
    data: SubstitutionAssign,
    current_user: Dict[str, Any] = Depends(require_roles("admin", "principal", "viceprincipal")),
):
    assigned = await SubstitutionsService.assign(sub_id, data)
    if not assigned:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Substitution assignment not found")
    return assigned
