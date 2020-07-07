import jwt from 'express-jwt';

export default (ctx) => (req, res, next) => {
  if (!ctx.config.jwt) {
    return next();
  }
  const { secret, algorithms = ['HS256'] } = ctx.config.jwt || {};
  const options = {
    secret,
    algorithms,
    getToken: (req2) => req2.token,
  };
  return jwt(options)(req, res, (err) => {
    if (err) req._errJwt = err;
    next();
  });
};
