import { observable } from 'mobx';
import set from 'lodash/set';
import CrudStore from '@lskjs/mobx/stores/CrudStore';
import CrudApi from '@lskjs/mobx/stores/CrudApi';

export class SessionApi extends CrudApi {
  base = '/api/module/auth/session';
  // findOne(_id) {
  //   return this.fetch('/api/module/auth/getPermit', {
  //     method: 'GET',
  //     qs: { _id },
  //   });
  // }

  // approveEmail(body) {
  //   return this.fetch(`${this.base}/approveEmail`, {
  //     method: 'POST',
  //     body,
  //   });
  // }

  // changePassword(body) {
  //   return this.fetch(`${this.base}/changePassword`, {
  //     method: 'POST',
  //     body,
  //   });
  // }
}


export default uapp => class SessionStore extends CrudStore {
  static api = new SessionApi({ uapp });

  @observable _id;
  // @observable activatedAt;
  // @observable disabledAt;
  @observable user = {};
  // @observable private = {};

  // setStateField(item, value) {
  //   // console.log({item, value});

  //   if (item === 'activatedAt' || item === 'disabledAt') {
  //     set(this, item, new Date(value));
  //   } else {
  //     super.setStateField(item, value);
  //   }
  // }

  // isActive() {
  //   console.log(this.activatedAt);
  //   console.log(this.disabledAt);
  //   console.log(this.expiredAt);
  //   console.log(!this.activatedAt && !this.disabledAt);

  //   return !this.activatedAt && !this.disabledAt;
  // }
};
