# CanvasLab

CanvasLab is a full-stack web application that enables users to create, edit, store, and manage digital paintings directly in the browser. The system provides a RESTful API with authentication, persistent storage, and an interactive frontend built with the HTML5 Canvas API.

---

## Overview

The application is designed as a data-centric system demonstrating full CRUD functionality, secure user authentication, and structured API design. It follows a layered backend architecture and includes automated testing and API documentation.

---

## Features

- User authentication using JSON Web Tokens (JWT)
- Create, read, update, and delete digital paintings
- Per-user data isolation
- Interactive drawing canvas (brush, eraser, color tools)
- Persistent storage using PostgreSQL
- RESTful API with proper HTTP methods and status codes
- Unit-tested business logic
- Interactive API documentation via Swagger (OpenAPI)

---

## Technology Stack

### Frontend

- Vanilla JavaScript
- HTML5 Canvas API
- CSS

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT (authentication)
- bcrypt (password hashing)

### Tooling

- Jest (unit testing)
- Swagger (OpenAPI documentation)
- Git & GitHub (version control)

---

## Project Structure

```
canvasLab/
│
├── server/
│   ├── controllers/     # HTTP layer (request/response handling)
│   ├── services/        # Business logic (testable layer)
│   ├── routes/          # API route definitions
│   ├── middleware/      # Authentication middleware
│   ├── config/          # Database and Swagger configuration
│   ├── tests/           # Unit tests (Jest)
│   └── server.js        # Application entry point
│
├── src/                 # Frontend logic
├── styles.css
└── README.md
```

---

## API Documentation

Interactive API documentation is available via Swagger UI:

```
http://localhost:3000/api-docs
```

This interface allows:

- Exploring all endpoints
- Sending real HTTP requests
- Viewing request and response structures
- Testing authentication-protected routes

---

## Authentication

The API uses JWT-based authentication.

### Flow

1. User registers via `/auth/register`
2. User logs in via `/auth/login`
3. Server returns a JWT token
4. Token must be included in subsequent requests:

```
Authorization: Bearer <token>
```

Protected routes require a valid token.

---

## Core API Endpoints

### Authentication

- `POST /auth/register` — Register a new user
- `POST /auth/login` — Authenticate user and receive JWT

### Users

- `GET /users` — Retrieve all users (protected)
- `GET /users/:id` — Retrieve a specific user (protected)
- `DELETE /users/:id` — Delete a user (protected)

### Paintings

- `GET /paintings` — Retrieve all paintings for the authenticated user
- `GET /paintings/:id` — Retrieve a specific painting
- `POST /paintings` — Create a new painting
- `PUT /paintings/:id` — Update an existing painting
- `DELETE /paintings/:id` — Delete a painting

---

## Installation

### 1. Clone the repository

```
git clone https://github.com/JavedanCode/canvasLab.git
cd canvasLab/server
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Configure environment variables

Create a `.env` file inside `/server`:

```
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
```

---

### 4. Run the server

```
npm run dev
```

The server will start at:

```
http://localhost:3000
```

---

## Testing

Unit tests are implemented for all business logic using Jest.

Run tests with:

```
npm test
```

Tests cover:

- User service logic
- Authentication logic
- Painting service logic
- Edge cases and failure scenarios

---

## Design Decisions

- **Service Layer Architecture**
  Business logic is separated from controllers to ensure clean structure and testability.

- **JWT Authentication**
  Stateless authentication suitable for RESTful APIs.

- **PostgreSQL**
  Reliable relational database with structured querying.

- **Swagger Integration**
  Provides an explicit API contract and interactive testing interface.

---

## Known Limitations

- Image data is stored as Base64 (not optimized for large-scale systems)
- No pagination for large datasets
- No image compression implemented
- Backend hosted on free tier may experience cold starts

---

## Future Improvements

- Migrate image storage to cloud services (e.g., AWS S3, Cloudinary)
- Implement pagination and filtering
- Add image compression and optimization
- Improve UI/UX
- Introduce public gallery or sharing features

---

## License

This project is licensed under the MIT License.
