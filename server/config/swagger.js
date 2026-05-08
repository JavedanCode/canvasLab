const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CanvasLab API",
      version: "1.0.0",
      description: "API documentation for CanvasLab project",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "https://canvaslab.onrender.com",
      },
    ],
  },
  apis: [__dirname + "/../routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
