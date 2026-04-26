const express = require("express"); //import express
const cors = require("cors"); // import cors for allowing cross origin requests
require("dotenv").config(); // import .env
const userRoutes = require("./routes/users.js"); //import routes from users.js
const paintingRoutes = require("./routes/paintings.js");

const db = require("./config/db"); //import database

const app = express(); //create server

app.use(cors()); //use cors middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(userRoutes);
app.use(paintingRoutes);

//simple get request to test server is running
app.get("/", (req, res) => {
  res.send("API is running");
});

// get request to test db
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
//set port from .env if that doesn't work then use 3000
const PORT = process.env.PORT || 3000;

// listen on port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
