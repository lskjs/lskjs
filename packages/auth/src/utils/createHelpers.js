// import Api from './BaseApi';
import bcrypt from 'bcryptjs';
import Promise from 'bluebird';
import get from 'lodash/get';
import jwt from 'jsonwebtoken';

const bcryptGenSalt = Promise.promisify(bcrypt.genSalt);
const bcryptHash = Promise.promisify(bcrypt.hash);
const bcryptCompare = Promise.promisify(bcrypt.compare);

const SALT_WORK_FACTOR = 10;
async function hashPassword(password) {
  const salt = await bcryptGenSalt(SALT_WORK_FACTOR);
  return bcryptHash(password, salt);
}

export default function createHelpers({ app } = {}) {
  if (!app) throw '!app';
  const configJwt = get(app, 'config.jwt', {});
  if (!configJwt.secret) app.log.error('app.config.jwt.secret IS EMPTY'); // eslint-disable-line no-console
  const helpers = {
    hashPassword,
    async setPassword(user, password) {
      user.password = await hashPassword(password); // eslint-disable-line no-param-reassign
    },
    verifyPassword(password1, password2) {
      // console.log('verifyPassword', password1, password2);
      if (!password1 || !password2) return false;
      return bcryptCompare(password1, password2);
    },
    generateAuthToken({ _id, role }, params = {}) {
      const { secret = 'REPLACE_THIS_JS_SECRET_PLEASE', ...options } = configJwt;
      // TODO переместить в modules.auth
      return jwt.sign(
        {
          _id,
          role,
          ...params,
        },
        secret,
        options || {},
      );
    },
  };
  return helpers;
}
