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
  }
  
  module.exports = ApiError;