/* eslint-disable no-console */
import fs from 'fs';
import isFunction from 'lodash/isFunction';
import merge from 'lodash/merge';

import { getEnvPaths } from './getEnvPaths';

export function mergeEnvs(...configs) {
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
      } else if (type === 'json') {
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

  return config;
}

export default mergeEnvs;
