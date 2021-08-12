/* eslint-disable max-classes-per-file */
import { CrudApi } from '@lskjs/mobx/stores2/CrudApi';
import { CrudStore } from '@lskjs/mobx/stores2/CrudStore';
import set from 'lodash/set';
import { observable } from 'mobx';

export class PermitApi extends CrudApi {
  base = '/api/permit';
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

export default (uapp) =>
  class UserStore extends CrudStore {
    static api = new PermitApi({ uapp });

    @observable _id;
    // @observable activatedAt;
    // @observable disabledAt;
    @observable info = {};
    @observable private = {};

    setStateField(item, value) {
      if (item === 'activatedAt' || item === 'disabledAt') {
        set(this, item, new Date(value));
      } else {
        super.setStateField(item, value);
      }
    }

    isActive() {
      return !this.activatedAt && !this.disabledAt;
    }
  };
