const { DataTypes } = require("sequelize");

// TODO: Fix import
const conn = require("src/adapters/orm");

const Category = conn.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);

module.exports = Category;