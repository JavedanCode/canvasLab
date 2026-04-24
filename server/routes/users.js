const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");

const {
  getUsers,
  getUser,
  registerUser,
  handleLogin,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// GET

router.get("/users", authMiddleware, getUsers);

router.get("/users/:id", authMiddleware, getUser);

// POST

router.post("/auth/register", registerUser);

router.post("/auth/login", handleLogin);

// DELETE

router.delete("/users/:id", authMiddleware, deleteUser);

module.exports = router;
