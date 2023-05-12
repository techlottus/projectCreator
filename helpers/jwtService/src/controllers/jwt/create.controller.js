const JwtHelper = require("src/utils/jwt");
const { ApiError} = require("src/errors");
const jwtConfig = require("config/jwtConfig.js");

const create = async (req, res, next) => {
  try {
    let { payload, expires, expiresIn } = req.body;
    const { jwt_expires_in } = jwtConfig();
    if (expiresIn <= 0 || expires === false) {
      expiresIn = jwt_expires_in;
    }

    if (!payload) {
      throw new ApiError("Payload is required");
    }

    if (typeof expiresIn === "number") {
      expiresIn = `${expiresIn}m`;
    }

    const jwtUtils = new JwtHelper();
    const token = jwtUtils.sign(payload, expires, expiresIn);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = create;