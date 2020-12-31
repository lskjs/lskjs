import forEach from 'lodash/forEach';
import pick from 'lodash/pick';
import uniq from 'lodash/uniq';
import errMerge from './errMerge';

export default class Err extends Error {
  __err = true;
  constructor(...params) {
    const err = errMerge(...params);
    const errorMessage = err.message || err.code || err.name || 'err_unknown';
    super(errorMessage);
    forEach(err, (val, key) => {
      if (key === 'message') {
        if (this.message !== val && val) {
          this._message = val;
        }
      } else if (key === 'stack') {
        // console.log('this.stack', this.stack);
        // console.log('err.stack', err.stack);
      } else {
        this[key] = val;
      }
    });
  }
  getJSON() {
    return pick(this, Object.getOwnPropertyNames(this));
  }
  static getMessage(err) {
    return (err && (err.message || err.text || err.code)) || 'ERR_UNKNOWN';
  }
  static getText(err) {
    return (err && uniq([err.code, err.message, err.text, err.stack].filter(Boolean)).join('\n')) || 'ERR_UNKNOWN';
  }
  static getCode(err) {
    return (err && (err.code || err.text || err.message)) || 'ERR_UNKNOWN';
  }
  getText() {
    return this.constructor.getText(this);
  }
  getMessage() {
    return this.constructor.getMessage(this);
  }
  toJSON() {
    if (__DEV__) {
      return this.getJSON();
    }
    return super.toJSON();
  }
}
