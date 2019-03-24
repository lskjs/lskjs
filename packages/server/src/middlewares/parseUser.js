import jwt from 'express-jwt';

export default ctx => (
  function parseUser(req, res, next) {
    if (!ctx.config.jwt) {
      // req.user = {}
      return next();
    }
    const options = {
      secret: ctx.config.jwt.secret,
      getToken: req => req.token,
    };
    jwt(options)(req, res, (err) => {
      if (err) req._errJwt = err;
      next();
    });
  }
);
