const db = require("../config/db");

// GET ALL PAINTINGS (for a user)
const getUserPaintings = async (userId) => {
  const result = await db.query("SELECT * FROM paintings WHERE user_id = $1", [
    userId,
  ]);

  return result.rows;
};

// GET ONE PAINTING
const getPaintingById = async (id, userId) => {
  const result = await db.query(
    "SELECT * FROM paintings WHERE id = $1 AND user_id = $2",
    [id, userId],
  );

  return result.rows[0];
};

// CREATE PAINTING
const createPainting = async (title, image_data, userId) => {
  const result = await db.query(
    `INSERT INTO paintings(title, image_data, user_id)
     VALUES($1, $2, $3)
     RETURNING id`,
    [title, image_data, userId],
  );

  return result.rows[0];
};

// UPDATE PAINTING
const updatePaintingById = async (id, title, image_data, userId) => {
  const result = await db.query(
    `UPDATE paintings
     SET title = COALESCE($1, title),
         image_data = COALESCE($2, image_data)
     WHERE id = $3 AND user_id = $4`,
    [title, image_data, id, userId],
  );

  return result.rowCount;
};

// DELETE PAINTING
const deletePaintingById = async (id, userId) => {
  const result = await db.query(
    "DELETE FROM paintings WHERE id = $1 AND user_id = $2",
    [id, userId],
  );

  return result.rowCount;
};

module.exports = {
  getUserPaintings,
  getPaintingById,
  createPainting,
  updatePaintingById,
  deletePaintingById,
};
