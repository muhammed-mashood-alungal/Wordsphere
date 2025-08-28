# Blog Application with User Management

App is live: [Live Link](https://wordsphere-tau.vercel.app/home) 
 (Initial API response may take a little time as it’s hosted on Render)

A full-stack Blog Application built with **Next.js** for the frontend, **Node.js + TypeScript** for the backend, and **MongoDB Atlas** as the database. The application supports user authentication, CRUD operations for blogs, and user management.

---

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete blog posts
- Role-based access for admin and normal users
- Secure password hashing using bcrypt
- MongoDB Atlas integration
- Fully typed backend using TypeScript
- RESTful API endpoints


---

## Tech Stack

- Frontend: Next.js  
- Backend: Node.js + Express + TypeScript  
- Database: MongoDB Atlas  
- Authentication: JWT 
- Redis : Token Blacklisting

---

# Getting Started

### Prerequisites

- Node.js v22+  
- npm   
- MongoDB Atlas account  

---

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd <your-repo-folder>
```

### 2. Backend Setup
```bash
cd backend
npm install
```
### 3. Environment Variables

Create a .env file in the backend folder:
```bash
cd backend
npm install

PORT=5000
MONGO_URI=<your-mongo-url>
JWT_SECRET=<your-jwt-secret>
REDIS_HOST=<redis-host>          
REDIS_PORT=<redis-port>           
REDIS_USERNAME=<redis-username>  
REDIS_PASSWORD=<redis-password> 
CLIENT_URL=http://localhost:3001 
```
The given Mongo URI is temp atlas user created for testing purpose....

#### Run Backend

Development:
```bash
npm run dev
```
Production:
```bash
npm run build
npm start
```
---
#### Run Frontend

Development:
```bash
cd frontend
npm install

```
Create .env file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```
Run :
```bash
npm run dev
```
