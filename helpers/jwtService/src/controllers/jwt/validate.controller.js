const JwtHelper = require("src/utils/jwt");
const { ApiError } = require("src/errors");

const validate = async (req, res, next) => {
  try {
    const { token } = req.body;
    const jwtUtils = new JwtHelper();
    const parseToken = token.split(" ").pop();
    const decoded = await jwtUtils.verify(parseToken);
    if (decoded === "error") {
      next(ApiError.unauthorized());
      return;
    }
    res.status(200).json(decoded);
  } catch (error) {
    next(error);
  }
};
module.exports = validate;