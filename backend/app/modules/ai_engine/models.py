from dataclasses import dataclass
from typing import List


@dataclass
class AiInsightModel:
    title: str
    category: str
    risk_level: str
    summary: str
    score: int
