import forEach from 'lodash/forEach';
import errMerge from './eerrMerge';

export default class Err extends Error {
  constructor(...params) {
    const err = errMerge(...params);
    super(err.message || err.code || 'err_unknown');
    forEach(err, (val, key) => {
      this[key] = val;
    });
  }
}
