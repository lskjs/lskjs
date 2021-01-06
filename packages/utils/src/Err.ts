import forEach from 'lodash/forEach';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import uniq from 'lodash/uniq';
import errMerge from './errMerge';

const errUnknown = 'err_unknown';

export const getMessage = (err: any, def = errUnknown): string => {
  const errName = err && err.name !== 'Error' ? err.name : null;
  return (err && (err.message || err.text || err.code || errName)) || def;
};

export const getText = (err: any, def = errUnknown): string => {
  const array = [err.code, getMessage(err), err.text, err.stack];
  return (err && uniq(array.filter(Boolean)).join('\n')) || errUnknown;
};

export const getCode = (err: any, def = errUnknown): string => {
  return (err && (err.code || err.text || err.message)) || def;
};

export const getJSON = (err: any, onlySafeField = false): object => {
  if (onlySafeField) return pick(err, ['name', 'code', 'message', 'text', 'data']);
  return omit(pick(err, Object.getOwnPropertyNames(err)), ['__err']);
};

export default class Err extends Error {
  __err = true;
  constructor(...params: any[]) {
    const err = errMerge(...params);
    super(getMessage(err));
    this.name = this.constructor.name;
    forEach(err, (val, key) => {
      if (key === 'message') {
        if (this.message !== val && val) {
          this._message = val;
        }
      } else if (key === 'stack') {
        // TODO: подумать в будущем
        // console.log('this.stack', this.stack);
        // console.log('err.stack', err.stack);
      } else {
        this[key] = val;
      }
    });
    if (!this.code) this.code = getCode(err);
  }
  static getMessage(err: any, def = errUnknown): string {
    return getMessage(err, def);
  }
  static getText(err: any, def = errUnknown): string {
    return getText(err, def);
  }
  static getCode(err: any, def = errUnknown): string {
    return getCode(err, def);
  }
  static getJSON(err: any, onlySafeField = false): object {
    return getJSON(err, onlySafeField);
  }
  getText(): string {
    return this.constructor.getText(this);
  }
  getJSON(onlySafeField = false): object {
    return this.constructor.getJSON(this, onlySafeField);
  }
  getMessage(): string {
    return this.constructor.getMessage(this);
  }
  toJSON(): object {
    const json = this.getJSON(true);
    return json;
  }
}
