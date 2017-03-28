import ApiClient from '../api/api.client';

import AuthStore from './AuthStore';
import UserStore from './UserStore';
import UIStore from './UIStore';

// Prototype of Uapp class
export default class AppStore {

  ui = new UIStore();
  log = {
    info: (...args) => { console.log('[LOGGER]', ...args); },
    error: (...args) => { console.error('[ERROR]', ...args); },
  };
  static v = 2;
  constructor(params) {
    const { rootState: state, req = {} } = params;
    this.config = state.config;
    this.api = new ApiClient({ base: state.config.api.base });
    this.auth = new AuthStore(this, { state, req });
    this.user = new UserStore(this, state.user);
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
