const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");

const {
  getUsers,
  getUser,
  registerUser,
  handleLogin,
  deleteUser,
} = require("../controllers/userController");

const userRoutes = express.Router();

// GET

userRoutes.get("/users", authMiddleware, getUsers);

userRoutes.get("/users/:id", authMiddleware, getUser);

// POST

userRoutes.post("/auth/register", registerUser);

userRoutes.post("/auth/login", handleLogin);

// DELETE

userRoutes.delete("/users/:id", authMiddleware, deleteUser);

module.exports = userRoutes;
