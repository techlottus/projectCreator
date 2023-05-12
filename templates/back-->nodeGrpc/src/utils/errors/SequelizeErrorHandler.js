const grpc = require("@grpc/grpc-js");

const findError = (err) => {
  const nameError = err?.name;

  switch (nameError) {
    case "SequelizeUniqueConstraintError":
      return {
        code: grpc.status.ALREADY_EXISTS,
        message: err.parent,
      };
    case "SequelizeForeignKeyConstraintError":
      return {
        code: grpc.status.INVALID_ARGUMENT,
        message: err.parent,
      };
    default:
      return {
        code: grpc.status.INTERNAL,
        message: "Something go wrong...",
      };
  }
};

class SequelizeErrorHandler {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static error(err) {
    console.log(err);
    const { code, message } = findError(err);
    return new SequelizeErrorHandler(code, message);
  }

  static notFound(message) {
    return new SequelizeErrorHandler(grpc.status.NOT_FOUND, message);
  }
}

module.exports = SequelizeErrorHandler;