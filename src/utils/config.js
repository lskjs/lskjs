import _ from 'lodash';

export default {
  server: function serverConfig(...configs) {
    return _.defaultsDeep({}, ..._.reverse(configs));
  },
  client: function clientConfig(...configs) {
    return _.defaultsDeep({}, ..._.reverse(configs));
  },
};
