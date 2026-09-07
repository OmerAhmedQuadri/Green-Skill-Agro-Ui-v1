# Green Skill Agro ERP - Backend Authentication Integration Guide

## Executive Overview
This document outlines the architecture, data schemas, API contracts, and security protocols required to connect the Green Skill Agro ERP frontend to a production backend (Node.js/Express, Python/FastAPI, Go, or Java/Spring Boot).

Currently, the application uses a **Frontend Authentication-Ready Architecture** managed via:
- Context Provider: `src/context/AuthContext.jsx`
- Auth Mock Service: `src/services/authService.js`
- LocalStorage Persistence: `green_skill_user` key

---

## 1. Required API Endpoints

### 1.1 `POST /api/v1/auth/login`
Authenticates a user using email and password.

#### Request Body
```json
{
  "email": "superadmin@demo.local",
  "password": "Demo@SuperAdmin123",
  "rememberMe": true
}
```

#### Success Response (`200 OK`)
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "d8a1f2e3-b4c5...",
    "user": {
      "id": "USR-001",
      "name": "Faisal Al-Otaibi",
      "email": "superadmin@demo.local",
      "phone": "+966500000001",
      "role": "Super Admin",
      "roleKey": "superadmin",
      "accountStatus": "Active",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      "address": "Riyadh HQ, Olaya Towers Level 14",
      "permissions": [
        "Full Platform Control",
        "Admin Account Provisioning",
        "Global Enterprise Metrics",
        "System Security & Kill Switches"
      ]
    }
  }
}
```

---

### 1.2 `POST /api/v1/auth/signup`
Registers a new enterprise account.

#### Request Body
```json
{
  "name": "Tariq Al-Mansoor",
  "email": "tariq@demo.local",
  "phone": "+966500000005",
  "password": "StrongPassword123!",
  "confirmPassword": "StrongPassword123!",
  "agreeTerms": true
}
```

---

### 1.3 `POST /api/v1/auth/forgot-password`
Initiates a password reset link or temporary OTP email.

#### Request Body
```json
{
  "email": "manager@demo.local"
}
```

---

### 1.4 `POST /api/v1/auth/google`
Authenticates user via Google OAuth 2.0 ID Token.

#### Request Body
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIs..."
}
```

---

### 1.5 `GET /api/v1/auth/me`
Retrieves current authenticated user details using token in header.

#### Request Headers
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 1.6 `POST /api/v1/users/me/avatar`
Uploads a new user profile photo.

#### Multipart Form Data
- `file`: Image binary (JPG, PNG, WEBP, max 5MB)

---

## 2. Demo User Credentials (For Staging & Integration Testing)

| Role | Email | Mobile | Default Password | Initial View |
| :--- | :--- | :--- | :--- | :--- |
| **Super Admin** | `superadmin@demo.local` | `+966500000001` | `Demo@SuperAdmin123` | Platform Governance |
| **Admin** | `admin@demo.local` | `+966500000002` | `Demo@Admin123` | System Rules & Catalog |
| **Manager** | `manager@demo.local` | `+966500000003` | `Demo@Manager123` | Warehouse Control Center |
| **Seller** | `seller@demo.local` | `+966500000004` | `Demo@Seller123` | POS & Van Stock |

---

## 3. Frontend Service Migration Guide
To replace `authService.js` mock implementation with real backend calls:
1. Set `VITE_API_BASE_URL` in `.env`.
2. Update `src/services/authService.js` to call `fetch` or `axios` targeting backend endpoints.
3. Attach `Authorization: Bearer <token>` header to all ERP API requests (`src/services/api.js`).
