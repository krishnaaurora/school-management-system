from datetime import datetime
from typing import List, Optional, Dict, Any
from app.modules.admissions.schemas import AdmissionInquiryCreate
from app.core.events import event_bus, Events

INQUIRIES_DB: List[Dict[str, Any]] = [
    {
        "id": "ADM-2026-001",
        "student_name": "Aanya Kulkarni",
        "grade_applying_for": "Grade 6",
        "parent_name": "Mr. Rohan Kulkarni",
        "parent_email": "rohan.k@gmail.com",
        "parent_phone": "+91 98765 43210",
        "status": "In Review",
        "submitted_at": "2026-10-01 11:20",
    },
    {
        "id": "ADM-2026-002",
        "student_name": "Devansh Saxena",
        "grade_applying_for": "Grade 9",
        "parent_name": "Mrs. Neha Saxena",
        "parent_email": "neha.saxena@outlook.com",
        "parent_phone": "+91 98112 34567",
        "status": "Interview Scheduled",
        "submitted_at": "2026-10-02 09:15",
    }
]


class AdmissionsService:
    @staticmethod
    def get_all() -> List[Dict[str, Any]]:
        return INQUIRIES_DB

    @staticmethod
    async def create(data: AdmissionInquiryCreate) -> Dict[str, Any]:
        new_id = f"ADM-2026-{str(len(INQUIRIES_DB) + 1).zfill(3)}"
        record = {
            "id": new_id,
            "status": "Submitted",
            "submitted_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
            **data.model_dump(),
        }
        INQUIRIES_DB.insert(0, record)
        await event_bus.publish(Events.ADMISSION_SUBMITTED, record)
        return record
