// import _ from 'lodash';
//
// export default {
//   flatten2nested(flatten) {
//     const config = {};
//     _.forEach(flatten, (val, key) => {
//       _.set(config, key, val);
//     });
//   },
//   serverWithEnv(...configs) {
//     if (__SERVER__) {
//       const env = require('./env').config({ silent: __PROD__ });
//       const envConfig = this.flatten2nested(env)
//       configs.push(envConfig.lsk || {});
//     }
//     return this.serverConfig(configs);
//   },
//   server(...configs) {
//     return _.defaultsDeep({}, ..._.reverse(configs));
//   },
//   client(...configs) {
//     return _.defaultsDeep({}, ..._.reverse(configs));
//   },
// };
import _ from 'lodash';

export default {
  flatten2nested(flatten) {
    const config = {};
    _.forEach(flatten, (val, key) => {
      _.set(config, key, val);
    });
  },
  getConfig(path) {
    if (__SERVER__) {
      const fs = require('fs');
      if (path[0] !== '/') {
        path = `${process.cwd()}/${path}`;
      }
      try {
        const config = JSON.parse(fs.readFileSync(path, 'utf-8'));
        return config;
      } catch (err) {
        return {};
      }
    }
    return {};
  },
  serverWithEnv(...configs) {
    return this.server(...configs, '.env.json');
  },
  serverWithDotEnv(...configs) {
    if (__SERVER__) {
      const env = require('./env').config({ silent: __PROD__ });
      const envConfig = this.flatten2nested(env);
      configs.push(envConfig.lsk || {});
    }
    return this.serverConfig(configs);
  },
  server(...configs) {
    const _configs = configs.map((config) => {
      if (typeof config === 'string') {
        return this.getConfig(config);
      }
      return config;
    });
    return _.defaultsDeep({}, ..._.reverse(_configs));
  },
  client(...configs) {
    return _.defaultsDeep({}, ..._.reverse(configs));
  },
};
