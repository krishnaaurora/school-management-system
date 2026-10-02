from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Optional


@dataclass
class User:
    name: str
    email: str
    passwordHash: str
    role: str  # "ADMIN" | "TEACHER" | "STUDENT"
    status: str = "ACTIVE"  # "ACTIVE" | "INACTIVE"
    profileId: Optional[str] = None
    createdBy: Optional[str] = None
    createdAt: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    lastLoginAt: Optional[datetime] = None
    id: Optional[str] = None
