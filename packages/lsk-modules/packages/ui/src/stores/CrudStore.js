import ApiStore from './ApiStore';

export default class CrudStore extends ApiStore {
  static find(body, params) {
    if (!(this.api && this.api.find)) throw '!api.find';
    return this.wrap(this.api.find(body), { ...params, list: true });
  }
  static findOne(_id, params) {
    if (!(this.api && this.api.findOne)) throw '!api.findOne';
    return this.wrap(this.api.findOne(_id), params);
  }
  static create(body = {}, params) {
    if (!(this.api && this.api.create)) throw '!api.create';
    return this.wrap(this.api.create(body), params);
  }
  static update(body = {}, params) {
    if (!(this.api && this.api.update)) throw '!api.update';
    return this.wrap(this.api.update(body), params);
  }
  static remove(_id) {
    if (!(this.api && this.api.remove)) throw '!api.remove';
    return this.api.remove(_id);
  }
}
