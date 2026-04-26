const bcrypt = require("bcrypt");
const db = require("../config/db"); //import database
const jwt = require("jsonwebtoken");

// GET

const getPaintings = (req, res, next) => {
  db.query(
    `SELECT * FROM paintings WHERE user_id = ?`,
    [req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }

      return res.status(200).json({ data: result });
    },
  );
};

const getPainting = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Please provide an ID" });
  }
  db.query(
    `
        SELECT * FROM paintings WHERE id = ? AND user_id = ?`,
    [id, req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ data: result[0] });
    },
  );
};

//POST

const createCanvas = (req, res, next) => {
  if (!req.body.image_data) {
    return res.status(400).json({ message: "No image data" });
  }

  const imageData = req.body.image_data;
  let title = req.body.title;
  if (!title) {
    title = "untitled";
  }
  db.query(
    `INSERT INTO paintings(title,image_data,user_id) VALUES(?,?,?)`,
    [title, imageData, req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      const paintingId = result.insertId;
      return res.status(201).json({
        message: "Canvas Created Successfully",
        paintingId: paintingId,
      });
    },
  );
};

// PUT

const updatePainting = (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Please provide an ID" });
  }

  const { title, image_data } = req.body;

  if (!title && !image_data) {
    return res.status(400).json({ message: "Nothing to update" });
  }

  let query = "UPDATE paintings SET ";
  let values = [];

  if (title) {
    query += "title = ?, ";
    values.push(title);
  }

  if (image_data) {
    query += "image_data = ?, ";
    values.push(image_data);
  }

  // remove last comma
  query = query.slice(0, -2);

  query += " WHERE id = ? AND user_id = ?";
  values.push(id, req.user.id);

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Painting doesn't exist" });
    }

    return res.status(200).json({ message: "Painting updated successfully" });
  });
};

// DELETE

const deletePainting = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Please provide an ID" });
  }
  const id = req.params.id;

  db.query(
    `DELETE FROM paintings WHERE id = ? AND user_id = ?`,
    [id, req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Painting not found" });
      }
      return res.status(200).json({ message: "Painting deleted successfully" });
    },
  );
};

module.exports = {
  getPaintings,
  getPainting,
  createCanvas,
  updatePainting,
  deletePainting,
};
