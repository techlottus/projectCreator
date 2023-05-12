const { DataTypes } = require("sequelize");

const { conn } = require("src/adapters");

const Book = conn.define(
  "Book",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "books",
  }
);

module.exports = Book;