# 🎨 CanvasLab

A full-stack web application that allows users to create, save, edit, and manage digital paintings directly in the browser.

Built with a custom frontend canvas engine and a Node.js + PostgreSQL backend, CanvasLab supports authentication, persistent storage, and real-time interaction.

---

## 🚀 Live Demo

🔗 https://canvaslab.onrender.com

> ⚠️ Note: The backend is hosted on Render (free tier), so the first request may take a few seconds due to cold start.

---

## ✨ Features

- 🔐 User authentication (JWT-based)
- 🎨 Interactive drawing canvas (brush, eraser, color picker, size control)
- 💾 Save and update paintings
- 🗂️ View all saved paintings per user
- 🗑️ Delete paintings
- 📥 Download artwork as image
- ☁️ Persistent cloud storage (PostgreSQL)

---

## 🧠 Tech Stack

### Frontend

- Vanilla JavaScript
- HTML5 Canvas API
- CSS

### Backend

- Node.js
- Express.js
- PostgreSQL (hosted on Render)
- JWT Authentication
- bcrypt (password hashing)

### Deployment

- Backend: Render
- Database: Render PostgreSQL
- Frontend: (Add your hosting here if deployed)

---

## 📁 Project Structure

```
canvasLab/
│
├── server/              # Backend (Node + Express)
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── src/                 # Frontend
│   ├── ui/
│   ├── util/
│   └── index.js
│
├── styles.css
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
```

---

## 🛠️ Installation (Local Development)

### 1. Clone repo

```
git clone https://github.com/your-username/canvasLab.git
cd canvasLab
```

---

### 2. Install backend dependencies

```
cd server
npm install
```

---

### 3. Set up environment variables

Create a `.env` file inside `/server`:

```
DATABASE_URL=your_local_or_remote_db
JWT_SECRET=your_secret
```

---

### 4. Run backend

```
npm run dev
```

---

### 5. Run frontend

Open `index.html` (or your dev setup)

---

## 🔐 Authentication Flow

- User registers → password hashed with bcrypt
- User logs in → receives JWT token
- Token stored in localStorage
- Protected routes use middleware to verify token
- `req.user` is attached from decoded token

---

## 💡 Key Learning Highlights

- Migrated from MySQL to PostgreSQL (cloud-ready)
- Implemented JWT-based authentication system
- Built custom REST API with protected routes
- Managed large payloads (canvas image data)
- Deployed full backend with environment variables and cloud DB

---

## ⚠️ Known Limitations

- Images are stored as Base64 (not optimized for production scale)
- No image compression yet
- No pagination for paintings
- Backend sleeps on inactivity (Render free tier)

---

## 🚧 Future Improvements

- Upload images to cloud storage (Cloudinary / S3)
- Add autosave functionality
- Add thumbnails for faster loading
- Improve UI/UX
- Add sharing / public gallery

---

## 🙌 Acknowledgements

Built as a learning project to understand full-stack development, authentication, and deployment workflows.

---

## 📄 License

This project is open-source and available under the MIT License.
