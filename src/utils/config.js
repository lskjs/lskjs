import deepmerge from 'deepmerge';
import isFunction from 'lodash/isFunction';
import merge from 'lodash/merge';
import toPlainObject from 'lodash/toPlainObject';
import forEach from 'lodash/forEach';
import set from 'lodash/set';
import defaultsDeep from 'lodash/defaultsDeep';
import reverse from 'lodash/reverse';
import cloneDeep from 'lodash/cloneDeep';


function getConfig(prePath) {
  let path = prePath;
  if (__SERVER__) {
    const fs = require('fs');
    if (path[0] !== '/') {
      path = `${process.cwd()}/${path}`;
    }
    let confStr;
    try {
      confStr = fs.readFileSync(path, 'utf-8');
    } catch (err) {
      if (prePath !== '.env.json') {
        console.error(`====================`);
        console.error(`WARNING: Can't read file ${path}\n`, err);
        console.error(`====================`);
      }
      return {};
    }
    try {
      const config = Object.assign({}, { _json: 1 }, JSON.parse(confStr));
      return config;
    } catch (err) {
      console.error(`====================`);
      console.error(`WARNING: Can't parse file ${path}\n`, err);
      console.error(`====================`);
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
    if (isFunction(c)) {
      return c(this);
    }
    return this.merge(c);
  }
  extendEnv(path = '.env.json') {
    const config = getConfig(path);
    this._withoutEnvJson = cloneDeep(this.toObject());
    // console.log('extendEnv', this.client, "\n---\n", config.clienyarm t, "\n---\n", merge({}, this.client, config.client));
    return this.merge(config);
  }

  merge(c = {}) {
    const object = c.toObject && c.toObject() || c;

    Object.assign(this, deepmerge(this, object, { arrayMerge: (d, s, o) => {
      // console.log('arrayMerge', d, s, o);

      return s;
    } }));
    return this;
  }

  toObject() {
    return toPlainObject(this);
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
    forEach(flatten, (val, key) => {
      set(config, key, val);
    });
  },
  getConfig,
  serverWithEnv(...configs) {
    return this.server(...configs, '.env.json');
  },
  serverWithDotEnv(...configs) {
    if (__SERVER__) {
      const env = require('./env').config({ silent: !__DEV__ });
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
    return defaultsDeep({}, ...reverse(_configs));
  },
  // clientWithEnv(...configs) {
  //   return this.client(...configs, '.env.json');
  // },
  client(...configs) {
    return defaultsDeep({}, ...reverse(configs));
  },
};
