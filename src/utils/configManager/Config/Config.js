import deepmerge from 'deepmerge';
import isFunction from 'lodash/isFunction';
import merge from 'lodash/merge';
import toPlainObject from 'lodash/toPlainObject';
import forEach from 'lodash/forEach';
import set from 'lodash/set';
import defaultsDeep from 'lodash/defaultsDeep';
import reverse from 'lodash/reverse';
import cloneDeep from 'lodash/cloneDeep';

export default class Config {
  constructor(c = {}) {
    Object.assign(this, c);
  }

  extend(c) {
    if (isFunction(c)) {
      return c(this);
    }
    return this.merge(c);
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