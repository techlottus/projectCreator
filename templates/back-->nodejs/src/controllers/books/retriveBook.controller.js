const { ApiError } = require("src/errors");
const { Book } = require("src/models");

const retriveBook = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      next(ApiError.badRequest("id debe ser numerico"));
      return;
    }

    const book = await Book.findByPk(id);

    if (!book) {
      next(ApiError.notFound(`No se encontro el libro con el id: ${id}`));
      return;
    }

    res.status(200).send(book);
  } catch (err) {
    next(err);
  }
};

module.exports = retriveBook;