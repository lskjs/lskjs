import jwt from 'express-jwt';
import get from 'lodash/get';

import { getReqToken } from '../utils/getReqToken';

export default (webserver) =>
  function reqUser(req, res, next) {
    if (!get(webserver, 'config.middlewares.reqUser')) return next();
    // if (!webserver.helpers.getReqToken) throw next('!helpers.getReqToken');
    const jwtConfig = get(webserver, 'config.jwt', {});
    // console.log({ jwtConfig });
    const { secret, algorithms = ['HS256'] } = jwtConfig;
    if (!secret) {
      webserver.log.warn('!jwt.secret');
      return next();
    }
    const options = {
      secret,
      algorithms,
      getToken: webserver.helpers.getReqToken || getReqToken,
    };
    return jwt(options)(req, res, (err) => {
      if (!err) return next();
      req.__errJwt = err;
      if (err.code === 'credentials_required') {
        return next();
      }
      return next(err);
    });
  };
