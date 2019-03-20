import CrudApi from '@lskjs/general/stores/CrudApi';
// import CrudApi from '@lskjs/mobx/stores/CrudApi';

export default class UserApi extends CrudApi {
  base = '/api/module/permit';

  findOne(_id) {
    return this.fetch('/api/module/auth/getPermit', {
      method: 'GET',
      qs: { _id },
    });
  }

  approveEmail(body) {
    return this.fetch(`${this.base}/approveEmail`, {
      method: 'POST',
      body,
    });
  }

  changePassword(body) {
    return this.fetch(`${this.base}/changePassword`, {
      method: 'POST',
      body,
    });
  }
}
