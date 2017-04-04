import ApiClient from '../api/api.client';

import AuthStore from './AuthStore';
import UserStore from './UserStore';

// Prototype of Uapp class
export default class AppStore {

  static v = 2;

  constructor(params) {
    // Object.assing(this, params)
    const { rootState: state, req = {}, app } = params;
    this._app = app;
    this.config = state.config;
    this.rootState = state;
    this.api = new ApiClient(state.config.api);
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
    // console.log('bunyan log', this._app.log)
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
      api: this.api,
      user: this.user,
      config: this.config,
      page: this.page,
    };
  }

}
