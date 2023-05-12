// TODO: Fix import
const ErrorHandler = require("src/utils/errors/ErrorHandler");
const SequelizeErrorHandler = require("src/utils/errors/SequelizeErrorHandler");
const { Book } = require("src/models");

const getBook = async (call, callback) => {
  try {
    const book = await Book.findByPk(call.request.id, {
      include: ["Category"],
    }).catch((err) => {
      callback(SequelizeErrorHandler.error(err));
    });
    if (!book)
      return callback(
        SequelizeErrorHandler.notFound(`Book ${call.request.id} not found`)
      );
    const response = {
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      category: book?.Category?.name,
    };
    callback(null, response);
  } catch (err) {
    return callback(ErrorHandler.internal(err));
  }
};

module.exports = getBook;