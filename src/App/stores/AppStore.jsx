import ApiClient from '../api/api.client';

import AuthStore from './AuthStore';
import UserStore from './UserStore';
import UIStore from './UIStore';

// Prototype of Uapp class
export default class AppStore {

  ui = new UIStore();
  static v = 2;
  constructor(params) {
    // Object.assing(this, params)
    const { rootState: state, req = {} } = params;
    this.config = state.config;
    this.rootState = state;
    this.api = new ApiClient({ base: state.config.api.base });
    this.auth = new AuthStore(this, { state, req });
    this.user = new UserStore(this, state.user);
    this.init();
  }

  async init() {
    this.models = this.getModels();
    this.stores = this.getStores();
    this.log = this.getLogger();
  }

  getLogger() {
    return {
      info: (...args) => { console.log('[LOGGER]', ...args); },
      error: (...args) => { console.error('[ERROR]', ...args); },
    };
  }

  getStores() {
    return require('./stores').default(this); // eslint-disable-line
  }

  getModels() {
    return require('./models').default(this); // eslint-disable-line
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
      config: this.config,
      page: this.page,
    };
  }

}
