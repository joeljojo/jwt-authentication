const CustomError = require("./customError");

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message, 401);
  }
}
module.exports = UnauthorizedError;
