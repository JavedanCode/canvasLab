# 🎨 CanvasLab

A simple full-stack painting app where users can create, edit, save, and manage their own drawings.

---

## ✨ Features

### 🔐 Authentication

- User registration & login
- JWT-based authentication
- Protected routes

### 🖌️ Canvas Editor

- Draw with brush tool
- Erase parts of the drawing
- Adjustable brush size
- Color picker
- Clear canvas

### 💾 Persistence

- Save paintings to backend
- Update existing paintings
- Load saved paintings

### 📁 Painting Management

- Grid-based dashboard
- Create new paintings
- Delete paintings
- Always-visible “+” card for new canvas

### ⬇️ Export

- Download drawings as PNG

### ✏️ UX Features

- Editable painting titles (double-click)
- Smooth UI transitions
- Glassmorphism-inspired design
- Responsive layout

---

## 🧱 Tech Stack

### Frontend

- Vanilla JavaScript (modular)
- CSS (Flexbox + Grid)
- Canvas API

### Backend

- Node.js
- Express
- REST API

### Other

- JWT Authentication
- LocalStorage for session handling

---

## 📂 Project Structure

```
src/
│
├── ui/
│   ├── login.js
│   ├── registration.js
│   ├── menu.js
│   ├── canvas.js
│   └── layout.js
│
├── util/
│   ├── validation.js
│   └── errorHelper.js
│
├── img/
│   ├── canvasLab.svg
│   └── github-mark.svg
│
├── index.js
├── styles.css
└── template.html
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/canvasLab.git
cd canvasLab
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

### 4. Start backend

Make sure your backend server is running on:

```
http://localhost:3000
```

---

## 🔗 API Endpoints

### Paintings

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| GET    | /paintings     | Get all user images |
| GET    | /paintings/:id | Get single painting |
| POST   | /paintings     | Create new painting |
| PUT    | /paintings/:id | Update painting     |
| DELETE | /paintings/:id | Delete painting     |

---

## 🧠 How It Works

- Canvas data is stored as **Base64 PNG**
- On save:
  - If no `id` → create new painting
  - If `id` exists → update painting
- Title changes are tracked and sent only when modified

---

## 🎯 Future Improvements

- Undo / redo system
- Brush smoothing & pressure simulation
- Layer support
- Image thumbnails in dashboard
- Drag & drop reordering
- Mobile optimization

---

## 👤 Author

**Soren Javedan**

---

## 📜 License

MIT License
