const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { getAllUsers, getUserById, createUser, removeUser } = require("../services/userService");

// GET ALL USERS
const getUsers = async (req, res) => {
  try{
    const users = await getAllUsers();
    return res.status(200).json({data: users});
  }catch{
    return res.status(500).json({message: "Internal server error"});
  }
};

// GET USER BY ID
const getUser = async (req, res) => {
   try{
    const user = await getUserById(req.params.id);

    if(!user)
      return res.status(404).json({message:"User not found"});

    return res.status(200).json({data: user});
   }catch{
    return res.status(500).json({message: "Internal server error"});
   }
};

// CREATE USER (POST)
const registerUser = async (req, res) => {
  const {username, email, password} = req.body;

  if(!username || !email || !password){
    return res.status(400).json({error: "All fields are required"});
  }

  try{
    const user = await createUser(username, email, password);

    return res.status(201).json({
      message: "User created successfully",
      userId: user.id,
    });
  }catch (error){
    return res.status(500).json({error: error.message});
  }
};

// DELETE USER BY ID
const deleteUser = (req, res) => {
  try{
    const deleted = await removeUser(req.params.id);

    if(deleted === 0)
      return res.status(404).json({message: "User not found"});

    return res.status(200).json({message: "User deleted successfully"});
  }catch{
    return res.status(500).json({message: "Internal server error"});
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



module.exports = { getUsers, getUser, registerUser, deleteUser, handleLogin };
