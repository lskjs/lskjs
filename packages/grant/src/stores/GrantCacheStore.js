/* eslint-disable max-classes-per-file */
import Api from '@lskjs/mobx/mobxStores/Api';
import Store from '@lskjs/mobx/mobxStores/Store';
import { action as mobxAction, observable, toJS } from 'mobx';

export class GrantCacheApi extends Api {
  baseURL = '/api/grant';
  ask(data, params) {
    return this.fetch('/ask', {
      method: 'POST',
      params,
      data,
    });
  }
}

export class GrantCacheStore extends Store {
  static Api = GrantCacheApi;
  @observable params;
  @observable res;
  static async create(params) {
    const { data: res } = await this.api.ask(toJS(params));
    const item = new this({ params, res });
    return item;
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
      log.warn('?grantCache.can', 'cant find rule in grantCache', { action: name }, this.res, res);
      return null;
    }
    return res;
  }

  async update(params = { clearCache: 1 }) {
    if (this.debug) {
      this.log.debug('grantCache.update', [this.res, this.res['cabinet.verifyAccess']]);
    }
    const { data: res } = await this.constructor.api.ask(toJS(this.params), params);
    // const { log } = this.constructor.app;
    this.res = res;
    // log.debug('grantCache.update', [res, res['cabinet.verifyAccess']], [this.res, this.res['cabinet.verifyAccess']]);
  }
}

export default GrantCacheStore;
