export default (ctx) => {
  return function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.headers['x-access-token']) {
      return req.headers['x-access-token'];
    } else if (req.query && req.query.token) {
      return req.query.token;
    } else if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }
    if (__DEV__ && ctx.config.jwt && ctx.config.jwt.devToken) return ctx.config.jwt.devToken;
    return null;
  };
};
