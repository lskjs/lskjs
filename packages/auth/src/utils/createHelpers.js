// import Api from './BaseApi';
import bcrypt from 'bcryptjs';
import Promise from 'bluebird';
import pick from 'lodash/pick';
import get from 'lodash/get';
import map from 'lodash/map';
import jwt from 'jsonwebtoken';
import canonizeParams from '@lskjs/utils/canonizeParams';

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
    getUserCriteria(rawParams, { loginCreds = [] } = {}) {
      const params = canonizeParams(rawParams);
      // eslint-disable-next-line no-restricted-syntax
      for (const cred of loginCreds) {
        if (cred === 'login' && params[cred]) {
          return { $or: map(params, (value, key) => ({ [key]: value })) };
        }
        if (loginCreds.includes(cred) && params[cred]) {
          return { [cred]: params[cred] };
        }
      }
      throw { code: 'auth.loginEmpty', status: 400 };
    },

    async setPassword(user, password) {
      user.password = await hashPassword(password); // eslint-disable-line no-param-reassign
    },
    verifyPassword(password1, password2) {
      // console.log('verifyPassword', password1, password2);
      if (!password1 || !password2) return false;
      return bcryptCompare(password1, password2);
    },
    getIdentity(user, params = {}) {
      const userParams = user.toObject ? user.toObject() : user;
      return {
        ...pick(userParams, ['_id', 'username', 'name', 'avatar', 'role']),
        ...params,
      };
    },
    generateAuthToken(...params) {
      // TODO переместить в modules.auth
      return jwt.sign(helpers.getIdentity(...params), configJwt.secret);
    },
    async genereateEmailApprovedLink(user) {
      const token = jwt.sign(
        {
          userId: String(user._id),
          email: user.email,
        },
        configJwt.secret,
      );
      if (!user.private) user.private = {}; // eslint-disable-line no-param-reassign
      user.private.approvedEmailToken = token; // eslint-disable-line no-param-reassign
      if (user.markModified) user.markModified('private');

      return user.app.url(`/api/auth/email/approve?t=${token}`);
    },
  };
  return helpers;
}
