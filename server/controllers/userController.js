const bcrypt = require("bcrypt");
const db = require("../config/db"); //import database
const jwt = require("jsonwebtoken");

const getUsers = (req, res, next) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(200).json({ data: result });
  });
};

const getUser = (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE id = $1`,
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result.length === 0)
        return res.status(404).json({ message: "User not found" });
      return res.status(200).json({ data: result[0] });
    },
  );
};

const registerUser = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      `INSERT INTO users(username, email, password_hash) 
    VALUES($1,$2,$3)`,
      [username, email, hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === `ER_DUP_ENTRY`) {
            return res.status(409).json({ error: "User already exists" });
          }
          return res.status(500).json({ message: "Internal server error" });
        }
        const userId = result.insertId;
        return res
          .status(201)
          .json({ message: "User created successfully", userId: userId });
      },
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const handleLogin = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const { email, password } = req.body;
    const result = await db.query(
      "SELECT id, username, email, password_hash FROM users WHERE email = $1",
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = (req, res, next) => {
  db.query(
    `DELETE FROM users WHERE id = $1`,
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "User deleted successfully" });
    },
  );
};

module.exports = { getUsers, getUser, registerUser, deleteUser, handleLogin };
