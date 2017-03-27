import ApiClient from '../api/api.client';

import AuthStore from './AuthStore';
import UserStore from './UserStore';
import UIStore from './UIStore';

// Prototype of Uapp class
export default class AppStore {

  ui = new UIStore();
  log = {
    info: (...args) => { console.log('LOGGER', ...args); },
  }
  static v = 2;
  constructor(params) {
    const { rootState: state, req, config } = params;
    this.config = __SERVER__ ? config.client : config;
    const base = __SERVER__ ? config.client.api.base : config.api.base;
    const user = req.user || state.user;
    this.api = new ApiClient({ base });

    this.auth = new AuthStore(this, { state, req });
    this.user = new UserStore(this, user);
    this.setData(params);
  }

  setData({ page, uapp }) {
    this.page = page;
    this.uapp = uapp;
  }

  provide() {
    return {
      app: this,
      log: this.log,
      auth: this.auth,
      user: this.user,
      api: this.api,
      ui: this.ui,
      config: this.config,
      page: this.page,
    };
  }

}
