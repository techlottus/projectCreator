const grpc = require("@grpc/grpc-js");

class ErrorHandler {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static internal(err) {
    console.log(err);
    return new ErrorHandler(grpc.status.INTERNAL, "Something go wrong...");
  }
}

module.exports = ErrorHandler;
