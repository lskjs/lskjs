/* eslint-disable global-require */
import merge from 'lodash/merge';
import isFunction from 'lodash/isFunction';
import set from 'lodash/set';
import fs from 'fs';
import tryJSONparse from '@lskjs/utils/tryJSONparse';
import getEnvPaths from './getEnvPaths';

export default function mergeEnvs(...configs) {
  // const init = () =>
  let config = {};
  configs.forEach((conf) => {
    merge(config, conf);
  });
  const configPaths = getEnvPaths();
  configPaths.forEach((configPath) => {
    const type = configPath.split('.').reverse()[0];
    switch (type) {
      default:
        break;
      case 'js':
        try {
          const fnOrJson = require(configPath); // eslint-disable-line import/no-dynamic-require
          if (isFunction(fnOrJson)) {
            config = fnOrJson(config);
          } else {
            config = merge(config, fnOrJson);
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(`[ERROR] cannot load config ${configPath}`, err);
        }
        break;
      case 'json':
        try {
          const json = JSON.parse(fs.readFileSync(configPath).toString());
          config = merge(config, json);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(`[ERROR] cannot load config ${configPath}`, err);
        }
        break;
    }
    // fs.watchFile('message.text', (curr, prev) => {
    //   console.log(`the current mtime is: ${curr.mtime}`);
    //   console.log(`the previous mtime was: ${prev.mtime}`);
    // });
  });

  const getConfigKey = (key) =>
    ['.', '__']
      .map((delemiter) => {
        const [mainKey, ...otherKeys] = key.split(delemiter);
        if (mainKey === 'config' && otherKeys.length) {
          return otherKeys.join('.');
        }
        return null;
      })
      .filter(Boolean)[0];

  Object.keys(process.env).forEach((key) => {
    const configKey = getConfigKey(key);
    if (!configKey) return;
    set(config, configKey, tryJSONparse(process.env[key]));
  });

  return config;
}
