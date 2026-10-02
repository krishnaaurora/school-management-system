from datetime import datetime
from typing import List, Optional, Dict, Any
from app.modules.leaves.schemas import LeaveCreate, LeaveStatusUpdate
from app.core.events import event_bus, Events

LEAVES_DB: List[Dict[str, Any]] = [
    {
        "id": "LV-2026-089",
        "teacher_id": "T-107",
        "teacher_name": "Mr. Kiran Sharma",
        "subject": "Applied Mathematics",
        "department": "Mathematics",
        "dates": "Oct 02 - Oct 04 (3 Days)",
        "reason": "Medical Emergency (Surgical Procedure)",
        "type": "Medical Leave",
        "status": "Pending Review",
        "applied_on": "2026-10-01 18:30",
        "impact_level": "High",
        "affected_classes": [
            {"period": "Period 1 (08:30 - 09:15)", "class_name": "Grade 10-A", "room": "Room 302", "status": "Unassigned"},
            {"period": "Period 3 (10:15 - 11:00)", "class_name": "Grade 12-Science", "room": "Math Lab B", "status": "Unassigned"},
            {"period": "Period 5 (12:30 - 01:15)", "class_name": "Grade 11-A", "room": "Room 204", "status": "Unassigned"}
        ],
        "admin_notes": None,
        "substitute_plan": None
    },
    {
        "id": "LV-2026-088",
        "teacher_id": "T-102",
        "teacher_name": "Dr. Sunita Menon",
        "subject": "Organic Chemistry",
        "department": "Science",
        "dates": "Oct 03 (1 Day)",
        "reason": "National CBSE Chemistry Symposium",
        "type": "Duty Leave",
        "status": "Pending Review",
        "applied_on": "2026-10-01 14:15",
        "impact_level": "Moderate",
        "affected_classes": [
            {"period": "Period 2 (09:15 - 10:00)", "class_name": "Grade 12-Science", "room": "Chemistry Lab", "status": "Unassigned"},
            {"period": "Period 6 (01:15 - 02:00)", "class_name": "Grade 11-B", "room": "Room 108", "status": "Unassigned"}
        ],
        "admin_notes": None,
        "substitute_plan": None
    }
]


class LeavesService:
    @staticmethod
    def get_all() -> List[Dict[str, Any]]:
        return LEAVES_DB

    @staticmethod
    def get_by_id(leave_id: str) -> Optional[Dict[str, Any]]:
        for l in LEAVES_DB:
            if l["id"] == leave_id:
                return l
        return None

    @staticmethod
    async def create(data: LeaveCreate) -> Dict[str, Any]:
        new_id = f"LV-2026-{str(len(LEAVES_DB) + 90).zfill(3)}"
        record = {
            "id": new_id,
            "status": "Pending Review",
            "applied_on": datetime.now().strftime("%Y-%m-%d %H:%M"),
            "admin_notes": None,
            "substitute_plan": None,
            **data.model_dump(),
        }
        LEAVES_DB.insert(0, record)
        await event_bus.publish(Events.LEAVE_REQUESTED, record)
        return record

    @staticmethod
    async def update_status(leave_id: str, data: LeaveStatusUpdate) -> Optional[Dict[str, Any]]:
        for l in LEAVES_DB:
            if l["id"] == leave_id:
                l["status"] = data.status
                if data.admin_notes:
                    l["admin_notes"] = data.admin_notes
                if data.substitute_plan:
                    l["substitute_plan"] = data.substitute_plan

                if data.status == "Approved":
                    await event_bus.publish(Events.LEAVE_APPROVED, l)
                elif data.status == "Rejected":
                    await event_bus.publish(Events.LEAVE_REJECTED, l)

                return l
        return None
