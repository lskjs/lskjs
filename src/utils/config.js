import _ from 'lodash';
import deepmerge from 'deepmerge';

function getConfig(path) {
  if (__SERVER__) {
    const fs = require('fs');
    if (path[0] !== '/') {
      path = `${process.cwd()}/${path}`;
    }
    let confStr;
    try {
      confStr = fs.readFileSync(path, 'utf-8');
    } catch (err) {
      return {};
    }
    try {
      const config = Object.assign({}, { _json: 1 }, JSON.parse(confStr));
      return config;
    } catch (err) {
      console.log('.env.json error', err);
      return {};
    }
  }
  return {};
}


class Config {

  constructor(c = {}) {
    Object.assign(this, c);
  }

  extend(c) {
    if (_.isFunction(c)) {
      return c(this);
    }
    return this.merge(c);
  }
  extendEnv(path = '.env.json') {
    const config = getConfig(path);
    // console.log('extendEnv', this.client, "\n---\n", config.clienyarm t, "\n---\n", _.merge({}, this.client, config.client));
    return this.merge(config);
  }

  merge(c = {}) {
    const object = c.toObject && c.toObject() || c;

    Object.assign(this, deepmerge(this, object, { arrayMerge: (d, s, o) => {
      // console.log('arrayMerge', d, s, o);

      return s

    } }));
    return this;
  }

  toObject() {
    return _.toPlainObject(this);
  }

  toJSON() {
    if (this.toObject) {
      return this.toObject();
    }
    return this;
  }
}

export default {
  init(c) {
    return new Config(c);
  },
  flatten2nested(flatten) {
    const config = {};
    _.forEach(flatten, (val, key) => {
      _.set(config, key, val);
    });
  },
  getConfig,
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
  // clientWithEnv(...configs) {
  //   return this.client(...configs, '.env.json');
  // },
  client(...configs) {
    return _.defaultsDeep({}, ..._.reverse(configs));
  },
};
