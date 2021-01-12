import jwt from 'express-jwt';
import get from 'lodash/get';

export default (webserver) =>
  function reqUser(req, res, next) {
    if (!get(webserver, 'config.middlewares.reqUser')) return next();
    if (!webserver.helpers.getReqToken) throw next('!helpers.getReqToken');
    const jwtConfig = get(webserver, 'config.jwt', {});
    const { secret, algorithms = ['HS256'] } = jwtConfig;
    const options = {
      secret,
      algorithms,
      getToken: webserver.helpers.getReqToken,
    };
    return jwt(options)(req, res, (err) => {
      if (err) req.__errJwt = err;
      next();
    });
  };
