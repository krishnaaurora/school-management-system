from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class UserModel:
    id: str
    email: str
    password: str
    role: str
    name: str
    role_title: str
    permissions: List[str] = field(default_factory=list)
