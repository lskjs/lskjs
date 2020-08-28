import get from 'lodash/get';

const DEBUG = false;

export default (ctx) => {
  return function getToken(req) {
    const { name: cookieName = 'token' } = get(ctx.config, 'client.jwt.cookie', {});
    // eslint-disable-next-line no-console
    if (DEBUG) console.log('getToken cookie', cookieName);
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    if (req.headers['x-access-token']) {
      return req.headers['x-access-token'];
    }
    if (req.query && req.query.token) {
      return req.query.token;
    }
    if (req.cookies && req.cookies[cookieName]) {
      return req.cookies[cookieName];
    }
    if (__DEV__ && ctx.config.jwt && ctx.config.jwt.devToken) return ctx.config.jwt.devToken;
    return null;
  };
};
