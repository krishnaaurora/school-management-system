# Greenfield International School - Modular Monolith Backend API

This backend is architected following the **Modular Monolith** pattern. It runs as a single, easily deployable unified service while keeping each business capability strictly decoupled into its own bounded domain module.

---

## 🏛️ Modular Monolith Architecture Overview

```
backend/
├── server.js                      # Application Server Bootstrapper
├── src/
│   ├── app.js                     # Express Application Assembly & Module Routing
│   ├── config/                    # Global Configuration & Environment
│   │   └── index.js
│   ├── core/                      # Shared Kernel & Cross-Cutting Infrastructure
│   │   ├── errors/                # Standard AppError Hierarchy (NotFound, Unauthorized, Forbidden)
│   │   ├── events/                # In-Memory Domain EventBus for Decoupled Inter-Module Events
│   │   ├── middleware/            # Auth Guard (JWT), RBAC Middleware, Error Handler
│   │   └── utils/                 # Standardized ApiResponse Formatter & Utilities
│   │
│   └── modules/                   # Bounded Domain Modules (Independent Contexts)
│       ├── auth/                  # Authentication, JWT Tokens, Institutional Verification
│       ├── teachers/              # Teacher Directory, Workload Tracking, Department Stats
│       ├── students/              # Student Roster, Grades, Class Sections, Fee Status
│       ├── timetables/            # Daily Master Schedule, Room Management, Period Matrix
│       ├── leaves/                # Teacher Leave Requests, Quotas & Approvals
│       ├── substitutions/         # Smart Substitution Matchmaking & Timetable Allocations
│       ├── ai-engine/             # AI Leave Impact Scoring & Operational Intelligence
│       └── admissions/            # Admissions Inquiries & Intake Pipeline
```

---

## 🔌 API Endpoints Reference

### 🔐 Authentication (`/api/v1/auth`)
- `POST /api/v1/auth/login` — Institutional login (Admin: `Admingis@gmail.com` / `GIS@admin123`)
- `GET /api/v1/auth/me` — Retrieve active user identity and role permissions

### 👨‍🏫 Teachers Module (`/api/v1/teachers`)
- `GET /api/v1/teachers` — List all faculty members
- `GET /api/v1/teachers/:id` — Get teacher profile and current workload
- `POST /api/v1/teachers` — Register new faculty (Admin/Principal)
- `PUT /api/v1/teachers/:id` — Update faculty profile/workload

### 🎓 Students Module (`/api/v1/students`)
- `GET /api/v1/students` — Student directory with sections, GPA, fee status
- `GET /api/v1/students/:id` — Student profile
- `POST /api/v1/students` — Enroll new student

### 📅 Timetables Module (`/api/v1/timetables`)
- `GET /api/v1/timetables` — Live daily master schedule
- `PATCH /api/v1/timetables/:id` — Update period teacher / room status

### 📝 Leaves Module (`/api/v1/leaves`)
- `GET /api/v1/leaves` — List all leave applications
- `GET /api/v1/leaves/:id` — Leave details and affected periods
- `POST /api/v1/leaves` — Submit new leave application
- `PATCH /api/v1/leaves/:id/status` — Approve/Reject leave request

### 🔄 Substitutions Module (`/api/v1/substitutions`)
- `GET /api/v1/substitutions` — Master substitution allocations matrix
- `GET /api/v1/substitutions/leave/:leaveId` — Recommended substitutes for a leave
- `PATCH /api/v1/substitutions/:id/assign` — Confirm and dispatch substitute assignment

### 🧠 AI Engine Module (`/api/v1/ai`)
- `POST /api/v1/ai/analyze-leave` — Evaluate pedagogical & timetable impact risk score
- `POST /api/v1/ai/query` — Natural Language school operations assistant query

### 📋 Admissions Module (`/api/v1/admissions`)
- `POST /api/v1/admissions/inquire` — Submit public admission inquiry
- `GET /api/v1/admissions/inquiries` — List intake applications (Admin)

---

## 🚀 Running Locally

```bash
cd backend
npm install
npm run dev
```
Server boots on `http://localhost:5000`.
