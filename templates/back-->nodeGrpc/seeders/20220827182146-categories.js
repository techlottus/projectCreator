"use strict";

const table = {
  tableName: "categories",
  schema: process.env.DB_SCHEMA,
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      table,
      [
        {
          name: "Horror",
        },
        {
          name: "Drama",
        },
        {
          name: "Sci-Fi",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(table, null, {});
  },
};