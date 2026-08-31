# Dynamic Portfolio CMS — Project 2 ("Ink & Teal" theme)

A fully dynamic MERN stack portfolio website with a hidden admin panel — same
robust CMS-style functionality as Project 1, with a distinctly different,
independent visual design and codebase.

## Tech Stack
- React.js (frontend) + React Router + Axios + Bootstrap
- Node.js + Express.js (backend)
- MongoDB + Mongoose
- JWT Authentication + bcrypt password hashing

## Folder Structure
```
portfolio-2/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   └── server.js
└── frontend/
    └── src/
        ├── components/public/
        ├── components/admin/
        ├── context/
        └── utils/
```

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB installed locally OR a free MongoDB Atlas cluster

### 1. Backend Setup
```bash
cd backend
npm install
```

Edit `.env` and set your MongoDB connection string:
```
MONGO_URI=mongodb://127.0.0.1:27017/portfolio_db_2
```

Seed the default admin account (run once):
```bash
npm run seed
```
This creates an admin with:
- Username: `admin`
- Password: `Admin@123`

**Change this password immediately after your first login.**

Start the backend:
```bash
npm run dev
```
Backend runs on **http://localhost:5001** (different port from Project 1, so both can run together).

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
This will try to start on port 3000. If Project 1's frontend is already running there,
React will prompt you to run on another port (e.g. 3000) — type `y` to accept.
Alternatively, run with a specific port directly:
```bash
PORT=3000 npm start
```
(On Windows PowerShell: `$env:PORT=3000; npm start`)

### 3. Accessing the Portfolio
Visit **http://localhost:3000** (or whichever port it started on).

### 4. Accessing the Hidden Admin Panel
No visible "Admin Login" link exists anywhere on the site. Use ONE of these two secret methods (intentionally different from Project 1's methods):

**Method 1 — Keyboard shortcut (desktop):**
Press `Ctrl + Alt + P` anywhere on the portfolio page.

**Method 2 — Hidden multi-click (works on any device):**
Click the logo/brand text in the top-left navbar **6 times within 2.5 seconds**.

Both methods take you to: `http://localhost:3000/secure-panel-q7m4-access`

Log in with the admin credentials above.

### 5. Using the Admin Dashboard
Same management capabilities as Project 1:
- Profile & Hero, Skills, Projects, Experience, Certificates, Achievements,
  Education, Contact Information, Account Settings (change password)

Content added/edited/deleted in the admin panel reflects immediately on the
public portfolio — no code changes required.

## Important Security Note
Before deploying this publicly:
1. Change the default admin password immediately.
2. Change `JWT_SECRET` in `.env` to a long, random string (different from Project 1's).
3. Consider changing the secret admin URL path (`/secure-panel-q7m4-access`).
4. Use HTTPS in production.

## Running Both Projects Simultaneously (Local Testing)
Project 1 and Project 2 use different ports and different MongoDB database names
by default, so you can run both side-by-side on the same machine:

| | Project 1 | Project 2 |
|---|---|---|
| Backend port | 5001 | 5001 |
| Frontend port | 3000 | 3000 |
| MongoDB DB name | portfolio_db_1 | portfolio_db_2 |
| Admin path | /portal-x9k2-secure-access | /secure-panel-q7m4-access |
