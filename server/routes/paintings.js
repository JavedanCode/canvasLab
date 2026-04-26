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

paintingRoutes.get("/paintings", authMiddleware, getPaintings);

paintingRoutes.get("/paintings/:id", authMiddleware, getPainting);

// POST

paintingRoutes.post("/paintings", authMiddleware, createCanvas);

// PUT

paintingRoutes.put("/paintings/:id", authMiddleware, updatePainting);

// DELETE

paintingRoutes.delete("/paintings/:id", authMiddleware, deletePainting);

module.exports = paintingRoutes;
