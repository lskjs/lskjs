
import Api from './Api';

export default class CrudApi extends Api {
  base = '/api/v1/some';
  find(body, params) {
    return this.fetch(`${this.base}/find`, {
      method: 'POST',
      body,
      ...params,
    });
  }
  findOne(_id) {
    return this.fetch(`${this.base}/findOne`, {
      method: 'GET',
      qs: { _id },
    });
  }
  create(body) {
    return this.fetch(`${this.base}/create`, {
      method: 'POST',
      body,
    });
  }
  update({ _id, ...body }) {
  // update(_id, body) {
    return this.fetch(`${this.base}/update`, {
      method: 'POST',
      qs: { _id },
      body,
    });
  }
  remove(_id) {
    return this.fetch(`${this.base}/remove`, {
      method: 'POST',
      qs: { _id },
    });
  }
}
