// TODO: Fix import
const ErrorHandler = require("src/utils/errors/ErrorHandler");
const SequelizeErrorHandler = require("src/utils/errors/SequelizeErrorHandler");
const { Book } = require("src/models");

const getBooks = async (call, callback) => {
  try {
    const books = await Book.findAll({
      include: ["Category"],
    }).catch((err) => {
      callback(SequelizeErrorHandler.error(err));
    });
    const response = {
      books: books.map((book) => {
        return {
          id: book.id,
          title: book.title,
          isbn: book.isbn,
          category: book?.Category?.name,
        };
      }),
    };
    callback(null, response);
  } catch (err) {
    return callback(ErrorHandler.internal(err));
  }
};

module.exports = getBooks;