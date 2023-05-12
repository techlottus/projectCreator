const ApiError = require("./ApiError");

const apiErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(err);
  }

  if (err instanceof ApiError) {
    return res.status(err.code).json(err.message);
  }

  return res.status(500).json("Internal server error");
};

module.exports = apiErrorHandler;