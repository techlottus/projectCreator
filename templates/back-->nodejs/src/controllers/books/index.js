const retriveBooks = require("src/controllers/books/retriveBooks.controller");
const retriveBook = require("src/controllers/books/retriveBook.controller");
const createBook = require("src/controllers/books/createBook.controller");
const updateBook = require("src/controllers/books/updateBook.controller");
const deleteBook = require("src/controllers/books/deleteBook.controller");

module.exports = {
  retriveBooks,
  retriveBook,
  createBook,
  updateBook,
  deleteBook,
};