// ts-ignore
import { Schema } from 'mongoose';

import { IModel } from './types';

export class Model implements IModel {
  __model = true;
  static Schema = Schema;
  static Types = Schema.Types;
  static defaultOptions: { [key: string]: any } = {
    timestamps: true,
  };
  // overridable
  static options: { [key: string]: any } = {};
}

export default Model;
