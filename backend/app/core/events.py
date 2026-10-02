import asyncio
from typing import Any, Callable, Dict, List
import logging

logger = logging.getLogger("modular_monolith.events")


class DomainEventBus:
    """Decoupled In-Memory Domain Event Bus for Modular Monolith.
    Allows domain modules to subscribe to events across bounded contexts without direct coupling.
    """

    def __init__(self):
        self._subscribers: Dict[str, List[Callable]] = {}

    def subscribe(self, event_name: str, handler: Callable):
        if event_name not in self._subscribers:
            self._subscribers[event_name] = []
        self._subscribers[event_name].append(handler)

    async def publish(self, event_name: str, payload: Any):
        logger.info(f"[DomainEventBus] 📡 Event Published: {event_name}")
        if event_name in self._subscribers:
            for handler in self._subscribers[event_name]:
                try:
                    if asyncio.iscoroutinefunction(handler):
                        await handler(payload)
                    else:
                        handler(payload)
                except Exception as e:
                    logger.error(f"[DomainEventBus] ❌ Error executing handler for {event_name}: {e}")


event_bus = DomainEventBus()

# Standard Domain Event Names
class Events:
    LEAVE_REQUESTED = "leaves:requested"
    LEAVE_APPROVED = "leaves:approved"
    LEAVE_REJECTED = "leaves:rejected"
    SUBSTITUTION_ASSIGNED = "substitutions:assigned"
    TIMETABLE_UPDATED = "timetables:updated"
    ADMISSION_SUBMITTED = "admissions:submitted"
