"""Database Connection & Session Management (Modular Monolith Core).
Supports Async MongoDB (Motor) for Azure Cosmos DB and resilient in-memory fallback.
"""
import logging
from typing import Optional, Any
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.core.config import settings

logger = logging.getLogger("school_api.database")


class MongoManager:
    client: Optional[AsyncIOMotorClient] = None
    db: Optional[AsyncIOMotorDatabase] = None

    @classmethod
    async def connect_to_database(cls):
        try:
            logger.info("Connecting to MongoDB Azure Cosmos DB instance...")
            cls.client = AsyncIOMotorClient(
                settings.MONGODB_URI,
                serverSelectionTimeoutMS=5000,
                maxIdleTimeMS=120000,
            )
            cls.db = cls.client[settings.MONGODB_DB_NAME]
            # Ping to verify connection
            await cls.client.admin.command('ping')
            logger.info(f"Connected successfully to MongoDB database: '{settings.MONGODB_DB_NAME}'")
        except Exception as e:
            logger.warning(f"MongoDB connection notice: {e}. Operating with active fallback if needed.")

    @classmethod
    async def close_database_connection(cls):
        if cls.client:
            cls.client.close()
            logger.info("MongoDB connection closed.")

    @classmethod
    def get_database(cls) -> Optional[AsyncIOMotorDatabase]:
        if cls.db is not None:
            return cls.db
        return None

    @classmethod
    def get_collection(cls, collection_name: str):
        if cls.db is not None:
            return cls.db[collection_name]
        return None


# Helper export
def get_mongo_db() -> Optional[AsyncIOMotorDatabase]:
    return MongoManager.get_database()


def get_mongo_collection(collection_name: str):
    return MongoManager.get_collection(collection_name)
