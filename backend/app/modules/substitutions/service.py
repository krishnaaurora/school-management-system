from typing import List, Optional, Dict, Any
from app.modules.substitutions.schemas import SubstitutionAssign
from app.core.events import event_bus, Events

SUBSTITUTIONS_DB: List[Dict[str, Any]] = [
    {
        "id": "SUB-2026-101",
        "leave_id": "LV-2026-089",
        "original_teacher": "Mr. Kiran Sharma",
        "period": "Period 1 (08:30 - 09:15)",
        "class_name": "Grade 10-A",
        "subject": "Mathematics",
        "room": "Room 302",
        "date": "2026-10-02",
        "recommended_teacher": "Mr. Arvind Swaminathan",
        "recommended_teacher_id": "T-103",
        "score": 96,
        "status": "Assigned",
        "reasoning": "Zero timetable conflict, identical subject syllabus expertise (CBSE Class 10 Math), current load 26/30.",
        "notes": None
    },
    {
        "id": "SUB-2026-102",
        "leave_id": "LV-2026-089",
        "original_teacher": "Mr. Kiran Sharma",
        "period": "Period 3 (10:15 - 11:00)",
        "class_name": "Grade 12-Science",
        "subject": "Pure Mathematics",
        "room": "Math Lab B",
        "date": "2026-10-02",
        "recommended_teacher": "Mr. Rajesh Kumar",
        "recommended_teacher_id": "T-101",
        "score": 89,
        "status": "Pending Confirmation",
        "reasoning": "STEM department affinity, free during Period 3, comfortable with Advanced Math & Physics integration.",
        "notes": None
    },
    {
        "id": "SUB-2026-103",
        "leave_id": "LV-2026-088",
        "original_teacher": "Dr. Sunita Menon",
        "period": "Period 2 (09:15 - 10:00)",
        "class_name": "Grade 12-Science",
        "subject": "Organic Chemistry",
        "room": "Chemistry Lab",
        "date": "2026-10-03",
        "recommended_teacher": "Dr. Shalini Gupta",
        "recommended_teacher_id": "T-108",
        "score": 94,
        "status": "Pending Confirmation",
        "reasoning": "Senior Science Dept faculty, lab safety certified, 18/24 weekly periods currently assigned.",
        "notes": None
    }
]


class SubstitutionsService:
    @staticmethod
    def get_all() -> List[Dict[str, Any]]:
        return SUBSTITUTIONS_DB

    @staticmethod
    def get_by_leave_id(leave_id: str) -> List[Dict[str, Any]]:
        return [s for s in SUBSTITUTIONS_DB if s["leave_id"] == leave_id]

    @staticmethod
    async def assign(sub_id: str, data: SubstitutionAssign) -> Optional[Dict[str, Any]]:
        for s in SUBSTITUTIONS_DB:
            if s["id"] == sub_id:
                if data.substitute_teacher_id:
                    s["recommended_teacher_id"] = data.substitute_teacher_id
                if data.substitute_teacher_name:
                    s["recommended_teacher"] = data.substitute_teacher_name
                if data.notes:
                    s["notes"] = data.notes
                s["status"] = "Confirmed & Dispatched"
                await event_bus.publish(Events.SUBSTITUTION_ASSIGNED, s)
                return s
        return None
