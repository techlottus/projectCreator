const express = require("express");

const { apiErrorHandler } = require("src/errors");
const router = require("src/routes");

const app = express();

app.use(express.json());
app.use("/api", router);
app.use(apiErrorHandler);

module.exports = app;