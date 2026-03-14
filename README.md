#   Student Dashboard

A **professional College Management System Student Dashboard** built with React.

---

##  Project Structure

```
student-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── App.js               ← Main router + collapsible sidebar + topbar
│   ├── index.js
│   └── pages/
│       ├── Login.js         ← Student login with demo credentials
│       ├── Dashboard.js     ← Home overview: stats, quick links, schedule
│       ├── Courses.js       ← Enrolled courses + syllabus detail panel
│       ├── StudyMaterials.js← Browse, search, download PDF/PPT/Video
│       ├── Attendance.js    ← Subject-wise attendance + warning system
│       ├── Results.js       ← Semester results + grade distribution
│       ├── FeeDetails.js    ← Fee history + online payment modal
│       ├── Transport.js     ← Bus routes + live status + schedule
│       ├── Library.js       ← Borrowed books + browse + reserve
│       └── Notifications.js ← Alerts with read/dismiss/filter
└── package.json
```

---

##  Setup & Run

```bash
cd student-dashboard
npm install
npm start
```

Opens at **http://localhost:3000**

**Demo Login:** Student ID: `STU001` | Password: `student123`

---

##  Features at a Glance

| Page | Highlights |
|------|-----------|
| 🔐 Login | Validation, show/hide password, animated loading |
| 📊 Dashboard | Welcome banner, stats cards, quick access, today's schedule |
| 📚 Courses | Course cards with progress bar, click for syllabus detail panel |
| 📖 Study Materials | Type filters (PDF/PPT/Video), search, download with feedback |
| ✅ Attendance | Circular progress per subject, low-attendance warning, recent class dots |
| 🏆 Results | Semester tabs, marks table, grade distribution, CGPA display |
| 💳 Fee Details | Payment history table, online payment modal with mode selection |
| 🚌 Transport | Route timeline, live bus status, weekly schedule |
| 🏛️ Library | Borrowed books with due dates, browse & reserve available books |
| 🔔 Notifications | Filter by type, mark read/unread, dismiss with badge count |

---

##  Design System

- **Theme:** Dark (deep navy + blue accents)
- **Font:** Plus Jakarta Sans (Google Fonts)
- **Sidebar:** Collapsible with active state indicators
- **Colors:** Subject-coded color system throughout

# Student Dashboard Backend

## Overview

This project is the **backend API for the Student Dashboard System**.
It provides REST APIs for managing student-related data such as courses, attendance, results, fees, notifications, and transport information.

The backend is built using **Node.js, Express.js, and MongoDB** and connects with the React frontend of the Student Dashboard.

---

# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* dotenv
* cors

---

# Project Structure

```
student-dashboard-backend
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── courseController.js
│   ├── attendanceController.js
│   ├── resultController.js
│   ├── feeController.js
│   ├── notificationController.js
│   └── transportController.js
│
├── middleware
│   └── authMiddleware.js
│
├── models
│   ├── Student.js
│   ├── Course.js
│   ├── Attendance.js
│   ├── Result.js
│   ├── Fee.js
│   ├── Notification.js
│   └── Transport.js
│
├── routes
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   ├── attendanceRoutes.js
│   ├── resultRoutes.js
│   ├── feeRoutes.js
│   ├── notificationRoutes.js
│   └── transportRoutes.js
│
├── server.js
├── package.json
└── .env
```

---

# Installation

### 1. Clone the Repository

```
git clone <repository-url>
cd student-dashboard-backend
```

### 2. Install Dependencies

```
npm install
```

### 3. Create Environment File

Create a `.env` file in the root folder.

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

# Running the Server

### Development Mode

```
npm run dev
```

### Production Mode

```
npm start
```

Server will start at:

```
http://localhost:5000
```

---

# API Endpoints

## Authentication

### Login

```
POST /api/auth/login
```

Request Body:

```
{
 "email": "student@email.com",
 "password": "password"
}
```

Response:

```
{
 "token": "jwt_token",
 "student": {...}
}
```

---

## Courses

```
GET /api/courses
```

Returns list of available courses.

---

## Attendance

```
GET /api/attendance/:studentId
```

Returns attendance details of a student.

---

## Results

```
GET /api/results/:studentId
```

Returns exam results.

---

## Fees

```
GET /api/fees/:studentId
```

Returns fee details.

---

## Notifications

```
GET /api/notifications
```

Returns latest announcements.

---

## Transport

```
GET /api/transport
```

Returns transport routes and timings.

---

# Database Models

The backend uses MongoDB collections for:

* Students
* Courses
* Attendance
* Results
* Fees
* Notifications
* Transport

---

# Authentication

JWT is used for authentication.

After login, a token is returned which must be included in requests:

```
Authorization: Bearer <token>
```

---

# Example API Test (Using Postman)

Example request:

```
GET http://localhost:5000/api/courses
```

---

# Deployment

You can deploy this backend using:

* Render
* Railway
* Cyclic
* AWS
* DigitalOcean

Steps:

1. Push code to GitHub
2. Connect repository to deployment platform
3. Set environment variables
4. Deploy

---

# Future Improvements

* Admin dashboard
* Student registration
* File uploads for study materials
* Real-time notifications
* Payment gateway for fee payments
* Role-based authentication

---

# Author

Student Dashboard Backend
Built using Node.js, Express, and MongoDB
