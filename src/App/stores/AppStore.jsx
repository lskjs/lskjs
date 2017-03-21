import ApiClient from '../api/api.client';

import AuthStore from './AuthStore';
import UserStore from './UserStore';
import UIStore from './UIStore';

export default class AppStore {

  ui = new UIStore();

  constructor(state, req, config) {
    const base = __SERVER__ ? config.client.api.base : config.api.base;
    const user = req.user || state.user;
    console.log(base);
    this.api = new ApiClient({ base });

    this.auth = new AuthStore(this, { state, req });
    this.user = new UserStore(this, user);
  }

  provide() {
    return {
      app: this,
      auth: this.auth,
      user: this.user,
      api: this.api,
      ui: this.ui,
    };
  }

}
