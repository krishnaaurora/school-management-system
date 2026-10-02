from typing import List, Dict, Any
from fastapi import APIRouter, Depends, status
from app.modules.admissions.schemas import AdmissionInquiryCreate, AdmissionInquiryResponse
from app.modules.admissions.controller import AdmissionController
from app.core.dependencies import get_current_user, require_roles

router = APIRouter(prefix="/admissions", tags=["Admissions & Intake"])


@router.get("/inquiries", response_model=List[AdmissionInquiryResponse], summary="List intake applications (Admin)")
async def list_inquiries(
    current_user: Dict[str, Any] = Depends(require_roles("admin", "principal")),
):
    return await AdmissionController.list_inquiries()


@router.post("/inquire", response_model=AdmissionInquiryResponse, status_code=status.HTTP_201_CREATED, summary="Submit admission inquiry")
async def submit_inquiry(data: AdmissionInquiryCreate):
    return await AdmissionController.submit_inquiry(data)
