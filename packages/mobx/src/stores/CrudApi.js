
import Api from './Api';

export default class CrudApi extends Api {
  base = '/api/v1/some';
  find(data) {
    return this.fetch(`${this.base}/find`, {
      method: 'POST',
      data,
    });
  }
  findOne(_id) {
    return this.fetch(`${this.base}/findOne`, {
      method: 'GET',
      qs: { _id },
    });
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
