const { ApiError } = require("src/errors");
const { Book } = require("src/models");

const deleteBook = async (req, res, next) => {
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

    await book.destroy();

    res.status(200).send(`Libro con id ${id} fue eliminado`);
  } catch (err) {
    next(err);
  }
};

module.exports = deleteBook;