from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

# Domain Module Routers
from app.modules.auth import auth_router
from app.modules.teachers import teachers_router
from app.modules.students import students_router
from app.modules.leaves import leaves_router
from app.modules.substitutions import substitutions_router
from app.modules.timetables import timetables_router
from app.modules.ai_engine import ai_router
from app.modules.admissions import admissions_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Greenfield International School Management System — Python FastAPI Modular Monolith API",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
)

# ── CORS Middleware ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CLIENT_ORIGIN, "http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── System Health Check ──
@app.get("/api/health", tags=["System Health"])
async def health_check():
    return {
        "status": "OPERATIONAL",
        "system": "Greenfield International School FastAPI Modular Monolith",
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "docs": f"{settings.API_V1_STR}/docs",
    }

# ── Mount Domain Module Routers (Bounded Contexts) ──
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(teachers_router, prefix=settings.API_V1_STR)
app.include_router(students_router, prefix=settings.API_V1_STR)
app.include_router(leaves_router, prefix=settings.API_V1_STR)
app.include_router(substitutions_router, prefix=settings.API_V1_STR)
app.include_router(timetables_router, prefix=settings.API_V1_STR)
app.include_router(ai_router, prefix=settings.API_V1_STR)
app.include_router(admissions_router, prefix=settings.API_V1_STR)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.PORT, reload=True)
