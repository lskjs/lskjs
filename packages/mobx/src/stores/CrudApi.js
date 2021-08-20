import isPlainObject from 'lodash/isPlainObject';

import { Api } from './Api';

export class CrudApi extends Api {
  baseURL = '/api';
  async find(data, options = {}) {
    this.client.defaults.transformResponse = [this.transformResponseSimple.bind(this)];
    const res = await this.fetch('/find', {
      method: 'POST',
      data,
      ...options,
    });
    this.client.defaults.transformResponse = [this.transformResponse.bind(this)];
    return res;
  }
  findById(_id) {
    return this.fetch('/findOne', {
      method: 'GET',
      params: { _id },
    });
  }
  findOne(data) {
    if (isPlainObject(data)) {
      return this.fetch('/findOne', {
        method: 'POST',
        data,
      });
    }
    return this.findById(data);
  }
  create(data) {
    return this.fetch('/create', {
      method: 'POST',
      data,
    });
  }
  update({ _id, ...data }) {
    // update(_id, data) {
    return this.fetch('/update', {
      method: 'POST',
      params: { _id },
      data,
    });
  }
  remove(_id) {
    return this.fetch('/remove', {
      method: 'POST',
      params: { _id },
    });
  }
}

export default CrudApi;
