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

//GET
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: |
 *       Requires authenticated session cookie.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *       401:
 *         description: Unauthorized - no valid session cookie
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: User not found
 */
userRoutes.get("/users/:id", authMiddleware, getUser);

// POST
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: john@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing fields
 *       409:
 *         description: User already exists
 */
userRoutes.post("/auth/register", registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: |
 *       Authenticates the user and creates an HttpOnly JWT cookie.
 *       The browser automatically stores and sends the cookie for future authenticated requests.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
userRoutes.post("/auth/login", handleLogin);

// DELETE
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: |
 *       Requires authenticated session cookie.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted
 *       401:
 *         description: Unauthorized - no valid session cookie
 *       403:
 *         description: Invalid token or forbidden action
 *       404:
 *         description: User not found
 */
userRoutes.delete("/users/:id", authMiddleware, deleteUser);

module.exports = userRoutes;
