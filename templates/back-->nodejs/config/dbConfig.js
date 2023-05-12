require("dotenv").config();

const dbConfig = () => {
  if (process.env.NODE_ENV === "test") {
    return {
      dialect: "sqlite",
      store: ":memory:", // Tambien puede ser en memoria con el valor ":memory:"
    };
  }

  return {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    schema: process.env.DB_SCHEMA
  };
};

module.exports = dbConfig();