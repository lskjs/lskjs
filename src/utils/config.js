import _ from 'lodash';

export default {
  flatten2nested(flatten) {
    const config = {};
    _.forEach(flatten, (val, key) => {
      _.set(config, key, val);
    });
  },
  serverWithEnv(...configs) {
    if (__SERVER__) {
      const env = require('./env').config({ silent: __PROD__ });
      const envConfig = this.flatten2nested(env)
      configs.push(envConfig.lsk || {});
    }
    return this.serverConfig(configs);
  },
  server(...configs) {
    return _.defaultsDeep({}, ..._.reverse(configs));
  },
  client(...configs) {
    return _.defaultsDeep({}, ..._.reverse(configs));
  },
};
