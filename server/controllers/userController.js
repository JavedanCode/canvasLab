const bcrypt = require("bcrypt");
const db = require("../config/db"); //import database
const jwt = require("jsonwebtoken");

const getUsers = (req, res, next) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    return res.status(200).json({ data: result });
  });
};

const getUser = (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      if (result.length === 0)
        return res.status(404).json({ message: "User Not Found" });
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
    VALUES(?,?,?)`,
      [username, email, hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === `ER_DUP_ENTRY`) {
            return res.status(409).json({ error: "User Already Exists" });
          }
          return res.status(500).json({ error: err });
        }
        const userId = result.insertId;
        return res
          .status(201)
          .json({ message: "User Created Successfully", userId: userId });
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
    db.query(
      `SELECT email, password_hash FROM users where email = ?`,
      [email],
      async (err, result) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        if (result.length === 0) {
          return res.status(404).json({ message: "Invalid Credentials" });
        }
        if (await bcrypt.compare(password, result[0].password_hash)) {
          const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          return res.status(200).json({
            message: "Login Successful",
            token: token,
            user: {
              id: result[0].id,
              email: result[0].email,
            },
          });
        } else {
          return res.status(401).json({ message: "Invalid Credentials" });
        }
      },
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = (req, res, next) => {
  db.query(`DELETE FROM users WHERE id = ?`, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({ message: "User Deleted Successfully" });
  });
};

module.exports = { getUsers, getUser, registerUser, deleteUser, handleLogin };
