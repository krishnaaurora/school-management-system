from typing import List, Optional, Dict, Any
from app.modules.students.schemas import StudentCreate

STUDENTS_DB: List[Dict[str, Any]] = [
    {"id": "S-2024-001", "name": "Aarav Sharma", "grade": "Grade 10", "section": "A", "roll_no": "10A-01", "attendance": "96%", "gpa": "3.92", "parent_name": "Mr. Rajesh Sharma", "fee_status": "Paid"},
    {"id": "S-2024-002", "name": "Ananya Reddy", "grade": "Grade 10", "section": "A", "roll_no": "10A-02", "attendance": "98%", "gpa": "4.00", "parent_name": "Dr. Suresh Reddy", "fee_status": "Paid"},
    {"id": "S-2024-003", "name": "Rohan Mehta", "grade": "Grade 10", "section": "B", "roll_no": "10B-01", "attendance": "92%", "gpa": "3.65", "parent_name": "Mrs. Neha Mehta", "fee_status": "Pending"},
    {"id": "S-2024-004", "name": "Diya Patel", "grade": "Grade 11", "section": "A", "roll_no": "11A-04", "attendance": "95%", "gpa": "3.88", "parent_name": "Mr. Vikram Patel", "fee_status": "Paid"},
    {"id": "S-2024-005", "name": "Vihaan Joshi", "grade": "Grade 11", "section": "B", "roll_no": "11B-07", "attendance": "89%", "gpa": "3.42", "parent_name": "Mr. Alok Joshi", "fee_status": "Overdue"},
    {"id": "S-2024-006", "name": "Ishaan Verma", "grade": "Grade 12", "section": "A", "roll_no": "12A-03", "attendance": "97%", "gpa": "3.95", "parent_name": "Mrs. Sunita Verma", "fee_status": "Paid"},
    {"id": "S-2024-007", "name": "Saanvi Iyer", "grade": "Grade 12", "section": "B", "roll_no": "12B-02", "attendance": "99%", "gpa": "4.00", "parent_name": "Mr. R. Iyer", "fee_status": "Paid"}
]


class StudentsService:
    @staticmethod
    def get_all() -> List[Dict[str, Any]]:
        return STUDENTS_DB

    @staticmethod
    def get_by_id(student_id: str) -> Optional[Dict[str, Any]]:
        for s in STUDENTS_DB:
            if s["id"] == student_id:
                return s
        return None

    @staticmethod
    def create(data: StudentCreate) -> Dict[str, Any]:
        new_id = f"S-2026-{str(len(STUDENTS_DB) + 1).zfill(3)}"
        record = {"id": new_id, **data.model_dump()}
        STUDENTS_DB.append(record)
        return record
