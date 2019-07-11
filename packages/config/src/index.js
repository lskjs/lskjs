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
          //
        }
        break;
      case 'json':
        try {
          const json = JSON.parse(fs.readFileSync(configPath).toString());
          config = merge(config, json);
        } catch (err) {
          //
        }
        break;
    }
    // fs.watchFile('message.text', (curr, prev) => {
    //   console.log(`the current mtime is: ${curr.mtime}`);
    //   console.log(`the previous mtime was: ${prev.mtime}`);
    // });
  });

  Object.keys(process.env, (key) => {
    const [mainKey, ...otherKeys] = key.split('.');
    if (mainKey === 'config') {
      set(config, otherKeys.join('.'), tryJSONparse(process.env[key]));
    }
  });

  return config;
}
