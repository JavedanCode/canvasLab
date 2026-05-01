const {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  loginUser,
} = require("../services/userService");

// GET ALL USERS
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({ data: users });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET USER BY ID
const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ data: user });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// CREATE USER (POST)
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await createUser(username, email, password);

    return res.status(201).json({
      message: "User created successfully",
      userId: user.id,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETE USER BY ID
const deleteUser = async (req, res) => {
  const userIdFromToken = req.user.id;
  const userIdFromParams = parseInt(req.params.id);

  if (userIdFromToken !== userIdFromParams) {
    return res.status(403).json({
      message: "You are not allowed to delete this user",
    });
  }

  try {
    const deleted = await removeUser(userIdFromParams);

    if (deleted === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// HANDLE LOGIN (POST)
const handleLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await loginUser(email, password);

    return res.status(200).json({
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers, getUser, registerUser, deleteUser, handleLogin };
