from typing import List, Dict, Any
from fastapi import HTTPException, status
from app.modules.substitutions.schemas import SubstitutionResponse, SubstitutionAssign
from app.modules.substitutions.service import SubstitutionsService


class SubstitutionController:
    @staticmethod
    async def list_substitutions() -> List[Dict[str, Any]]:
        return SubstitutionsService.get_all()

    @staticmethod
    async def get_by_leave_id(leave_id: str) -> List[Dict[str, Any]]:
        return SubstitutionsService.get_by_leave_id(leave_id)

    @staticmethod
    async def assign_substitute(sub_id: str, data: SubstitutionAssign) -> Dict[str, Any]:
        assigned = await SubstitutionsService.assign(sub_id, data)
        if not assigned:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Substitution assignment not found")
        return assigned
