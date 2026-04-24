const express = require("express");

const {
  getUsers,
  getUser,
  registerUser,
  handleLogin,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// GET

router.get("/users", getUsers);

router.get("/users/:id", getUser);

// POST

router.post("/auth/register", registerUser);

router.post("/auth/login", handleLogin);

// DELETE

router.delete("/users/:id", deleteUser);

module.exports = router;
