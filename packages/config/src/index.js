/* eslint-disable global-require */
/* eslint-disable no-console */
import tryJSONparse from '@lskjs/utils/tryJSONparse';
import fs from 'fs';
import isFunction from 'lodash/isFunction';
import merge from 'lodash/merge';
import set from 'lodash/set';

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
    try {
      if (type === 'js') {
        const fnOrJson = require(configPath); // eslint-disable-line import/no-dynamic-require
        if (isFunction(fnOrJson)) {
          config = fnOrJson(config);
        } else {
          config = merge(config, fnOrJson);
        }
      } else if (type === 'jsson') {
        const json = JSON.parse(fs.readFileSync(configPath).toString());
        config = merge(config, json);
      } else {
        return;
      }
    } catch (err) {
      console.error('[ERROR] [ERROR] [ERROR] [ERROR] [ERROR] [ERROR] [ERROR] [ERROR]');
      console.error(``);
      console.error(`cannot load config: ${configPath}`);
      console.error(``);
      console.error(err);
      console.error(``);
      console.error('[ERROR] [ERROR] [ERROR] [ERROR] [ERROR] [ERROR] [ERROR] [ERROR]');
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
