const express = require("express");
const router = express.Router();

const { validateSchema } = require("src/middlewares");
const { createBookSchema } = require("src/schemas");

const { ApiError } = require("src/errors");

const {
  retriveBooks,
  retriveBook,
  createBook,
  updateBook,
  deleteBook,
} = require("src/controllers/books");

router.get("", retriveBooks);
router.get("/:id", retriveBook);
router.post("", validateSchema(createBookSchema), createBook);
router.put("/:id", validateSchema(createBookSchema), updateBook);
router.delete("/:id", deleteBook);

module.exports = router;