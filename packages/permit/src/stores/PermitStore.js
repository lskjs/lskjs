/* eslint-disable max-classes-per-file */
import { CrudApi } from '@lskjs/mobx/mobxStores/CrudApi';
import { CrudStore } from '@lskjs/mobx/mobxStores/CrudStore';
import set from 'lodash/set';
import { observable } from 'mobx';

export class PermitApi extends CrudApi {
  baseURL = '/api/permit';
  approveEmail(data) {
    return this.fetch('/approveEmail', {
      method: 'POST',
      data,
    });
  }

  changePassword(data) {
    return this.fetch('/changePassword', {
      method: 'POST',
      data,
    });
  }
}

export class PermitStore extends CrudStore {
  static Api = PermitApi;

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
}

export default PermitStore;
