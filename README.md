# At Your Door Car Hiring Services — Deployment Guide

## Prerequisites

- **Node.js** v18+ installed
- **PostgreSQL** database running (local or cloud)
- **npm** package manager

---

## 1. Database Setup

Create a PostgreSQL database, then run the schema:

```bash
psql -U your_user -d your_database -f database/schema.sql
```

This creates all tables and seeds initial data (vehicles, services, testimonials, and admin user).

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

> ⚠️ Change these in production!

---

## 2. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your actual database URL and SMTP credentials
npm install
npm start
```

The API will run on `http://localhost:5000`.

### Environment Variables (.env)
| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `SMTP_HOST` | Email SMTP host (e.g., smtp.gmail.com) |
| `SMTP_PORT` | SMTP port (587) |
| `SMTP_USER` | Email address for sending |
| `SMTP_PASS` | Email password/app password |
| `ADMIN_EMAIL` | Admin notification email |
| `PORT` | Server port (default: 5000) |
| `FRONTEND_URL` | Frontend URL for CORS |

---

## 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will run on `http://localhost:3000`.

### Frontend Environment (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 4. Production Deployment

### Frontend → Vercel
1. Push code to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Set root directory to `frontend`
4. Add env variable: `NEXT_PUBLIC_API_URL=https://your-api-domain.com/api`
5. Deploy

### Backend → Render / Railway
1. Create a new Web Service
2. Set root directory to `backend`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add all env variables from `.env.example`

### Database → Supabase / Neon / Railway
1. Create a PostgreSQL database
2. Run `schema.sql` against it
3. Update `DATABASE_URL` in backend env

---

## Project Structure

```
├── frontend/              # Next.js 14 (App Router)
│   ├── app/               # Pages
│   │   ├── page.tsx        # Home
│   │   ├── about/          # About
│   │   ├── fleet/          # Fleet
│   │   ├── services/       # Services
│   │   ├── booking/        # Booking
│   │   ├── contact/        # Contact
│   │   └── admin/          # Admin (login + dashboard)
│   ├── components/         # Navbar, Footer, WhatsApp
│   └── lib/                # API client, constants
├── backend/                # Express.js API
│   ├── controllers/        # Request handlers
│   ├── routes/             # Route definitions
│   ├── models/             # Database queries
│   ├── middleware/          # JWT auth
│   ├── config/             # DB pool, email
│   └── server.js           # Entry point
└── database/
    └── schema.sql           # PostgreSQL schema + seed data
```
