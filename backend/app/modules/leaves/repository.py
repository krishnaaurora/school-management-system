from typing import List, Optional, Dict, Any

_LEAVES_STORE: List[Dict[str, Any]] = [
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


class LeaveRepository:
    @staticmethod
    def find_all() -> List[Dict[str, Any]]:
        return _LEAVES_STORE

    @staticmethod
    def find_by_id(leave_id: str) -> Optional[Dict[str, Any]]:
        for l in _LEAVES_STORE:
            if l["id"] == leave_id:
                return l
        return None

    @staticmethod
    def insert(leave: Dict[str, Any]) -> Dict[str, Any]:
        _LEAVES_STORE.insert(0, leave)
        return leave
