import uuid
from datetime import datetime, timezone
from typing import Optional, Dict, Any, List
from app.core.database import get_mongo_collection
from app.core.security import get_password_hash
from app.core.config import settings

# In-memory storage for test isolated execution or offline mode
_IN_MEMORY_USERS: Dict[str, Dict[str, Any]] = {}


class UserRepository:
    @staticmethod
    def _normalize_user(doc: Dict[str, Any]) -> Dict[str, Any]:
        if not doc:
            return None
        user = dict(doc)
        if "_id" in user:
            user["id"] = str(user["_id"])
        elif "id" in user:
            user["_id"] = user["id"]
        return user

    @classmethod
    async def find_by_email(cls, email: str) -> Optional[Dict[str, Any]]:
        normalized_email = email.strip().lower()
        col = get_mongo_collection("users")
        if col is not None:
            try:
                doc = await col.find_one({"email": {"$regex": f"^{normalized_email}$", "$options": "i"}})
                if doc:
                    return cls._normalize_user(doc)
            except Exception:
                pass
        
        # Check in-memory store
        for u in _IN_MEMORY_USERS.values():
            if u["email"].lower() == normalized_email:
                return dict(u)
        return None

    @classmethod
    async def find_by_id(cls, user_id: str) -> Optional[Dict[str, Any]]:
        col = get_mongo_collection("users")
        if col is not None:
            try:
                doc = await col.find_one({"_id": user_id})
                if not doc:
                    doc = await col.find_one({"id": user_id})
                if doc:
                    return cls._normalize_user(doc)
            except Exception:
                pass
        
        return _IN_MEMORY_USERS.get(user_id)

    @classmethod
    async def create_user(cls, user_dict: Dict[str, Any]) -> Dict[str, Any]:
        if "id" not in user_dict:
            user_dict["id"] = f"USR-{uuid.uuid4().hex[:8].upper()}"
        user_dict["_id"] = user_dict["id"]
        
        now = datetime.now(timezone.utc)
        user_dict.setdefault("createdAt", now)
        user_dict.setdefault("updatedAt", now)
        user_dict.setdefault("status", "ACTIVE")
        user_dict["email"] = user_dict["email"].strip().lower()

        col = get_mongo_collection("users")
        if col is not None:
            try:
                await col.insert_one(dict(user_dict))
            except Exception:
                pass

        _IN_MEMORY_USERS[user_dict["id"]] = dict(user_dict)
        return cls._normalize_user(user_dict)

    @classmethod
    async def update_user(cls, user_id: str, update_dict: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        update_dict["updatedAt"] = datetime.now(timezone.utc)
        col = get_mongo_collection("users")
        if col is not None:
            try:
                await col.update_one({"_id": user_id}, {"$set": update_dict})
            except Exception:
                pass

        if user_id in _IN_MEMORY_USERS:
            _IN_MEMORY_USERS[user_id].update(update_dict)
            return dict(_IN_MEMORY_USERS[user_id])
        return await cls.find_by_id(user_id)

    @classmethod
    async def find_all(cls, query: Optional[Dict[str, Any]] = None, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        col = get_mongo_collection("users")
        results = []
        if col is not None:
            try:
                mongo_query = query or {}
                cursor = col.find(mongo_query).skip(skip).limit(limit)
                async for doc in cursor:
                    results.append(cls._normalize_user(doc))
                if results:
                    return results
            except Exception:
                pass

        # Fallback in-memory
        all_users = list(_IN_MEMORY_USERS.values())
        if query:
            if "role" in query:
                all_users = [u for u in all_users if u.get("role") == query["role"]]
            if "status" in query:
                all_users = [u for u in all_users if u.get("status") == query["status"]]
        return all_users[skip : skip + limit]

    @classmethod
    async def delete_all_for_tests(cls):
        _IN_MEMORY_USERS.clear()
        col = get_mongo_collection("users")
        if col is not None:
            try:
                await col.delete_many({})
            except Exception:
                pass
