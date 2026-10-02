"""Secure Initial Admin & RBAC Setup / Seed Script.
Executes environment-controlled admin initialization on MongoDB 'school' database.
"""
import sys
import logging
from datetime import datetime, timezone
from pymongo import MongoClient
from app.core.config import settings
from app.core.security import get_password_hash

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("school_api.seed_admin")


def seed_admin_and_rbac():
    try:
        admin_email = settings.ADMIN_EMAIL.strip().lower()
        admin_password = settings.ADMIN_PASSWORD
        
        logger.info(f"Connecting to MongoDB Azure Cosmos DB for Admin & RBAC initialization...")
        client = MongoClient(
            settings.MONGODB_URI,
            serverSelectionTimeoutMS=5000,
            maxIdleTimeMS=120000,
        )
        db = client[settings.MONGODB_DB_NAME]
        users_col = db["users"]
        teachers_col = db["teachers"]
        students_col = db["students"]

        # 1. Seed or Update Admin User
        admin_hash = get_password_hash(admin_password)
        admin_user_doc = {
            "id": "GIS-ADM-001",
            "name": "Admin GIS Desk",
            "email": admin_email,
            "passwordHash": admin_hash,
            "role": "ADMIN",
            "status": "ACTIVE",
            "createdBy": "SYSTEM_SEED",
            "updatedAt": datetime.now(timezone.utc),
        }
        
        existing_admin = users_col.find_one({"email": admin_email})
        if existing_admin:
            users_col.update_one({"email": admin_email}, {"$set": admin_user_doc})
            logger.info(f"Admin account '{admin_email}' updated with secure password hash.")
        else:
            admin_user_doc["_id"] = "GIS-ADM-001"
            admin_user_doc["createdAt"] = datetime.now(timezone.utc)
            users_col.insert_one(admin_user_doc)
            logger.info(f"Admin account '{admin_email}' created successfully.")

        # 2. Seed Initial Teacher Profile & User Account (Ananya Sharma)
        teacher_email = "teacher.ananya@greenfieldis.edu"
        teacher_doc = teachers_col.find_one({"employeeId": "GIS-T-023"})
        if not teacher_doc:
            teacher_doc = {
                "_id": "GIS-T-023",
                "id": "GIS-T-023",
                "name": "Ananya Sharma",
                "email": teacher_email,
                "employeeId": "GIS-T-023",
                "department": "Senior Secondary Mathematics",
                "subjects": ["Mathematics", "Advanced Calculus"],
                "status": "ACTIVE",
                "createdAt": datetime.now(timezone.utc),
            }
            teachers_col.insert_one(teacher_doc)

        existing_teacher_user = users_col.find_one({"email": teacher_email})
        teacher_hash = get_password_hash("GIS@teacher123")
        if not existing_teacher_user:
            users_col.insert_one({
                "_id": "USR-TEA-023",
                "id": "USR-TEA-023",
                "name": "Ananya Sharma",
                "email": teacher_email,
                "passwordHash": teacher_hash,
                "role": "TEACHER",
                "status": "ACTIVE",
                "profileId": str(teacher_doc["_id"]),
                "createdBy": "GIS-ADM-001",
                "createdAt": datetime.now(timezone.utc),
                "updatedAt": datetime.now(timezone.utc),
            })
            logger.info(f"Teacher User account '{teacher_email}' provisioned (profileId: {teacher_doc['_id']}).")

        # 3. Seed Initial Student Profile & User Account (Aarav Kumar)
        student_email = "student.aarav@greenfieldis.edu"
        student_doc = students_col.find_one({"admissionNumber": "GIS-2026-1024"})
        if not student_doc:
            student_doc = {
                "_id": "GIS-STU-10A-024",
                "id": "GIS-STU-10A-024",
                "name": "Aarav Kumar",
                "email": student_email,
                "admissionNumber": "GIS-2026-1024",
                "className": "10-A",
                "section": "A",
                "rollNumber": 24,
                "status": "ACTIVE",
                "createdAt": datetime.now(timezone.utc),
            }
            students_col.insert_one(student_doc)

        existing_student_user = users_col.find_one({"email": student_email})
        student_hash = get_password_hash("GIS@student123")
        if not existing_student_user:
            users_col.insert_one({
                "_id": "USR-STU-024",
                "id": "USR-STU-024",
                "name": "Aarav Kumar",
                "email": student_email,
                "passwordHash": student_hash,
                "role": "STUDENT",
                "status": "ACTIVE",
                "profileId": str(student_doc["_id"]),
                "createdBy": "GIS-ADM-001",
                "createdAt": datetime.now(timezone.utc),
                "updatedAt": datetime.now(timezone.utc),
            })
            logger.info(f"Student User account '{student_email}' provisioned (profileId: {student_doc['_id']}).")

        client.close()
        logger.info("Admin & RBAC seeding completed successfully!")
        return True
    except Exception as e:
        logger.error(f"Error during Admin seed: {e}")
        return False


if __name__ == "__main__":
    success = seed_admin_and_rbac()
    sys.exit(0 if success else 1)
