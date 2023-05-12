const jwt = require("jsonwebtoken");
const jwtConfig = require("config/jwtConfig.js");

class JwtHelper {
  constructor() {
    const { jwt_secret, jwt_algorithm, jwt_expires_in } = jwtConfig();
    this.secret = jwt_secret;
    this.algorithm = jwt_algorithm;
    this.options = {
      algorithm: this.algorithm,
    };
    this.expiresIn = jwt_expires_in;
  }

  sign(payload, expires, expiresIn) {
    this.expiresIn = expiresIn || this.expiresIn;
    if (expires !== undefined) {
      this.options.expiresIn = this.expiresIn;
    }

    return jwt.sign(payload, this.secret, this.options, this.expiresIn);
  }

  verify(token) {
    if (token !== undefined) {
      return jwt.verify(
        token,
        this.secret,
        this.options,
        function (err, decoded) {
          if (err) {
            return {
              isExpired: true,
            };
          }
          return decoded;
        }
      );
    }
    return null;
  }
}
module.exports = JwtHelper;