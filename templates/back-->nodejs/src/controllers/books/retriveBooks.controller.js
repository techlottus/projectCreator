const { Book } = require("src/models");

const retriveBooks = async (req, res, next) => {
  try {
    // Obtencion de libros filtrando segun parametro
    // localhost:3000/books?custom_query=custom_value&custom_query2=custom_value2
    if (req.query.custom_query) {
      return res.send(
        `Obtener lista de libros con parametro custom_query: ${req.query.custom_query}`
      );
    }

    const books = await Book.findAll();

    // Obtencion de libros
    return res.status(200).send(books);
  } catch (err) {
    next(err);
  }
};

module.exports = retriveBooks;