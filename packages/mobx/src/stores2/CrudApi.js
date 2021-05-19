import isPlainObject from 'lodash/isPlainObject';

import { Api } from './Api';

export class CrudApi extends Api {
  baseURL = '/api/v1/some';
  find(data) {
    return this.fetch('/find', {
      method: 'POST',
      data,
    });
  }
  findById(_id) {
    return this.fetch('/findOne', {
      method: 'GET',
      qs: { _id },
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
      qs: { _id },
      data,
    });
  }
  remove(_id) {
    return this.fetch('/remove', {
      method: 'POST',
      qs: { _id },
    });
  }
}

export default CrudApi;
