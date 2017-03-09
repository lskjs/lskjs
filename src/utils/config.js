import { defaultsDeep, reverse } from 'lodash';

export default {
  server: function serverConfig(...configs) {
    if (__SERVER__) {
      const env = require('./env').config();
      // console.log(env);
      configs.push(env);
    }
    return defaultsDeep({}, ...reverse(configs));
  },
  client: function clientConfig(...configs) {
    return defaultsDeep({}, ...reverse(configs));
  },
};
