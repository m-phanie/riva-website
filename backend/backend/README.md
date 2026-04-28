# RIVA Backend - Authentication System

## Overview
Production-level authentication system with role-based access control (RBAC) for RIVA Smart Mobility System using JSON file-based storage.

## Features
- JWT-based authentication
- Secure password hashing with bcrypt
- Three user roles: driver (default), manager, admin
- Role-based middleware for API protection
- Admin endpoint for role assignment
- JSON file-based storage (no MongoDB required)

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env` and configure:
```bash
PORT=5000
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

### 3. Start the Server
```bash
npm run dev  # Development with nodemon
npm start   # Production
```

## Data Storage
- Users are stored in `backend/data/users.json`
- The JSON file is automatically created on first run
- No database installation required

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (default role: driver)
- `POST /api/auth/login` - Login user and get JWT token
- `GET /api/auth/me` - Get current logged in user

### Admin (Protected)
- `PUT /api/admin/users/:id/role` - Update user role (admin only)
- `GET /api/admin/users` - Get all users (admin only)

## User Roles
- **driver** (default on signup): Access to driver dashboard
- **manager**: Access to manager dashboard with fleet management
- **admin** (government): Full system access, can assign roles

## Security Features
- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 30-day expiration
- Role-based middleware for route protection
- Prevents privilege escalation

## Frontend Integration
The frontend should:
- Store JWT token in localStorage after login
- Include token in Authorization header (Bearer token)
- Redirect users based on role after login
- Handle 401/403 responses appropriately
