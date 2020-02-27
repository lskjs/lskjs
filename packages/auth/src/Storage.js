import get from 'lodash/get';
import tryJSONparse from '@lskjs/utils/tryJSONparse';
import createLogger from '@lskjs/utils/createLogger';

const DEBUG = __DEV__; // && false;
const debug = createLogger({ name: '@lskjs/storage', enable: DEBUG });
export default class Storage {
  constructor(props = {}) {
    Object.assign(this, props);
  }
  prefix() {
    return get(this, 'config.prefix', 'lsk');
  }
  path(key) {
    return `${this.prefix()}.${key}`;
  }
  get(key) {
    const path = this.path(key);
    let value;
    if (typeof localStorage === 'undefined') {
      value = null;
      debug('get', path, '=(');
    } else {
      value = tryJSONparse(localStorage.getItem(`${this.prefix()}.${key}`));
      debug('get', path, value);
    }
    return value;
  }
  set(key, value) {
    const path = this.path(key);
    if (typeof localStorage === 'undefined') {
      debug('set', path, '=(');
      return;
    }
    localStorage.setItem(`${this.prefix()}.${key}`, JSON.stringify(value));
    debug('set', path, value);
  }
}
