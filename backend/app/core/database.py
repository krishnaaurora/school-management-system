"""Database Connection & Session Management (Modular Monolith Core).
Supports in-memory state or pluggable SQL database engines (PostgreSQL / SQLite / SQLAlchemy / MongoDB).
"""
from typing import Dict, Any


class InMemoryDatabase:
    def __init__(self):
        self._tables: Dict[str, list] = {}

    def get_table(self, table_name: str) -> list:
        if table_name not in self._tables:
            self._tables[table_name] = []
        return self._tables[table_name]


db = InMemoryDatabase()
