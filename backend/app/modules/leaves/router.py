from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from app.modules.leaves.schemas import LeaveCreate, LeaveStatusUpdate, LeaveResponse
from app.modules.leaves.service import LeavesService
from app.core.dependencies import get_current_user, require_roles

router = APIRouter(prefix="/leaves", tags=["Leaves Management & AI Workflow"])


@router.get("", response_model=List[LeaveResponse], summary="List all leave applications")
async def list_leaves(current_user: Dict[str, Any] = Depends(get_current_user)):
    return LeavesService.get_all()


@router.get("/{leave_id}", response_model=LeaveResponse, summary="Get leave request details")
async def get_leave(leave_id: str, current_user: Dict[str, Any] = Depends(get_current_user)):
    leave = LeavesService.get_by_id(leave_id)
    if not leave:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Leave request not found")
    return leave


@router.post("", response_model=LeaveResponse, status_code=status.HTTP_201_CREATED, summary="Submit leave request")
async def submit_leave(
    data: LeaveCreate,
    current_user: Dict[str, Any] = Depends(get_current_user),
):
    return await LeavesService.create(data)


@router.patch("/{leave_id}/status", response_model=LeaveResponse, summary="Approve/Reject leave request")
async def update_leave_status(
    leave_id: str,
    data: LeaveStatusUpdate,
    current_user: Dict[str, Any] = Depends(require_roles("admin", "principal", "viceprincipal")),
):
    updated = await LeavesService.update_status(leave_id, data)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Leave request not found")
    return updated
