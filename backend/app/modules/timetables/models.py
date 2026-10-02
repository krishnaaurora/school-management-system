from dataclasses import dataclass


@dataclass
class PeriodModel:
    id: str
    period: str
    time: str
    class_name: str
    subject: str
    teacher: str
    room: str
    status: str
    impact: str
