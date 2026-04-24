const express = require("express"); //import express
const cors = require("cors"); // import cors for allowing cross origin requests
require("dotenv").config(); // import .env
const router = require("./routes/users.js"); //import routes from users.js

const db = require("./config/db"); //import database

const app = express(); //create server

app.use(cors()); //use cors middleware
app.use(express.json()); //use json parser so backend can communicate with frontend
app.use(router);

//simple get request to test server is running
app.get("/", (req, res) => {
  res.send("API is running");
});

// get request to test db
app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(result);
  });
});
//set port from .env if that doesn't work then use 3000
const PORT = process.env.PORT || 3000;

// listen on port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
