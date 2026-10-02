from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    PROJECT_NAME: str = "Greenfield International School Modular Monolith API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    PORT: int = 8000
    CLIENT_ORIGIN: str = "http://localhost:5173"

    JWT_SECRET: str = "greenfield_super_secure_institutional_jwt_secret_key_2026"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    ADMIN_EMAIL: str = "Admingis@gmail.com"
    ADMIN_PASSWORD: str = "GIS@admin123"

    # Azure Cosmos DB / MongoDB Configuration
    MONGODB_URI: str = "mongodb://azuremongodbdatabase:Yix6Ekz5pFnXCT1xO0JWx3kFWMKrL5mRLDSjdOFg6zSMXpW6oSBiEeryanWHYxoB2G8TmfzGBjxDACDbTm4ojQ%3D%3D@azuremongodbdatabase.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@azuremongodbdatabase@"
    MONGODB_DB_NAME: str = "school"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
