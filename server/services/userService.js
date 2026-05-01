const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async () => {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
};

const getUserById = async (id) => {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await db.query(
      `INSERT INTO users(username, email, password_hash)
        VALUES($1, $2, $3)
        RETURNING id`,
      [username, email, hashedPassword],
    );
    return result.rows[0];
  } catch (err) {
    if (err.code === "23505") {
      throw new Error("USER_ALREADY_EXISTS");
    }

    throw err;
  }
};

const removeUser = async (id) => {
  const result = await db.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [
    id,
  ]);
  return result.rowCount;
};

const loginUser = async (email, password) => {
  const result = await db.query(
    `SELECT id , username, email, password_hash FROM users WHERE email = $1`,
    [email],
  );

  if (result.rows.length === 0) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  };
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  loginUser,
};
