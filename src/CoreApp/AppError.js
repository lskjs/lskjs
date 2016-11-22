export default class AppError extends Error {
  constructor(code = 0, message, status = 500) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.status = status;
    this.message = message;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}
