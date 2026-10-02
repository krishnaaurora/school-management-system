"""Database Seeder & Sync for Greenfield IS on MongoDB Azure Cosmos DB.
Populates initial school collections if empty.
"""
import asyncio
import logging
from pymongo import MongoClient
from app.core.config import settings

logger = logging.getLogger("school_api.seeder")


def seed_mongodb():
    try:
        client = MongoClient(
            settings.MONGODB_URI,
            serverSelectionTimeoutMS=5000,
            maxIdleTimeMS=120000,
        )
        db = client[settings.MONGODB_DB_NAME]

        # 1. Teachers Collection
        teachers_col = db["teachers"]
        if teachers_col.count_documents({}) == 0:
            teachers_data = [
                {
                    "teacher_id": "GIS-T-023",
                    "name": "Ananya Sharma",
                    "email": "teacher.ananya@greenfieldis.edu",
                    "department": "Senior Secondary Mathematics",
                    "role": "Mathematics Faculty",
                    "assigned_classes": ["8-A", "9-B", "10-A"],
                    "subjects": ["Mathematics", "Advanced Calculus"],
                    "working_hours": "8:00 AM – 4:00 PM",
                    "attendance_rate": 96.0,
                    "status": "active",
                },
                {
                    "teacher_id": "GIS-T-014",
                    "name": "Rahul Verma",
                    "email": "teacher.rahul@greenfieldis.edu",
                    "department": "Natural Sciences",
                    "role": "Senior Science Faculty",
                    "assigned_classes": ["10-A", "9-A"],
                    "subjects": ["Science", "Chemistry"],
                    "working_hours": "8:00 AM – 4:00 PM",
                    "attendance_rate": 98.2,
                    "status": "active",
                },
                {
                    "teacher_id": "GIS-T-009",
                    "name": "Priya Nair",
                    "email": "teacher.priya@greenfieldis.edu",
                    "department": "Humanities & Linguistics",
                    "role": "English Faculty",
                    "assigned_classes": ["10-A", "8-A"],
                    "subjects": ["English", "Literature"],
                    "working_hours": "8:00 AM – 4:00 PM",
                    "attendance_rate": 95.5,
                    "status": "active",
                },
                {
                    "teacher_id": "GIS-T-019",
                    "name": "Arjun Rao",
                    "email": "teacher.arjun@greenfieldis.edu",
                    "department": "Physical Sciences",
                    "role": "Senior Physics Master",
                    "assigned_classes": ["10-A", "9-B"],
                    "subjects": ["Physics"],
                    "working_hours": "8:00 AM – 4:00 PM",
                    "attendance_rate": 97.0,
                    "status": "active",
                },
            ]
            teachers_col.insert_many(teachers_data)
            logger.info(f"Seeded {len(teachers_data)} teachers into MongoDB 'teachers' collection.")

        # 2. Students Collection
        students_col = db["students"]
        if students_col.count_documents({}) == 0:
            students_data = [
                {
                    "student_id": "GIS-STU-10A-024",
                    "name": "Aarav Kumar",
                    "email": "student.aarav@greenfieldis.edu",
                    "class_name": "10-A",
                    "roll_no": "24",
                    "academic_year": "2026–27",
                    "attendance_percentage": 94.0,
                    "guardian_name": "Sanjay & Sunita Kumar",
                    "guardian_contact": "+91 98765 43210",
                    "status": "enrolled",
                },
                {
                    "student_id": "GIS-STU-10A-008",
                    "name": "Diya Sharma",
                    "email": "student.diya@greenfieldis.edu",
                    "class_name": "10-A",
                    "roll_no": "08",
                    "academic_year": "2026–27",
                    "attendance_percentage": 94.0,
                    "guardian_name": "Vikram Sharma",
                    "guardian_contact": "+91 98765 43211",
                    "status": "enrolled",
                },
                {
                    "student_id": "GIS-STU-10A-019",
                    "name": "Meera Patel",
                    "email": "student.meera@greenfieldis.edu",
                    "class_name": "10-A",
                    "roll_no": "19",
                    "academic_year": "2026–27",
                    "attendance_percentage": 97.0,
                    "guardian_name": "Rajesh Patel",
                    "guardian_contact": "+91 98765 43212",
                    "status": "enrolled",
                },
                {
                    "student_id": "GIS-STU-10A-031",
                    "name": "Rahul Singh",
                    "email": "student.rahuls@greenfieldis.edu",
                    "class_name": "10-A",
                    "roll_no": "31",
                    "academic_year": "2026–27",
                    "attendance_percentage": 88.0,
                    "guardian_name": "Manish Singh",
                    "guardian_contact": "+91 98765 43213",
                    "status": "enrolled",
                },
            ]
            students_col.insert_many(students_data)
            logger.info(f"Seeded {len(students_data)} students into MongoDB 'students' collection.")

        # 3. Classes Collection
        classes_col = db["classes"]
        if classes_col.count_documents({}) == 0:
            classes_data = [
                {"class_id": "cls-10a", "name": "10-A", "total_students": 32, "room": "301", "grade": 10},
                {"class_id": "cls-9b", "name": "9-B", "total_students": 30, "room": "204", "grade": 9},
                {"class_id": "cls-8a", "name": "8-A", "total_students": 35, "room": "201", "grade": 8},
                {"class_id": "cls-9a", "name": "9-A", "total_students": 28, "room": "202", "grade": 9},
            ]
            classes_col.insert_many(classes_data)
            logger.info(f"Seeded {len(classes_data)} classes into MongoDB 'classes' collection.")

        # 4. Leave Requests & Substitution Plans
        leaves_col = db["leaves"]
        if leaves_col.count_documents({}) == 0:
            leaves_data = [
                {
                    "leave_id": "LEAVE-2026-001",
                    "teacher_id": "GIS-T-023",
                    "teacher_name": "Ananya Sharma",
                    "start_date": "2026-10-03",
                    "end_date": "2026-10-03",
                    "leave_type": "Personal",
                    "status": "Approved",
                    "duration": "1 Day",
                    "notes": "Attending national mathematics faculty colloquium.",
                    "substitutes": [
                        {
                            "period": "Period 2",
                            "class": "8-A",
                            "subject": "Mathematics",
                            "substitute": "Rahul Verma",
                            "room": "201",
                            "status": "Assigned",
                        },
                        {
                            "period": "Period 3",
                            "class": "10-A",
                            "subject": "Mathematics",
                            "substitute": "Rahul Verma",
                            "room": "301",
                            "status": "Assigned",
                        },
                        {
                            "period": "Period 4",
                            "class": "9-B",
                            "subject": "Mathematics",
                            "substitute": "Priya Nair",
                            "room": "204",
                            "status": "Assigned",
                        },
                    ],
                }
            ]
            leaves_col.insert_many(leaves_data)
            logger.info(f"Seeded {len(leaves_data)} leave requests into MongoDB 'leaves' collection.")

        # 5. Announcements
        announcements_col = db["announcements"]
        if announcements_col.count_documents({}) == 0:
            announcements_data = [
                {
                    "announcement_id": "ANN-001",
                    "title": "Annual Sports Day & Athletic Meet 2026",
                    "category": "Campus Life",
                    "priority": "High",
                    "date": "2026-10-02",
                    "event_date": "October 18, 2026",
                    "description": "Annual Inter-House Sports Day will be held at the main Greenfield Athletic Ground.",
                },
                {
                    "announcement_id": "ANN-002",
                    "title": "State Science & Innovation Exhibition",
                    "category": "Academic",
                    "priority": "High",
                    "date": "2026-10-01",
                    "event_date": "October 10, 2026",
                    "description": "Registrations open for Class 9 & 10 AI, robotics, and clean energy prototypes.",
                },
                {
                    "announcement_id": "ANN-003",
                    "title": "Mid-Term Examination Schedule & Hall Tickets",
                    "category": "Examinations",
                    "priority": "Urgent",
                    "date": "2026-09-28",
                    "event_date": "October 8 – October 16, 2026",
                    "description": "Mid-term examinations commence on October 8 in designated examination halls.",
                },
            ]
            announcements_col.insert_many(announcements_data)
            logger.info(f"Seeded {len(announcements_data)} announcements into MongoDB 'announcements' collection.")

        client.close()
        return True
    except Exception as e:
        logger.error(f"MongoDB seeder error: {e}")
        return False


if __name__ == "__main__":
    seed_mongodb()
