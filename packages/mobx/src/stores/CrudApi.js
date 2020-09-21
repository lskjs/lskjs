import isPlainObject from 'lodash/isPlainObject';
import Api from './Api';

export default class CrudApi extends Api {
  base = '/api/v1/some';
  find(data) {
    return this.fetch(`${this.base}/find`, {
      method: 'POST',
      data,
    });
  }
  findById(_id) {
    return this.fetch(`${this.base}/findOne`, {
      method: 'GET',
      qs: { _id },
    });
  }
  findOne(data) {
    if (isPlainObject(data)) {
      return this.fetch(`${this.base}/findOne`, {
        method: 'POST',
        data,
      });
    }
    return this.findById(data);
  }
  create(data) {
    return this.fetch(`${this.base}/create`, {
      method: 'POST',
      data,
    });
  }
  update({ _id, ...data }) {
    // update(_id, data) {
    return this.fetch(`${this.base}/update`, {
      method: 'POST',
      qs: { _id },
      data,
    });
  }
  remove(_id) {
    return this.fetch(`${this.base}/remove`, {
      method: 'POST',
      qs: { _id },
    });
  }
}
