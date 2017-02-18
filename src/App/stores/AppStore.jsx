import { observable } from 'mobx';
import AuthStore from './AuthStore';
import ApiClient from '../api/api.client';
import cookie from 'react-cookie';
import config from '../../config/client'; // TODO fix

class AppStore {
  user = null;
  api = null;
  config = config;

  @observable updateCount = 0;
  update() {
    this.updateCount += 1;
    // console.log('this.updateCount', this.updateCount);
  }

  constructor(rootState, req) {
    this.api = new ApiClient({ base: '/api/v1' });
    this.auth = new AuthStore(this);
    // console.log({req, rootState});

    if (__SERVER__) {
      if (!req._errJwt && req.user && req.user._id) {
        this.auth.init({
          token: req.token,
          user: req.user,
        });
      }
    } else {
      this.auth.init({
        token: cookie.load('token'),
        user: rootState.user,
      });
    }
  }

  provide() {
    return {
      app: this,
      auth: this.auth,
      user: this.auth && this.auth.user,
      api: this.api,
    };
  }
}

export default AppStore;
