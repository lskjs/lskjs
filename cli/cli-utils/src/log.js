// const { Logger, getEnvConfig } = require('@lskjs/log');
const { omitNull } = require('@lskjs/algos');
const { Logger, getEnvConfig } = require('@lskjs/log');

const createLogger = (props = {}) => {
  const config = omitNull({
    ...getEnvConfig(),
    ns: 'cli',
    ...props,
  });
  // eslint-disable-next-line no-console
  if (process.env.DEBUG_DEBUG) console.log('[createLogger]', config);
  return new Logger(config);
};

const log = createLogger();

module.exports = { log, createLogger };
