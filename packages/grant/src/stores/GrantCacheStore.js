/* eslint-disable max-classes-per-file */
import Api from '@lskjs/mobx/mobxStores/Api';
import Store from '@lskjs/mobx/mobxStores/Store';
import get from 'lodash/get';
import { action as mobxAction, observable } from 'mobx';

export class GrantCacheApi extends Api {
  baseURL = '/api/grant';
  ask(data) {
    return this.fetch('/ask', {
      method: 'POST',
      data,
    });
  }
}

export class GrantCacheStore extends Store {
  static Api = GrantCacheApi;
  @observable params;
  @observable res;
  static async create(params) {
    const { data: res } = await this.api.ask(params);
    return new this({ params, res });
  }

  @mobxAction
  can(name) {
    const res = this.get(name);
    return !!res;
  }

  @mobxAction
  get(name) {
    const { log } = this.constructor.app;
    const res = (this.res || {})[name];
    if (res == null) {
      log.warn('?grantCache.can', 'cant find rule in grantCache', { action: name }, this.res, this.res[name]);
      return null;
    }
    return res;
  }

  async update() {
    const { data: res } = await this.constructor.api.ask(this.params);
    const { log } = this.constructor.app;
    this.res = res;
    // log.debug('grantCache.update', [res, res['cabinet.verifyAccess']], [this.res, this.res['cabinet.verifyAccess']]);
  }
}

export default GrantCacheStore;
