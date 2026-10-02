from typing import List, Optional, Dict, Any
from app.modules.timetables.schemas import PeriodUpdate

TIMETABLE_PERIODS: List[Dict[str, Any]] = [
    {"id": "P-1", "period": "Period 1", "time": "08:30 - 09:15", "class_name": "Grade 10-A", "subject": "Mathematics", "teacher": "Mr. Arvind Swaminathan (Sub)", "room": "Room 302", "status": "Substituted", "impact": "Covered"},
    {"id": "P-2", "period": "Period 2", "time": "09:15 - 10:00", "class_name": "Grade 11-Science", "subject": "Organic Chemistry", "teacher": "Dr. Sunita Menon", "room": "Chemistry Lab", "status": "Normal", "impact": "None"},
    {"id": "P-3", "period": "Period 3", "time": "10:15 - 11:00", "class_name": "Grade 12-Science", "subject": "Pure Mathematics", "teacher": "Pending Assignment", "room": "Math Lab B", "status": "Critical Alert", "impact": "Uncovered"},
    {"id": "P-4", "period": "Period 4", "time": "11:00 - 11:45", "class_name": "Grade 9-B", "subject": "English Literature", "teacher": "Mrs. Kavita Verma", "room": "Room 105", "status": "Normal", "impact": "None"},
    {"id": "P-5", "period": "Period 5", "time": "12:30 - 01:15", "class_name": "Grade 11-A", "subject": "Applied Mathematics", "teacher": "Pending Assignment", "room": "Room 204", "status": "Warning", "impact": "Uncovered"},
    {"id": "P-6", "period": "Period 6", "time": "01:15 - 02:00", "class_name": "Grade 10-B", "subject": "Computer Science & AI", "teacher": "Mr. Amitav Sen", "room": "AI & Robotics Lab", "status": "Normal", "impact": "None"},
    {"id": "P-7", "period": "Period 7", "time": "02:00 - 02:45", "class_name": "Grade 12-Humanities", "subject": "World History", "teacher": "Mrs. Meenakshi S.", "room": "Room 208", "status": "Normal", "impact": "None"}
]


class TimetablesService:
    @staticmethod
    def get_all() -> List[Dict[str, Any]]:
        return TIMETABLE_PERIODS

    @staticmethod
    def update_period(period_id: str, data: PeriodUpdate) -> Optional[Dict[str, Any]]:
        for p in TIMETABLE_PERIODS:
            if p["id"] == period_id:
                p.update(data.model_dump(exclude_unset=True))
                return p
        return None
