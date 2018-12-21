import forEach from 'lodash/forEach';
import set from 'lodash/set';

import Config from './Config';
// import getConfigFromEnvJson from './Config/getConfigFromEnvJson';
console.log('LSK configManager');
export default {
  init(c) {
    console.log('LSK configManager Config.init', c);
    return new Config(c);
  },
  extend(c) {
    return new Config(c);
  },
  flatten2nested(flatten) {
    const config = {};
    forEach(flatten, (val, key) => {
      set(config, key, val);
    });
  },
  Config,
  // getConfigFromEnvJson,
  // getConfig,
  // serverWithEnv(...configs) {
  //   return this.server(...configs, '.env.json');
  // },
  // serverWithDotEnv(...configs) {
  //   if (typeof process !== 'undefined') {
  //     const env = require('./env').config({ silent: !__DEV__ });
  //     const envConfig = this.flatten2nested(env);
  //     configs.push(envConfig.lsk || {});
  //   }
  //   return this.serverConfig(configs);
  // },
  // server(...configs) {
  //   const _configs = configs.map((config) => {
  //     if (typeof config === 'string') {
  //       return this.getConfig(config);
  //     }
  //     return config;
  //   });
  //   return defaultsDeep({}, ...reverse(_configs));
  // },
  // // clientWithEnv(...configs) {
  // //   return this.client(...configs, '.env.json');
  // // },
  // client(...configs) {
  //   return defaultsDeep({}, ...reverse(configs));
  // },
};
