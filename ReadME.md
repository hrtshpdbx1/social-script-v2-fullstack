# 🤝 SocialScript v2

[![Node](https://img.shields.io/badge/Node.js-v18+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-grey?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?style=flat-square&logo=mongodb)](https://www.mongodb.com/atlas)
[![JWT](https://img.shields.io/badge/Auth-JWT-pink?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![Status](https://img.shields.io/badge/Status-Backend%20complete-brightgreen?style=flat-square)](#-roadmap)

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
| **Node.js + Express 5** | Server and routing | Lightweight, async, native hot-reload with `node --watch` |
| **MongoDB Atlas + Mongoose** | Database | NoSQL fits the data structure well (choices are embedded directly inside scenario documents) |
| **JWT (jsonwebtoken)** | Authentication | Stateless, no server-side session needed |
| **Argon2** | Password hashing | Recommended algorithm in 2024+, replaces MD5 and bcrypt |
| **Yup** | Input validation | Declarative schemas used as route middlewares |
| **dotenv** | Environment variables | No secrets in the code or on Git |
| **cors** | Cross-Origin Resource Sharing | Configured to accept requests from the frontend origin |

---

## 🗂️ Backend architecture

The API follows a **layered architecture (extended MVC)** with a strict separation of responsibilities:

```
server/
├── app.js                        # Entry point: Express config and global middlewares
├── .env                          # Environment variables (not committed)
├── .env.example                  # Template to copy
│
├── config/
│   └── database.js               # MongoDB Atlas connection
│
├── models/                       # Mongoose schemas
│   ├── difficulty.model.js       # Difficulty levels (easy, medium, hard)
│   ├── theme.model.js            # Scenario themes (ref difficultyId, moderation status)
│   ├── scenario.model.js         # Scenarios with embedded choices (subdocuments)
│   ├── user.model.js             # User accounts (email, hashed password, role)
│   ├── reports.model.js          # Reports (ref scenarioId, reporterId, status)
│   ├── ressource.model.js        # External resources (podcasts, books, NGOs...)
│   └── ressourceCategory.model.js# Resource categories
│
├── routes/                       # Endpoint definitions and middleware application
│   ├── index.js                  # Central router, mounts all sub-routers under /api
│   ├── auth.router.js
│   ├── difficulties.router.js
│   ├── themes.router.js          # mergeParams: true (inherits difficultyId)
│   ├── scenarios.router.js       # mergeParams: true
│   ├── admin.router.js
│   ├── resource.router.js
│   └── resourceCategory.router.js
│
├── controllers/                  # HTTP layer: reads req, calls service, sends res
│   ├── auth.controller.js
│   ├── difficulty.controller.js
│   ├── theme.controller.js
│   ├── scenario.controller.js
│   ├── report.controller.js
│   ├── admin.controller.js
│   ├── resource.controller.js
│   └── resourceCategory.controller.js
│
├── services/                     # Business logic and direct Mongoose interactions
│   ├── auth.service.js
│   ├── difficulty.service.js
│   ├── theme.service.js
│   ├── scenario.service.js
│   ├── report.service.js
│   ├── admin.service.js
│   ├── resource.service.js
│   ├── resourceCategory.service.js
│   └── user.service.js
│
├── middlewares/
│   ├── auth/
│   │   ├── auth.middleware.js         # Verifies and decodes the JWT → populates req.user
│   │   ├── role.middleware.js         # Checks req.user.role against allowed roles
│   │   └── userAuthorization.middleware.js  # Checks ownership (user = resource owner)
│   └── scenario-validation.js        # Applies a Yup schema to req.body
│
├── validators/
│   └── scenario.validator.js         # Yup schema for scenario creation
│
└── utils/
    ├── error.utils.js                # createError + helpers (notFound, forbidden, etc.)
    └── jwt.utils.js                  # generate and decode JWT tokens
```

> **Why this separation?** Each layer has one responsibility. The controller does not talk to Mongoose directly: that is what the service is for. If the database changes from MongoDB to PostgreSQL in the future, only the services need to be updated. Everything else stays the same.

---

## 📡 API routes

### Public routes (no authentication required)

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/difficulties` | List of difficulty levels |
| `GET` | `/api/difficulties/:difficultyId/themes` | Approved themes for a given difficulty |
| `GET` | `/api/difficulties/:difficultyId/themes/:themeId/scenarios` | Approved scenarios for a theme (title and context only) |
| `GET` | `/api/scenarios` | List all scenarios (filterable via `?themeId=&difficultyId=`) |
| `GET` | `/api/scenarios/:id` | Full scenario including choices |
| `GET` | `/api/resource-categories` | List all resource categories |
| `GET` | `/api/resource-categories/:categoryId/resources` | Published resources for a category |
| `GET` | `/api/resources/:resourceId` | Detail of a specific resource |

### Authentication

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Create an account |
| `POST` | `/api/auth/login` | Log in and receive a JWT |
| `GET` | `/api/auth/me` | Get current user info (token required) |

### Logged-in users (`requireAuth`)

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/scenarios` | Submit a scenario (status defaults to `pending`) |
| `GET` | `/api/scenarios/users/:id/scenarios` | List scenarios submitted by a user |
| `POST` | `/api/difficulties/:difficultyId/themes` | Propose a new theme (status defaults to `pending`) |
| `POST` | `/api/scenarios/:scenarioId/report` | Report a problematic scenario |

### Moderation (`requireRole('moderator', 'admin')`)

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/admin/scenarios` | List scenarios awaiting validation |
| `PATCH` | `/api/admin/scenarios/:scenarioId/status` | Approve or reject a scenario |
| `GET` | `/api/admin/themes` | List themes awaiting validation |
| `PATCH` | `/api/admin/themes/:themeId/status` | Approve or reject a theme |
| `GET` | `/api/admin/report` | List all reports (filterable via `?status=pending`) |
| `PATCH` | `/api/admin/report/:reportId` | Process a report |
| `POST` | `/api/resources` | Add a resource |
| `PATCH` | `/api/resources/:id` | Update a resource (e.g. publish it) |
| `DELETE` | `/api/resources/:id` | Permanently delete a resource |

### Admin only (`requireRole('admin')`)

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/admin/users` | List all users |
| `PATCH` | `/api/admin/users/:userId/role` | Promote or demote a user |
| `DELETE` | `/api/admin/scenarios/:scenarioId` | Soft-delete a scenario |

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
# DB_CONNECTION=mongodb+srv://<user>:<password>@cluster.mongodb.net/socialscript
# JWT_SECRET=a_long_and_random_secret_key
# JWT_ISSUER=MongoSocialScriptAPI
# JWT_AUDIENCE=ReactSocialScriptApp
# CORS_ORIGIN=http://localhost:5173

# 4. Start the server (native hot-reload)
npm run dev
```

The server runs at `http://localhost:3000`.

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
- Yup validation on scenario creation

### ✅ Moderation, reporting and polish
- Report model and reporting route
- Admin routes: scenario, theme and report moderation
- User management: role promotion, edge case protection
- Resources and categories (CRUD with publication workflow)
- Soft delete on scenarios (`deletedAt` field)
- Global error handler with `isOperational` flag
- Consistent HTTP status codes across all routes
- CORS configured for frontend origin
- Full Insomnia collection exported

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
