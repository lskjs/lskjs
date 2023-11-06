// const { Logger, getEnvConfig } = require('@lskjs/log');
const { omitNull } = require('@lskjs/algos');
const { Logger, getEnvConfig } = require('@lskjs/log');

const createLogger = (props = {}) => {
  // console.log('@@@', require('@lskjs/log'));
  const config = omitNull({
    ...getEnvConfig(),
    ns: 'cli',
    ...props,
  });
  const isSilent =
    typeof process && (!!+process.env.LSK_SILENT || process.argv?.includes('--silent'));
  if (isSilent) {
    config.level = 'error';
  }
  // eslint-disable-next-line no-console
  if (process.env.DEBUG_DEBUG) console.log('[createLogger]', config);
  return new Logger(config);
};

const log = createLogger();

module.exports = { log, createLogger };
