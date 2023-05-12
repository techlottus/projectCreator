"use strict";

const table = {
  tableName: "books",
  schema: process.env.DB_SCHEMA,
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
      },
      isbn: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      categoryId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "categories",
            schema: process.env.DB_SCHEMA,
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(table);
  },
};