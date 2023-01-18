// const { Logger, getEnvConfig } = require('@lskjs/log');
const { Logger, getEnvConfig } = require('@lskjs/log');

const createLogger = (props = {}) =>
  new Logger({
    ...getEnvConfig(),
    ns: 'cli',
    ...props,
  });

const log = createLogger();

module.exports = { log, createLogger };
