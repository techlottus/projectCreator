const { Book } = require("src/models");

const createBook = async (req, res, next) => {
  try {
    const { title } = req.body;
    const bookCreated = await Book.create({ title });
    res.status(201).send(bookCreated);
  } catch (err) {
    next(err);
  }
};

module.exports = createBook;