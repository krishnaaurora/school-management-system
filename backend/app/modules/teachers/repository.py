from typing import List, Optional, Dict, Any
from app.modules.teachers.models import TeacherModel

_TEACHERS_STORE: List[Dict[str, Any]] = [
    {"id": "T-101", "name": "Mr. Rajesh Kumar", "subject": "Physics & General Science", "dept": "Science", "max_load": 28, "current_load": 24, "status": "Active", "attendance": "98%", "email": "rajesh.kumar@greenfieldis.edu"},
    {"id": "T-102", "name": "Dr. Sunita Menon", "subject": "Organic Chemistry & Bio-Chem", "dept": "Science", "max_load": 26, "current_load": 22, "status": "Active", "attendance": "95%", "email": "sunita.menon@greenfieldis.edu"},
    {"id": "T-103", "name": "Mr. Arvind Swaminathan", "subject": "Pure Mathematics & Stats", "dept": "Mathematics", "max_load": 30, "current_load": 26, "status": "Active", "attendance": "97%", "email": "arvind.s@greenfieldis.edu"},
    {"id": "T-104", "name": "Mrs. Kavita Verma", "subject": "English Language & Lit", "dept": "Humanities", "max_load": 26, "current_load": 20, "status": "Active", "attendance": "99%", "email": "kavita.v@greenfieldis.edu"},
    {"id": "T-105", "name": "Mr. Amitav Sen", "subject": "Computer Science & AI", "dept": "Technology", "max_load": 28, "current_load": 22, "status": "Active", "attendance": "96%", "email": "amitav.sen@greenfieldis.edu"},
    {"id": "T-106", "name": "Mrs. Meenakshi Sundaram", "subject": "History & Global Civics", "dept": "Humanities", "max_load": 25, "current_load": 21, "status": "Active", "attendance": "94%", "email": "meenakshi.s@greenfieldis.edu"},
    {"id": "T-107", "name": "Mr. Kiran Sharma", "subject": "Applied Mathematics", "dept": "Mathematics", "max_load": 28, "current_load": 27, "status": "On Leave", "attendance": "91%", "email": "kiran.sharma@greenfieldis.edu"},
    {"id": "T-108", "name": "Dr. Shalini Gupta", "subject": "Botany & Environmental Science", "dept": "Science", "max_load": 24, "current_load": 18, "status": "Active", "attendance": "99%", "email": "shalini.g@greenfieldis.edu"}
]


class TeacherRepository:
    @staticmethod
    def find_all() -> List[Dict[str, Any]]:
        return _TEACHERS_STORE

    @staticmethod
    def find_by_id(teacher_id: str) -> Optional[Dict[str, Any]]:
        for t in _TEACHERS_STORE:
            if t["id"] == teacher_id:
                return t
        return None

    @staticmethod
    def save(record: Dict[str, Any]) -> Dict[str, Any]:
        _TEACHERS_STORE.append(record)
        return record
