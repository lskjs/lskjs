import CrudApi from '@lskjs/mobx/stores/CrudApi';
// import CrudApi from '@lskjs/mobx/stores/CrudApi';

export default class PermitApi extends CrudApi {
  base = '/api/module/permit';

  findOne(_id) {
    return this.fetch('/api/module/auth/getPermit', {
      method: 'GET',
      qs: { _id },
    });
  }

  approveEmail(data) {
    return this.fetch(`${this.base}/approveEmail`, {
      method: 'POST',
      data,
    });
  }

  changePassword(data) {
    return this.fetch(`${this.base}/changePassword`, {
      method: 'POST',
      data,
    });
  }
}
