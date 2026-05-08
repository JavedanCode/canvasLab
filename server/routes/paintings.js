const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const db = require("../config/db.js");
const {
  getPaintings,
  getPainting,
  createCanvas,
  updatePainting,
  deletePainting,
} = require("../controllers/paintingController.js");

const paintingRoutes = express.Router();

// GET
/**
 * @swagger
 * /paintings:
 *   get:
 *     summary: Get all paintings for the logged-in user
 *     description: |
 *       Requires authenticated session cookie.
 *     tags: [Paintings]
 *     responses:
 *       200:
 *         description: List of paintings
 *       401:
 *         description: Unauthorized - no valid session cookie
 *       403:
 *         description: Invalid or expired token
 */
paintingRoutes.get("/paintings", authMiddleware, getPaintings);

/**
 * @swagger
 * /paintings/{id}:
 *   get:
 *     summary: Get a painting by ID
 *     description: |
 *       Requires authenticated session cookie.
 *     tags: [Paintings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Painting found
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized - no valid session cookie
 *       403:
 *         description: Invalid or expired token
 *
 */
paintingRoutes.get("/paintings/:id", authMiddleware, getPainting);

// POST
/**
 * @swagger
 * /paintings:
 *   post:
 *     summary: Create a new painting
 *     description: |
 *       Requires authenticated session cookie.
 *     tags: [Paintings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [image_data]
 *             properties:
 *               title:
 *                 type: string
 *                 example: My Art
 *               image_data:
 *                 type: string
 *                 example: base64string
 *     responses:
 *       201:
 *         description: Painting created
 *       401:
 *         description: Unauthorized - no valid session cookie
 *       403:
 *         description: Invalid or expired token
 */
paintingRoutes.post("/paintings", authMiddleware, createCanvas);

// PUT
/**
 * @swagger
 * /paintings/{id}:
 *   put:
 *     summary: Update a painting
 *     description: |
 *       Requires authenticated session cookie.
 *     tags: [Paintings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image_data:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *       401:
 *         description: Unauthorized - no valid session cookie
 *       403:
 *         description: Invalid or expired token
 */
paintingRoutes.put("/paintings/:id", authMiddleware, updatePainting);

// DELETE
/**
 * @swagger
 * /paintings/{id}:
 *   delete:
 *     summary: Delete a painting
 *     description: |
 *       Requires authenticated session cookie.
 *     tags: [Paintings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 *       401:
 *         description: Unauthorized - no valid session cookie
 *       403:
 *         description: Invalid or expired token
 */
paintingRoutes.delete("/paintings/:id", authMiddleware, deletePainting);

module.exports = paintingRoutes;
