import tryJSONparse from '@lskjs/utils/tryJSONparse';
import set from 'lodash/set';

export const getConfigKey = (key) =>
  ['.', '__']
    .map((delemiter) => {
      const [mainKey, ...otherKeys] = key.split(delemiter);
      if (mainKey === 'config' && otherKeys.length) {
        return otherKeys.join('.');
      }
      return null;
    })
    .filter(Boolean)[0];

export const getProcessEnv = () => {
  const env = {};

  if (process.env.DEBUG) {
    const debug = process.env.DEBUG;
    const modules = debug.split(',');
    let logLevel = process.env.LOG_LEVEL || 'trace';
    // eslint-disable-next-line no-console
    console.log(`[LOG_LEVEL=${logLevel} DEBUG=${debug}`);
    if (debug.startsWith('lsk') || debug.startsWith('app') || debug === '1' || debug === '*') {
      logLevel = 'trace';
      env.debug = 1;
      set(env, 'log.level', logLevel);
    }
    const debugVal = 1;
    modules.forEach((m) => {
      set(env, [m, 'debug'].join('.'), debugVal);
      set(env, [m, 'log.level'].join('.'), logLevel);
    });
    // console.log(`env`, env);
  }

  Object.keys(process.env).forEach((key) => {
    const configKey = getConfigKey(key);
    if (!configKey) return;
    set(env, configKey, tryJSONparse(process.env[key]));
  });

  return env;
};

export default getProcessEnv;
