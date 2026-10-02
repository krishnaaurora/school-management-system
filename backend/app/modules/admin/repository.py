import uuid
from datetime import datetime, timezone
from typing import Optional, Dict, Any, List
from app.core.database import get_mongo_collection

_IN_MEMORY_TEACHERS: Dict[str, Dict[str, Any]] = {}
_IN_MEMORY_STUDENTS: Dict[str, Dict[str, Any]] = {}


class AdminRepository:
    # ── Teacher Profile Operations ──
    @classmethod
    async def find_teacher_by_employee_id(cls, employee_id: str) -> Optional[Dict[str, Any]]:
        norm_id = employee_id.strip().upper()
        col = get_mongo_collection("teachers")
        if col is not None:
            try:
                doc = await col.find_one({"employeeId": norm_id})
                if not doc:
                    doc = await col.find_one({"teacher_id": norm_id})
                if doc:
                    return cls._normalize_doc(doc)
            except Exception:
                pass

        for t in _IN_MEMORY_TEACHERS.values():
            if t.get("employeeId", "").upper() == norm_id or t.get("teacher_id", "").upper() == norm_id:
                return dict(t)
        return None

    @classmethod
    async def find_teacher_by_id(cls, teacher_id: str) -> Optional[Dict[str, Any]]:
        col = get_mongo_collection("teachers")
        if col is not None:
            try:
                doc = await col.find_one({"_id": teacher_id})
                if not doc:
                    doc = await col.find_one({"id": teacher_id})
                if doc:
                    return cls._normalize_doc(doc)
            except Exception:
                pass
        return _IN_MEMORY_TEACHERS.get(teacher_id)

    @classmethod
    async def create_teacher_profile(cls, teacher_dict: Dict[str, Any]) -> Dict[str, Any]:
        if "id" not in teacher_dict:
            teacher_dict["id"] = f"TEA-{uuid.uuid4().hex[:8].upper()}"
        teacher_dict["_id"] = teacher_dict["id"]
        teacher_dict.setdefault("createdAt", datetime.now(timezone.utc))
        teacher_dict["employeeId"] = teacher_dict.get("employeeId", "").strip().upper()

        col = get_mongo_collection("teachers")
        if col is not None:
            try:
                await col.insert_one(dict(teacher_dict))
            except Exception:
                pass

        _IN_MEMORY_TEACHERS[teacher_dict["id"]] = dict(teacher_dict)
        return cls._normalize_doc(teacher_dict)

    @classmethod
    async def find_all_teachers(cls) -> List[Dict[str, Any]]:
        col = get_mongo_collection("teachers")
        results = []
        if col is not None:
            try:
                cursor = col.find({})
                async for doc in cursor:
                    results.append(cls._normalize_doc(doc))
                if results:
                    return results
            except Exception:
                pass
        return list(_IN_MEMORY_TEACHERS.values())

    # ── Student Profile Operations ──
    @classmethod
    async def find_student_by_admission_number(cls, admission_number: str) -> Optional[Dict[str, Any]]:
        norm_adm = admission_number.strip().upper()
        col = get_mongo_collection("students")
        if col is not None:
            try:
                doc = await col.find_one({"admissionNumber": norm_adm})
                if not doc:
                    doc = await col.find_one({"student_id": norm_adm})
                if doc:
                    return cls._normalize_doc(doc)
            except Exception:
                pass

        for s in _IN_MEMORY_STUDENTS.values():
            if s.get("admissionNumber", "").upper() == norm_adm or s.get("student_id", "").upper() == norm_adm:
                return dict(s)
        return None

    @classmethod
    async def find_student_by_id(cls, student_id: str) -> Optional[Dict[str, Any]]:
        col = get_mongo_collection("students")
        if col is not None:
            try:
                doc = await col.find_one({"_id": student_id})
                if not doc:
                    doc = await col.find_one({"id": student_id})
                if doc:
                    return cls._normalize_doc(doc)
            except Exception:
                pass
        return _IN_MEMORY_STUDENTS.get(student_id)

    @classmethod
    async def create_student_profile(cls, student_dict: Dict[str, Any]) -> Dict[str, Any]:
        if "id" not in student_dict:
            student_dict["id"] = f"STU-{uuid.uuid4().hex[:8].upper()}"
        student_dict["_id"] = student_dict["id"]
        student_dict.setdefault("createdAt", datetime.now(timezone.utc))
        student_dict["admissionNumber"] = student_dict.get("admissionNumber", "").strip().upper()

        col = get_mongo_collection("students")
        if col is not None:
            try:
                await col.insert_one(dict(student_dict))
            except Exception:
                pass

        _IN_MEMORY_STUDENTS[student_dict["id"]] = dict(student_dict)
        return cls._normalize_doc(student_dict)

    @classmethod
    async def find_all_students(cls) -> List[Dict[str, Any]]:
        col = get_mongo_collection("students")
        results = []
        if col is not None:
            try:
                cursor = col.find({})
                async for doc in cursor:
                    results.append(cls._normalize_doc(doc))
                if results:
                    return results
            except Exception:
                pass
        return list(_IN_MEMORY_STUDENTS.values())

    @staticmethod
    def _normalize_doc(doc: Dict[str, Any]) -> Dict[str, Any]:
        if not doc:
            return None
        d = dict(doc)
        if "_id" in d:
            d["id"] = str(d["_id"])
        return d
