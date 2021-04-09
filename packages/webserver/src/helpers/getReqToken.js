import get from 'lodash/get';

// const DEBUG = false;

export function getReqToken(req) {
  const jwtConfig = get(this.config, 'jwt', {});
  // get(this.config, 'jwt.cookie', {});
  const { name: cookieName = 'token' } = jwtConfig.cookie || {};
  // eslint-disable-next-line no-console
  if (this.debug) console.log('getReqToken cookie', cookieName);
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
  if (__DEV__ && jwtConfig && jwtConfig.devToken) return jwtConfig.devToken;
  return null;
}

export default getReqToken;
