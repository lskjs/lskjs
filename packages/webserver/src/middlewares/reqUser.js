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
    let getToken = (webserver.helpers && webserver.helpers.getReqToken) || getReqToken;
    if (!getToken) {
      webserver.log.warn('reqUser !getToken');
      return next();
    }
    getToken = getToken.bind(webserver);
    const token = getToken(req);

    const options = {
      secret,
      algorithms,
      getToken,
    };
    // console.log('getToken', getToken(req));
    // console.log('secret', secret);
    return jwt(options)(req, res, (err) => {
      if (!err) return next();
      req.__errJwt = err;
      // console.log('JWT', { err }, token, err.code);
      // console.log('123123', !token, typeof token, token, err.code === 'credentials_required');
      const isNotFatal = !token || err.code === 'credentials_required' || err.code === 'invalid_token';
      if (isNotFatal) return next();
      return next(err);
    });
  };
