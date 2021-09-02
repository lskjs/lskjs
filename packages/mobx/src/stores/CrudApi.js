import isPlainObject from 'lodash/isPlainObject';

import { Api } from './Api';

export class CrudApi extends Api {
  baseURL = '/api';
  find(data, options = {}) {
    return this.request('/find', {
      method: 'POST',
      data,
      ...options,
    });
  }
  findById(_id, options = {}) {
    return this.request('/findOne', {
      method: 'GET',
      params: { _id },
      ...options,
    });
  }
  findOne(data, options = {}) {
    if (isPlainObject(data)) {
      return this.request('/findOne', {
        method: 'POST',
        data,
        ...options,
      });
    }
    return this.findById(data, options);
  }
  create(data, options = {}) {
    return this.request('/create', {
      method: 'POST',
      data,
      ...options,
    });
  }
  update({ _id, ...data }, options = {}) {
    // update(_id, data) {
    return this.request('/update', {
      method: 'POST',
      params: { _id },
      data,
      ...options,
    });
  }
  remove({ _id }, options = {}) {
    return this.request('/remove', {
      method: 'POST',
      params: { _id },
      ...options,
    });
  }
}

export default CrudApi;
