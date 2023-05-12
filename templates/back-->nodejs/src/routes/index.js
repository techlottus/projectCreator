const express = require("express");
const router = express.Router();

const booksRouter = require("src/routes/books.routes");

router.use("/books", booksRouter);

module.exports = router;