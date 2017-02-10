import AppError from './AppError';

export default (ctx) => {
  return {
    e: (code, message, status) => (new AppError(code, message, status)),
    e500: message => (new AppError(500, message, 500)),
    e404: message => (new AppError(404, message, 404)),
    e403: message => (new AppError(403, message, 403)),
    e401: message => (new AppError(401, message, 401)), // unauth
    e400: message => (new AppError(400, message, 400)),
  };
};
