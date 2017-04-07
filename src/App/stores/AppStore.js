import ApiClient from '../api/api.client';

import AuthStore from './AuthStore';
import UserStore from './UserStore';

// Prototype of Uapp class
import Provider from 'lego-starter-kit/ReactApp/Provider';
export default class AppStore extends Provider {

  static v = 2;

  constructor(params) {
    super(params);
    // console.log('AppStore.config', this.config);
    this.api = new ApiClient(this.config && this.config.api || {});
    this.user = new UserStore(this);
    this.auth = new AuthStore(this);
    this.models = this.getModels();
    this.stores = this.getStores();

    this.auth.init();
  }


  getStores() {
    return require('./stores').default(this); // eslint-disable-line
  }

  getModels() {
    return require('./models').default(this); // eslint-disable-line
  }


  provide() {
    return {
      ...super.provide(),
      auth: this.auth,
      api: this.api,
      user: this.user,
      page: this.page,
    };
  }

}
