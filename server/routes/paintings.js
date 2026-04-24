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

paintingRoutes.get("/painting", authMiddleware, getPaintings);

paintingRoutes.get("/painting/:id", authMiddleware, getPainting);

// POST

paintingRoutes.post("/painting", authMiddleware, createCanvas);

// PUT

paintingRoutes.put("/painting/:id", authMiddleware, updatePainting);

// DELETE

paintingRoutes.delete("/painting/:id", authMiddleware, deletePainting);

module.exports = paintingRoutes;
