const { DataTypes } = require("sequelize");

// TODO: Fix import
const conn = require("src/adapters/orm");
const Category = require("src/models/Category");

const Book = conn.define(
  "Book",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      unique: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Category",
        key: "id",
      },
    },
  },
  {
    tableName: "books",
  }
);

Book.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = Book;