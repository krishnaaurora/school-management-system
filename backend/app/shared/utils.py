"""Shared utilities across all Modular Monolith bounded contexts."""
from datetime import datetime
from typing import Any, Dict


def format_timestamp(dt: datetime = None) -> str:
    if not dt:
        dt = datetime.now()
    return dt.strftime("%Y-%m-%d %H:%M:%S")


def sanitize_input(text: str) -> str:
    if not text:
        return ""
    return text.strip()


def paginate_results(items: list, page: int = 1, page_size: int = 20) -> Dict[str, Any]:
    start = (page - 1) * page_size
    end = start + page_size
    return {
        "items": items[start:end],
        "total": len(items),
        "page": page,
        "page_size": page_size,
        "total_pages": (len(items) + page_size - 1) // page_size,
    }
