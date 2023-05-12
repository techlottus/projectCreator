// TODO: Fix import
const ErrorHandler = require("src/utils/errors/ErrorHandler");
const SequelizeErrorHandler = require("src/utils/errors/SequelizeErrorHandler");
const { Book } = require("src/models");

const createBook = async (call, callback) => {
  try {
    const bookCreated = await Book.create(call.request).catch((err) => {
      callback(SequelizeErrorHandler.error(err));
    });
    const response = {
      id: bookCreated.id,
      title: bookCreated.title,
      isbn: bookCreated.isbn,
      categoryId: bookCreated.categoryId,
    };
    callback(null, response);
  } catch (err) {
    return callback(ErrorHandler.internal(err));
  }
};

module.exports = createBook;