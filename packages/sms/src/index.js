/* eslint-disable global-require */

export default (config = {}) => {
  const { provider } = config;
  if (!provider) throw '!provider';
  if (provider === 'plivo') return require('./transports/plivo').default(config);
  if (provider === 'telesign') return require('./transports/telesign').default(config);
  if (provider === 'bytehand') return require('./transports/bytehand').default(config);
  if (provider === 'nexmo') return require('./transports/nexmo').default(config);
  throw '!provider';
};
