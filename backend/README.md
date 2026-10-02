# Greenfield International School - FastAPI Modular Monolith API 🚀

A high-performance **Python 3.11 + FastAPI** backend built following the **Modular Monolith** architecture. It provides an institutional API for school management, RBAC authorization, and automated AI teacher leave & substitution intelligence.

---

## 🏛️ Modular Monolith Architecture

```
backend/
├── main.py                     # Entry point runner (uvicorn app.main:app)
├── requirements.txt            # FastAPI, Pydantic v2, PyJWT, Passlib, Uvicorn
├── .env.example                # Environment variables template
├── app/
│   ├── main.py                 # FastAPI App Factory & Module Router Mounts
│   ├── core/                   # Shared Kernel & Cross-Cutting Concerns
│   │   ├── config.py           # Pydantic BaseSettings Environment Configuration
│   │   ├── security.py         # JWT Token Generation & Verification, Password Hashing
│   │   ├── dependencies.py     # Auth Token Guard (get_current_user) & RBAC Guard (require_roles)
│   │   └── events.py           # In-Memory DomainEventBus for Decoupled Inter-Module Communication
│   │
│   └── modules/                # Bounded Domain Modules (Strictly Decoupled)
│       ├── auth/               # Institutional Login, JWT, Role Detection (Admin, Principal, VP, etc.)
│       │   ├── router.py       # POST /api/v1/auth/login, GET /api/v1/auth/me
│       │   ├── schemas.py      # Pydantic Request/Response Models
│       │   └── service.py      # Authentication & RBAC Service
│       ├── teachers/           # Faculty Roster, Workload Tracker, Departments
│       ├── students/           # Student Directory, Sections, GPA, Fee Status
│       ├── timetables/         # Live Daily Master Schedule, Room Management
│       ├── leaves/             # Teacher Leave Applications & Multi-level Approvals
│       ├── substitutions/      # AI Substitution Matchmaking & Timetable Allocations
│       ├── ai_engine/          # AI Leave Impact Scoring & Assistant Queries
│       └── admissions/         # Admissions Inquiries & Intake Pipeline
```

---

## 🔌 API Endpoints & Interactive Docs

Once running, interactive API documentation is automatically available:
- **Interactive Swagger UI**: [http://localhost:8000/api/v1/docs](http://localhost:8000/api/v1/docs)
- **ReDoc UI**: [http://localhost:8000/api/v1/redoc](http://localhost:8000/api/v1/redoc)
- **Health Check**: [http://localhost:8000/api/health](http://localhost:8000/api/health)

### Summary of Module Endpoints:
- `POST /api/v1/auth/login` — Institutional login (`Admingis@gmail.com` / `GIS@admin123`)
- `GET /api/v1/auth/me` — Active session profile
- `GET /api/v1/teachers` — List all teachers
- `POST /api/v1/teachers` — Register new teacher (Admin/Principal)
- `GET /api/v1/students` — Student directory with sections & fee status
- `GET /api/v1/timetables` — Live master timetable periods
- `GET /api/v1/leaves` — List all leave requests
- `PATCH /api/v1/leaves/{id}/status` — Approve/Reject leave request
- `GET /api/v1/substitutions` — Master substitution allocations matrix
- `PATCH /api/v1/substitutions/{id}/assign` — Confirm and dispatch substitute teacher
- `POST /api/v1/ai/analyze-leave` — AI leave risk assessment & substitute suggestions
- `POST /api/v1/ai/query` — Natural Language AI assistant inquiry
- `POST /api/v1/admissions/inquire` — Public admissions inquiry

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the Development Server
```bash
python main.py
# or
uvicorn app.main:app --reload --port 8000
```
Server runs at `http://localhost:8000`.
