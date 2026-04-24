# 🎨 CanvasLab

CanvasLab is a web-based drawing application that allows users to create, edit, and save digital paintings directly in the browser.

This project is being developed as part of a **System Analysis and Design** course and focuses on building a complete full-stack system with authentication, data persistence, and user-specific content.

---

## 🚀 Features

### 🔐 Authentication

- User registration with secure password hashing
- Login system using JWT (JSON Web Tokens)
- Protected routes using middleware

### 🖼️ Paintings System

- Create new paintings
- Save drawings as Base64 image data
- Retrieve all paintings for a user
- View individual paintings
- Update paintings (supports autosave)
- Delete paintings

### 👤 User-Based Data Ownership

- Each painting is linked to a specific user
- Users can only access and modify their own data

---

## 🧠 Technologies Used

### Backend

- Node.js
- Express.js
- MySQL
- JWT (Authentication)
- bcrypt (Password hashing)

### Development Tools

- Nodemon
- Postman (API testing)

---

## 📁 Project Structure

```plaintext
server/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── userController.js
│   └── paintingController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── routes/
│   ├── users.js
│   └── paintings.js
│
└── server.js
```

---

## 🔑 API Overview

### Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/login`

### Painting Routes (Protected)

- `GET /api/paintings`
- `GET /api/paintings/:id`
- `POST /api/paintings`
- `PUT /api/paintings/:id`
- `DELETE /api/paintings/:id`

---

## 🔐 Authentication Flow

1. User logs in
2. Server returns a JWT token
3. Client stores token
4. Token is sent with requests:

   ```
   Authorization: Bearer <token>
   ```

5. Middleware verifies token and attaches user info to request

---

## 💾 Data Model

### Users

- id
- username
- email
- password_hash

### Paintings

- id
- user_id
- title
- image_data (Base64)
- created_at (optional)
- updated_at (optional)

---

## ⚙️ Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/your-username/canvasLab.git
cd canvasLab
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=drawing_app
PORT=3000
JWT_SECRET=your_secret_key
```

4. Start the server

```bash
npm run dev
```

---

## 🧪 Testing

Use Postman to test endpoints:

- Register → Login → Get token
- Add token to headers:

  ```
  Authorization: Bearer <token>
  ```

- Test painting routes

---

## 🚧 Current Status

The backend is functional and supports authentication and painting CRUD operations.

Frontend integration (canvas drawing and UI) is currently in progress.

---

## 🔮 Future Improvements

- Frontend drawing canvas (HTML5 Canvas)
- Autosave functionality optimization
- Image compression instead of Base64
- Better error handling and validation
- UI/UX improvements
- Deployment

---

## 📚 Purpose

This project demonstrates:

- REST API design
- Authentication and authorization
- Database relationships
- Full-stack application architecture

---

## 👨‍💻 Author

Soren Javedan
