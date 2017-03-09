import clone from 'lodash/clone';

import AuthStore from './AuthStore';
import UserStore from './UserStore';
import UIStore from './UIStore';
import ApiClient from '../api/api.client';

export default class AppStore {

  constructor(state, req, config) {
    const base = __SERVER__ ? config.client.api.base : config.api.base;
    const user = req.user || state.user;
    this.api = new ApiClient({ base });
    this.auth = new AuthStore(this, { state, req });
    this.user = new UserStore(this, user);
    this.ui = new UIStore(this);
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
