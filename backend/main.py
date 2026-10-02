import uvicorn
from app.core.config import settings

if __name__ == "__main__":
    print("=================================================================")
    print("🏫 GREENFIELD INTERNATIONAL SCHOOL - FASTAPI MODULAR MONOLITH API")
    print(f"🚀 Server Running at: http://localhost:{settings.PORT}")
    print(f"📖 Interactive Swagger Docs: http://localhost:{settings.PORT}/api/v1/docs")
    print(f"📡 System Health Check: http://localhost:{settings.PORT}/api/health")
    print("=================================================================")
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.PORT, reload=True)
