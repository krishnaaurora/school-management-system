from typing import List, Dict, Any
from app.modules.admissions.schemas import AdmissionInquiryCreate
from app.modules.admissions.service import AdmissionsService


class AdmissionController:
    @staticmethod
    async def list_inquiries() -> List[Dict[str, Any]]:
        return AdmissionsService.get_all()

    @staticmethod
    async def submit_inquiry(data: AdmissionInquiryCreate) -> Dict[str, Any]:
        return await AdmissionsService.create(data)
