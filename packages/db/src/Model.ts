// ts-ignore
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import set from 'lodash/set';
import { Schema } from 'mongoose';

import { IModel } from './types';

export class Model implements IModel {
  __model = true;
  static Schema = Schema;
  static Types = Schema.Types;
  // TODO: еще раз об этом подумать
  static defaultOptions: { [key: string]: any } = {
    timestamps: true,
  };
  // overridable
  static options: { [key: string]: any } = {};

  setState(state = {}) {
    forEach(state, (value: any, key: any) => {
      set(this, key, value);
      // ts-ignore
      this.markModified(key);
    });
  }
  getState(key, def) {
    if (!key) return this;
    return get(this, key, def);
  }
}

export default Model;
