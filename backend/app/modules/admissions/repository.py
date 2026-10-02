from typing import List, Optional, Dict, Any

_INQUIRIES_STORE: List[Dict[str, Any]] = [
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


class AdmissionRepository:
    @staticmethod
    def find_all() -> List[Dict[str, Any]]:
        return _INQUIRIES_STORE

    @staticmethod
    def insert(inquiry: Dict[str, Any]) -> Dict[str, Any]:
        _INQUIRIES_STORE.insert(0, inquiry)
        return inquiry
