from typing import List, Optional, Dict, Any

_SUBSTITUTIONS_STORE: List[Dict[str, Any]] = [
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


class SubstitutionRepository:
    @staticmethod
    def find_all() -> List[Dict[str, Any]]:
        return _SUBSTITUTIONS_STORE

    @staticmethod
    def find_by_leave_id(leave_id: str) -> List[Dict[str, Any]]:
        return [s for s in _SUBSTITUTIONS_STORE if s["leave_id"] == leave_id]
