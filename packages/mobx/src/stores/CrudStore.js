import Err from '@lskjs/err';

import { ApiStore } from './ApiStore';

export class CrudStore extends ApiStore {
  static find(data, params) {
    if (!(this.api && this.api.find)) throw new Err('!api.find');
    return this.wrap(this.api.find(data), { ...params, list: true });
  }
  static findOne(data, params) {
    if (!(this.api && this.api.findOne)) throw new Err('!api.findOne');
    return this.wrap(this.api.findOne(data), params);
  }
  static create(data = {}, params) {
    if (!(this.api && this.api.create)) throw new Err('!api.create');
    return this.wrap(this.api.create(data), params);
  }
  static update(data = {}, params) {
    if (!(this.api && this.api.update)) throw new Err('!api.update');
    return this.wrap(this.api.update(data), params);
  }
  static remove(_id) {
    if (!(this.api && this.api.remove)) throw new Err('!api.remove');
    return this.api.remove(_id);
  }
}

export default CrudStore;
