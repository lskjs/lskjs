import Bluebird from 'bluebird';
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
      // @ts-ignore
      this.markModified(key);
    });
  }
  getState(key: string, def: any) {
    if (!key) return this;
    return get(this, key, def);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async prepareOne(obj: any, params: any): Promise<any> {
    return obj;
  }
  static async prepare(obj: any | any[], params: any = {}): Promise<any | any[]> {
    // // console.log('PREPARE params.toObject', params.toObject);
    // // console.log('params.toObject2@@@', params.toObject2);
    const toObjectOne = (o: any) => {
      if (!params.toObject2 || !Object.keys(params.toObject2).length) return o;
      if (o && o.toObject) return o.toObject(params.toObject2);
      return o;
    };

    let res;
    if (Array.isArray(obj)) {
      res = await Bluebird.map(obj, (o) => this.prepareOne(o, params));
    } else {
      res = await this.prepareOne(obj, params);
    }

    if (Array.isArray(res)) {
      return res.map(toObjectOne);
    }
    return toObjectOne(res);
  }
}

export default Model;
