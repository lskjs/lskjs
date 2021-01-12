import { IModel } from './types'

export class BaseModel implements IModel {
  __model = true;
  static defaultOptions: {[key: string]: any} = {
    timestamps: true,
  };
  // overridable
  static options: {[key: string]: any} = {};
}

export default BaseModel;
