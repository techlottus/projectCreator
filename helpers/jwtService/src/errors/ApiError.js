class ApiError {
    constructor(code, message) {
      this.message = message;
      this.code = code;
    }
  
    static badRequest(msg) {
      return new ApiError(400, msg);
    }
  
    static notFound(msg) {
      return new ApiError(404, msg);
    }
    static unauthorized() {
      return new ApiError(401, { message: "User not authorized" });
    }
  }
  
  module.exports = ApiError;