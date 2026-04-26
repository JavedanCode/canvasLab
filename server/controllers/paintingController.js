const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const db = require("../config/db");

// GET ALL
const getPaintings = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM paintings WHERE user_id = $1",
      [req.user.id],
    );

    return res.status(200).json({ data: result.rows });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET ONE
const getPainting = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Please provide an ID" });
  }

  try {
    const result = await db.query(
      "SELECT * FROM paintings WHERE id = $1 AND user_id = $2",
      [id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Painting doesn't exist" });
    }

    return res.status(200).json({ data: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// CREATE
const createCanvas = async (req, res) => {
  if (!req.body.image_data) {
    return res.status(400).json({ message: "No image data" });
  }

  const { image_data } = req.body;
  const title = req.body.title || "untitled";

  try {
    const result = await db.query(
      `INSERT INTO paintings(title, image_data, user_id)
       VALUES($1, $2, $3)
       RETURNING id`,
      [title, image_data, req.user.id],
    );

    return res.status(201).json({
      message: "Canvas Created Successfully",
      paintingId: result.rows[0].id,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE
const updatePainting = async (req, res) => {
  const id = req.params.id;
  const { title, image_data } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Please provide an ID" });
  }

  try {
    const result = await db.query(
      `UPDATE paintings
       SET title = COALESCE($1, title),
           image_data = COALESCE($2, image_data)
       WHERE id = $3 AND user_id = $4`,
      [title, image_data, id, req.user.id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Painting doesn't exist" });
    }

    return res.status(200).json({ message: "Painting updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE
const deletePainting = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Please provide an ID" });
  }

  try {
    const result = await db.query(
      "DELETE FROM paintings WHERE id = $1 AND user_id = $2",
      [id, req.user.id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Painting not found" });
    }

    return res.status(200).json({ message: "Painting deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getPaintings,
  getPainting,
  createCanvas,
  updatePainting,
  deletePainting,
};
