# 🤝 SocialScript v2

**A fullstack app to practice social interactions, without pressure and without judgment.**

SocialScript was built around a simple observation: social codes that seem obvious to many people can be a real challenge for neurodivergent individuals (autism, ADHD) or anyone who wants to build assertiveness skills. The idea is to offer a safe and supportive space to practice everyday interactions through scenarios, with immediate educational feedback on each choice made.

This repository contains **Version 2** of the project: a complete backend rebuild that transforms a vanilla JS prototype into a fullstack web application.

---

## 🌱 Where it started

V1 was built to test one question: can code be used to support social inclusion? It helped validate the concept, shape the UX, and confirm the project was worth pursuing.

But it had a structural limit. The data was static, users had no accounts, and all the logic was tied to the frontend. To go further (letting users contribute their own scenarios, adding a moderation workflow, securing and persisting data) a real backend was needed.

V2 is that rebuild.

---

## 📦 V1: what it was, and its limits

| Aspect | V1 |
|---|---|
| Stack | HTML / CSS / JavaScript ES6+ |
| Data | Static `db.json` file mocked with `json-server` |
| Auth | None |
| Persistence | None (data reset on page reload) |
| User contributions | Not possible |
| Deployment | Live Server + json-server locally |

V1 was a **proof of concept**. It served its purpose. V2 is the actual product.

---

## 🚀 V2: what it brings

- **Secure authentication**: account creation, login, and route protection with JWT
- **User Generated Content**: logged-in users can submit their own scenarios and themes
- **Moderation workflow**: every submitted piece of content goes through `pending` then `approved` or `rejected`, reviewed by moderators or admins
- **Role system**: three levels (`user`, `moderator`, `admin`) with clearly defined access rights
- **Content reporting**: users can flag a problematic scenario, and the report is tracked through to resolution
- **Server-side validation**: all inputs are validated through Yup middlewares before any database interaction
- **Scalable architecture**: clear separation of concerns, ready to connect to a frontend or other clients

---

## 🛠️ Tech stack and technical choices

| Technology | Role | Why |
|---|---|---|
| **Node.js + Express** | Server and routing | Lightweight, async, native hot-reload with `node --watch` |
| **MongoDB Atlas + Mongoose** | Database | NoSQL fits the data structure well (choices are embedded directly inside scenario documents) |
| **JWT (jsonwebtoken)** | Authentication | Stateless, no server-side session needed |
| **Argon2** | Password hashing | Recommended algorithm in 2024+, replaces MD5 and bcrypt |
| **Yup** | Input validation | Declarative schemas used as route middlewares |
| **dotenv** | Environment variables | No secrets in the code or on Git |

---

## 🗂️ Backend architecture

The API follows a **layered architecture (extended MVC)** with a strict separation of responsibilities:

```
server/
├── app.js                  # Entry point: Express config and global middlewares
├── .env                    # Environment variables (not committed)
├── .env.example            # Template to copy
│
├── config/
│   └── database.js         # MongoDB Atlas connection
│
├── models/                 # Mongoose schemas
│   ├── difficulty.model.js # Difficulty levels (easy, medium, hard)
│   ├── theme.model.js      # Scenario themes (ref difficultyId, moderation status)
│   ├── scenario.model.js   # Scenarios with embedded choices (subdocuments)
│   ├── user.model.js       # User accounts (email, hashed password, role)
│   └── report.model.js     # Reports (ref scenarioId, reporterId, status)
│
├── routes/                 # Endpoint definitions and middleware application
│   ├── index.js
│   ├── difficulties.router.js
│   ├── themes.router.js
│   ├── scenarios.router.js
│   ├── auth.router.js
│   └── reports.router.js
│
├── controllers/            # HTTP request handling (req to res)
├── services/               # Business logic and direct Mongoose interactions
└── middlewares/
    ├── requireAuth.js      # Verifies and decodes the JWT
    ├── requireRole.js      # Checks the user's role
    ├── validate.js         # Applies a Yup schema to req.body
    └── errorHandler.js     # Centralized error handling
```

> **Why this separation?** Each layer has one responsibility. The controller does not talk to Mongoose directly: that is what the service is for. If the database changes from MongoDB to PostgreSQL in the future, only the services need to be updated. Everything else stays the same.

---

## 📡 Main API routes

### Public routes (no authentication required)

| Method | Route | Description |
|---|---|---|
| `GET` | `/difficulties` | List of difficulty levels |
| `GET` | `/difficulties/:id/themes` | Themes for a given difficulty |
| `GET` | `/themes/:id/scenarios` | Approved scenarios for a theme (without choices) |
| `GET` | `/scenarios/:id` | Full scenario including choices |

### Authentication

| Method | Route | Description |
|---|---|---|
| `POST` | `/auth/register` | Create an account |
| `POST` | `/auth/login` | Log in and receive a JWT |

### Logged-in users (`requireAuth`)

| Method | Route | Description |
|---|---|---|
| `POST` | `/scenarios` | Submit a scenario (status set to `pending`) |
| `POST` | `/themes` | Propose a new theme (status set to `pending`) |
| `POST` | `/scenarios/:id/report` | Report a scenario |

### Moderation (`requireRole('moderator', 'admin')`)

| Method | Route | Description |
|---|---|---|
| `GET` | `/admin/scenarios?status=pending` | List scenarios waiting for review |
| `PATCH` | `/admin/scenarios/:id/status` | Approve or reject a scenario |
| `GET` | `/admin/themes?status=pending` | List themes waiting for review |
| `PATCH` | `/admin/themes/:id/status` | Approve or reject a theme |
| `GET` | `/admin/reports` | List all reports |
| `PATCH` | `/admin/reports/:id` | Process a report |

### Admin only (`requireRole('admin')`)

| Method | Route | Description |
|---|---|---|
| `GET` | `/admin/users` | List all users |
| `PATCH` | `/admin/users/:id/role` | Change a user's role |
| `DELETE` | `/admin/scenarios/:id` | Permanently delete a scenario |

---

## ⚙️ Run the project locally

### Requirements

- Node.js v18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier available)
- [Insomnia](https://insomnia.rest/) or Postman to test the API

### Setup

```bash
# 1. Clone the repository
git clone <project-url>
cd SocialScript/server

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Open .env and fill in:
# PORT=3000
# MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/socialscript
# JWT_SECRET=a_long_and_random_secret_key

# 4. Start the server (native hot-reload)
node --watch app.js
```

The server runs at `http://localhost:3000`.
Test it with `GET /` and expect `{ "message": "Welcome to the SocialScript API" }`.

---

## 🗺️ Roadmap

### ✅ Foundations and public read access
- Layered architecture set up
- MongoDB Atlas connection
- Models: Difficulty, Theme, Scenario (with embedded choices)
- Public read routes: difficulties, themes, scenarios

### ✅ Authentication and user contributions
- User model (email, Argon2-hashed password, role)
- Register and login with JWT
- `requireAuth` and `requireRole` middlewares
- Protected routes: scenario and theme submission (status defaults to `pending`)
- Yup validation on all inputs

### 🔄 Moderation, reporting and polish *(in progress)*
- Report model and reporting route
- Admin routes (scenario, theme and report moderation)
- User management (role promotion, deletion)
- Resources and categories
- Polish: consistent HTTP codes, try/catch coverage, CORS config, `API.md` documentation

### 🔜 Coming next
- Automated tests (Jest + Supertest)
- List pagination
- Rate limiting
- Refresh tokens and password reset by email
- Deployment (Render or Railway)
- Frontend (connecting the V1 interface to the new backend)

---

## 👤 Author

**Louise Moraldy**
[LinkedIn](https://www.linkedin.com/in/louise-moraldy/) · [Portfolio](https://louisemoraldy.vercel.app/)

> *This project was built with the belief that code can be a tool for social inclusion.*