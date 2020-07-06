import get from 'lodash/get';
import set from 'lodash/set';
import tryJSONparse from '@lskjs/utils/tryJSONparse';
import createLogger from '@lskjs/utils/createLogger';
import assignProps from '@lskjs/utils/assignProps';

// const DEBUG = __DEV__ && __STAGE__ === 'isuvorov';
const DEBUG = false;
const debug = createLogger({ name: '@lskjs/storage', enable: DEBUG });
export default class Storage {
  debug = debug;
  state = {};
  constructor(props = {}) {
    assignProps(this, props);
    this.init();
  }
  init() {}
  _get(key) {
    return get(this, 'state.' + key)
  }
  get(key) {
    let value;
    value = this._get(key)
    debug('get', key, value);
    return value;
  }
  _set(key, value) {
    return set(this, key, value)
  }
  set(key, value) {
    this._set(key, value);
    debug('set', key, value);
  }
}
