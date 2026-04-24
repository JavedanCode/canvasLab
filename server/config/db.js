const mysql = require("mysql2"); //import mysql12 to handle communication with database server
require("dotenv").config(); //import .env

//create connection to database server
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//connect to the server
db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

module.exports = db;
