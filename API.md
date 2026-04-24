# 📖 SocialScript API Documentation

This documentation lists all available routes (endpoints) on the SocialScript API, along with their authorization levels and expected/returned data payloads.

---

## 🔐 1. Authentication (`/api/auth`)

### `POST /api/auth/register`

- **Description:** Registers a new user.
- **Protection:** Public
- **Expected Body:**
  ```json
  {
    "username": "Nickname",
    "email": "test@test.com",
    "password": "myPassword123!"
  }
  ```
- **Success Response (201 Created):**
  ```json
  { "id": "...", "firstname": "...", "lastname": "..." }
  ```

---

### `POST /api/auth/login`

- **Description:** Logs in an existing user and returns a JWT token.
- **Protection:** Public
- **Expected Body:**
  ```json
  {
    "email": "test@test.com",
    "password": "myPassword123!"
  }
  ```
- **Success Response (200 OK):**
  ```json
  { "id": "...", "firstName": "...", "lastName": "...", "email": "...", "token": "eyJhbGciOiJIUzI1..." }
  ```

---

### `GET /api/auth/me`

- **Description:** Retrieves the profile information of the currently logged-in user.
- **Protection:** Logged-in user (`requireAuth`)
- **Success Response (200 OK):**
  ```json
  { "id": "12345", "username": "Nickname", "email": "test@test.com", "role": "user" }
  ```

---

## 🧗‍♀️ 2. Difficulties & Themes (`/api/difficulties`)

### `GET /api/difficulties`

- **Description:** Lists all difficulty levels.
- **Protection:** Public
- **Success Response (200 OK):**
  ```json
  { "difficulties": [ { "_id": "...", "level": "Easy" } ] }
  ```

---

### `GET /api/difficulties/:difficultyId/themes`

- **Description:** Lists the themes associated with a specific difficulty.
- **Protection:** Public
- **Success Response (200 OK):**
  ```json
  { "themes": [ { "_id": "...", "name": "Bakery", "status": "approved" } ] }
  ```

---

### `POST /api/difficulties/:difficultyId/themes`

- **Description:** Proposes a new theme for a difficulty (status is `"pending"` by default).
- **Protection:** Logged-in user (`requireAuth`)
- **Expected Body:**
  ```json
  { "name": "Taking the bus", "description": "..." }
  ```
- **Success Response (201 Created):**
  ```json
  { "message": "Nouveau thème proposé avec succès. En attente de validation.", "data": { ... } }
  ```

---

### `GET /api/difficulties/:difficultyId/themes/:themeId/scenarios`

- **Description:** Lightweight list (title and context only) of approved scenarios for a specific theme.
- **Protection:** Public
- **Success Response (200 OK):**
  ```json
  { "scenarios": [ { "_id": "...", "title": "...", "context": "..." } ] }
  ```

---

## 🎭 3. Scenarios & Reports (`/api/scenarios`)

### `GET /api/scenarios`

- **Description:** Lists all scenarios (accepts URL query filters like `?themeId=...&difficultyId=...`).
- **Protection:** Public

---

### `POST /api/scenarios`

- **Description:** Creates a new scenario.
- **Protection:** Logged-in user (`requireAuth`) + Yup Validation
- **Expected Body:**
  ```json
  { "title": "...", "context": "...", "choices": [ ... ] }
  ```
- **Success Response:** `201 Created`

---

### `GET /api/scenarios/:id`

- **Description:** Retrieves the full details of a specific scenario.
- **Protection:** Public

---

### `GET /api/scenarios/users/:id/scenarios`

- **Description:** Lists all scenarios created by a specific user.
- **Protection:** Logged-in user (`requireAuth`)

---

### `POST /api/scenarios/:scenarioId/report`

- **Description:** Reports a problematic scenario.
- **Protection:** Logged-in user (`requireAuth`)
- **Expected Body:**
  ```json
  { "reason": "Offensive content", "description": "..." }
  ```
- **Success Response:** `201 Created`

> ⚠️ Basic `PUT`, `PATCH`, and `DELETE` routes on scenarios are planned but currently marked as **TODO**.

---

## 📚 4. Resources & Categories (`/api/resources` & `/api/resource-categories`)

### `GET /api/resource-categories`

- **Description:** Lists all resource categories (e.g., Book, Podcast, NGO).
- **Protection:** Public

---

### `GET /api/resource-categories/:categoryId/resources`

- **Description:** Lists the published resources (`isPublished: true`) for a specific category.
- **Protection:** Public

---

### `GET /api/resources/:resourceId`

- **Description:** Retrieves the details of a specific resource.
- **Protection:** Public

---

### `POST /api/resources`

- **Description:** Adds a new resource (`isPublished` defaults to `false`).
- **Protection:** Moderator or Admin
- **Expected Body:**
  ```json
  { "title": "Book", "categoryId": "...", "theme": "...", "link1": "..." }
  ```

---

### `PATCH /api/resources/:id`

- **Description:** Updates a resource (e.g., to publish it by passing `"isPublished": true`).
- **Protection:** Moderator or Admin

---

### `DELETE /api/resources/:id`

- **Description:** Permanently deletes a resource.
- **Protection:** Moderator or Admin
- **Success Response:** `204 No Content`

---

## 🛠️ 5. Administration (`/api/admin`)

> All routes in this section require at least the **moderator** role.

### `GET /api/admin/report`

- **Description:** Lists reports (filterable via URL query `?status=pending`).
- **Protection:** Moderator or Admin

---

### `PATCH /api/admin/report/:reportId`

- **Description:** Updates the status of a report (e.g., `reviewed`, `dismissed`).
- **Protection:** Moderator or Admin

---

### `GET /api/admin/scenarios`

- **Description:** Lists all scenarios awaiting validation (`pending`).
- **Protection:** Moderator or Admin

---

### `PATCH /api/admin/scenarios/:scenarioId/status`

- **Description:** Approves or rejects a scenario.
- **Protection:** Moderator or Admin
- **Expected Body:**
  ```json
  { "status": "approved" }
  ```

---

### `DELETE /api/admin/scenarios/:scenarioId`

- **Description:** Logically deletes (soft-deletes) a scenario.
- **Protection:** ⚠️ Admin Only
- **Success Response:** `204 No Content`

---

### `GET /api/admin/themes`

- **Description:** Lists themes awaiting validation.
- **Protection:** Moderator or Admin

---

### `PATCH /api/admin/themes/:themeId/status`

- **Description:** Approves or rejects a theme.
- **Protection:** Moderator or Admin

---

### `GET /api/admin/users`

- **Description:** Lists all registered users.
- **Protection:** ⚠️ Admin Only

---

### `PATCH /api/admin/users/:userId/role`

- **Description:** Promotes or demotes a user.
- **Protection:** ⚠️ Admin Only
- **Expected Body:**
  ```json
  { "role": "moderator" }
  ```