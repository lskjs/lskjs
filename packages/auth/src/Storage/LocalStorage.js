import get from 'lodash/get';
import tryJSONparse from '@lskjs/utils/tryJSONparse';
import Storage from './Storage';

export class LocalStorage extends Storage {
  async init() {
    await super.init();
    if (typeof window !== 'undefined') {
      this.state = window.localStorage;
    } else {
      this.debug('LocalStorage init on server =(');
    }
  }
  path(key) {
    return `${get(this, 'config.prefix', 'lsk')}.${key}`;
  }
  _get(key) {
    if (!this._inited) console.error('!LocalStorage._inited')
    const path = this.path(key);
    if (!this.state) {
      this.debug('get', path, '=( !localStorage');
      return null;
    }

    try {
      return tryJSONparse(this.state.getItem(path));
    } catch (err) {
      this.debug('get', path, err);
      return null;
    }
  }
  _set(key, value) {
    if (!this._inited) console.error('!LocalStorage._inited')
    const path = this.path(key);
    if (!this.state) {
      this.debug('set', path, '=( !localStorage');
      return;
    }
    try {
      this.state.setItem(path, JSON.stringify(value));
    } catch (err) {
      this.debug('set', path, err);
    }
  }
}

export default LocalStorage;
