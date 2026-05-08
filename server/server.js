const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/users.js");
const paintingRoutes = require("./routes/paintings.js");

//IMPORT COOKIE PARSER
const cookieParser = require("cookie-parser");

//SWAGGER UI IMPORT
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

//IMPORT DATABASE
const db = require("./config/db");

//CREATE SERVER
const app = express();

// MIDDLEWARE
app.use(
  cors({
    origin: "https://javedancode.github.io/canvasLab/",
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
  }),
);

app.use(cookieParser());

// ROUTES
app.use(userRoutes);
app.use(paintingRoutes);

// SWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
