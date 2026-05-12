# CanvasLab

CanvasLab is a full-stack web application that enables users to create, edit, save, and manage digital paintings directly in the browser. The project demonstrates a complete client-server architecture with secure authentication, persistent storage, RESTful API design, automated testing, and interactive API documentation.

The application combines an interactive HTML5 Canvas frontend with a Node.js and PostgreSQL backend following a layered service-based architecture.

---

## Overview

CanvasLab was developed as a systems analysis and full-stack engineering project focused on:

- REST API design
- Authentication and authorization
- Layered backend architecture
- Secure session handling
- CRUD operations
- Database integration
- Automated testing
- API documentation
- Deployment workflows

The backend architecture separates routing, controller logic, business logic, and middleware into dedicated layers to improve maintainability, scalability, and testability.

---

## Features

### Authentication & Security

- JWT-based authentication
- HttpOnly cookie session management
- Password hashing using bcrypt
- Protected API routes via middleware
- Per-user resource isolation
- Authorization checks for protected actions
- Secure cross-origin authentication with CORS

### Painting Management

- Create digital paintings
- Retrieve saved paintings
- Update existing paintings
- Delete paintings
- User-specific painting storage
- Persistent PostgreSQL database storage

### Frontend

- Interactive HTML5 Canvas drawing system
- Brush and eraser tools
- Color picker
- Adjustable brush size
- Painting persistence and retrieval

### Backend Engineering

- RESTful API design
- Service layer architecture
- Modular route structure
- Centralized middleware
- Structured error handling
- Swagger/OpenAPI integration
- Unit-tested business logic

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
- JWT Authentication
- bcrypt
- cookie-parser

### Tooling & Documentation

- Jest (unit testing)
- Swagger / OpenAPI
- Git & GitHub
- Render (deployment)

---

## Project Structure

```text
canvasLab/
│
├── server/
│   ├── controllers/     # HTTP request/response handling
│   ├── services/        # Business logic layer
│   ├── routes/          # API endpoint definitions
│   ├── middleware/      # Authentication middleware
│   ├── config/          # Database and Swagger configuration
│   ├── tests/           # Jest unit tests
│   └── server.js        # Application entry point
│
├── src/                 # Frontend application logic
├── styles.css
└── README.md
```

---

## Architecture

The backend follows a layered architecture pattern:

### Routes Layer

Defines API endpoints and maps requests to controllers.

### Controller Layer

Handles:

- request validation
- HTTP responses
- status codes
- interaction with services

### Service Layer

Contains isolated business logic and database operations.  
This separation improves:

- maintainability
- readability
- unit testing capability

### Middleware Layer

Responsible for:

- authentication
- JWT verification
- protected route access
- session validation

---

## Authentication System

CanvasLab uses JWT authentication stored in secure HttpOnly cookies.

### Authentication Flow

1. User registers via `/auth/register`
2. User logs in via `/auth/login`
3. Server generates JWT token
4. JWT is stored as an HttpOnly cookie
5. Browser automatically sends cookie with authenticated requests
6. Middleware validates JWT and attaches authenticated user data to requests

### Why HttpOnly Cookies?

Using HttpOnly cookies improves security by preventing client-side JavaScript from directly accessing authentication tokens, reducing exposure to XSS-based token theft.

---

## API Documentation

Interactive API documentation is available through Swagger UI.

### Local Development

```text
http://localhost:3000/api-docs
```

### Production

```text
https://canvaslab.onrender.com/api-docs
```
---
Swagger documentation includes:

- endpoint descriptions
- request schemas
- response schemas
- authentication behavior
- HTTP status codes
- protected route documentation
- session-based authentication flow

---

## Core API Endpoints

### Authentication

| Method | Endpoint         | Description                                                |
| ------ | ---------------- | ---------------------------------------------------------- |
| POST   | `/auth/register` | Register a new user                                        |
| POST   | `/auth/login`    | Authenticate user and create secure HttpOnly session cookie |
| GET    | `/auth/me`       | Retrieve currently authenticated user                      |
| POST   | `/auth/logout`   | Logout user and clear authentication cookie                |

---

### Users

| Method | Endpoint      | Description                    |
| ------ | ------------- | ------------------------------ |
| DELETE | `/users/:id`  | Delete authenticated user      |

---

### Paintings

| Method | Endpoint            | Description                                         |
| ------ | ------------------- | --------------------------------------------------- |
| GET    | `/paintings`        | Retrieve all paintings for authenticated user       |
| GET    | `/paintings/:id`    | Retrieve a specific painting                        |
| POST   | `/paintings`        | Create a new painting                               |
| PUT    | `/paintings/:id`    | Update an existing painting                         |
| DELETE | `/paintings/:id`    | Delete a painting                                   |

---

## Authentication

CanvasLab uses secure session-based authentication with JWT stored inside HttpOnly cookies.

### Authentication Flow

1. User registers via `/auth/register`
2. User logs in via `/auth/login`
3. Server creates a secure HttpOnly JWT cookie
4. Browser automatically includes cookie in authenticated requests
5. Frontend restores user session through `/auth/me`
6. User logs out via `/auth/logout`

Protected routes require a valid authenticated session cookie.

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/JavedanCode/canvasLab.git
cd canvasLab/server
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file inside `/server`:

```env
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
```

---

### 4. Run Development Server

```bash
npm run dev
```

Server will start at:

```text
http://localhost:3000
```

---

## Testing

Business logic is unit tested using Jest.

### Run Tests

```bash
npm test
```

### Test Coverage Includes

- User service logic
- Authentication logic
- Painting service logic
- CRUD operations
- Error handling
- Edge cases
- Authorization scenarios

---

## Deployment

### Backend

- Hosted on Render
- PostgreSQL database hosted on Render

### Frontend

- Hosted on GitHub Pages

---

## Design Decisions

### Service Layer Architecture

Business logic is separated from controllers to:

- improve maintainability
- simplify testing
- reduce controller complexity
- isolate database operations

---

### JWT + HttpOnly Cookies

JWT authentication combined with HttpOnly cookies provides:

- stateless authentication
- secure browser-managed sessions
- protection against token theft via JavaScript

---

### PostgreSQL

PostgreSQL was selected for:

- relational data modeling
- reliability
- structured querying
- scalability

---

### Swagger Integration

Swagger/OpenAPI provides:

- interactive API testing
- formal API documentation
- improved developer experience
- clearer backend contracts

---

## Security Considerations

The project includes several security-focused improvements:

- Password hashing with bcrypt
- Protected route middleware
- User-specific resource access
- Authorization validation
- Secure cookie-based authentication
- Removal of unrestricted user listing endpoints
- Proper HTTP status code handling

---

## Known Limitations

- Image data is stored as Base64
- No image compression implemented
- No pagination for large datasets
- Free-tier backend deployment may experience cold starts
- Paintings are stored directly in the database rather than object storage

---

## Future Improvements

- Cloud image storage integration (AWS S3 / Cloudinary)
- Image compression and optimization
- Public gallery functionality
- Pagination and filtering
- Role-based authorization
- Refresh token implementation
- Improved frontend UI/UX
- Real-time collaboration features

---

## License

This project is licensed under the MIT License.
