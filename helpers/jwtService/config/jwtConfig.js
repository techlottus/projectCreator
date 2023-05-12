require("dotenv").config();

const jwtConfig = () => {
  return {
    jwt_secret: process.env.JWT_SECRET,
    jwt_algorithm: process.env.JWT_ALGORITHM,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
  };
};

module.exports = jwtConfig;