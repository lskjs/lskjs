/* eslint-disable global-require */
import Err from '@lskjs/err';

export default (config = {}) => {
  const { provider } = config;
  let Class;
  if (provider === 'plivo') Class = require('./transports/plivo').default;
  if (provider === 'telesign') Class = require('./transports/telesign').default;
  if (provider === 'bytehand') Class = require('./transports/bytehand').default;
  if (provider === 'nexmo') Class = require('./transports/nexmo').default;
  if (!Class) throw new Err('!sms.provider');
  return new Class(config);
};
