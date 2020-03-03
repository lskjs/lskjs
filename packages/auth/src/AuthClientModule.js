import cookie from 'js-cookie';
import get from 'lodash/get';
import Module from '@lskjs/module';
import Storage from './Storage';

const DEBUG = __DEV__ && false;

export default class AuthClientModule extends Module {
  name = 'AuthClientModule';

  async init() {
    await super.init();
    this.stores = require('./stores').default(this.app);
    const { AuthStore } = this.stores;
    this.store = new AuthStore();
    this.storage = new Storage({ config: get(this, 'app.config.storage', {}) });
  }

  async run() {
    await super.run();
    await this.loadStore();
  }

  async findUserProfile() {
    return this.getMyUser()
      .then(user => ({ user }))
      .catch(err => {
        this.app.log.error(err);
        throw err;
      });
  }

  setToken(token, expires = 365, cookies = true) {
    DEBUG && console.log('AuthStore.setToken', token);  //eslint-disable-line
    this.app.api.setAuthToken(token);
    if (this.app.apiq) this.app.apiq.setToken(token);
    this.app.rootState.token = token;
    if (__CLIENT__ && cookies) {
      if (token == null) {
        cookie.remove('token');
      } else {
        cookie.set('token', token, { expires });
      }
    }
  }

  getUserAndTokenFromRootState() {
    // DEBUG && console.log('AuthStore.getUserAndToken');  //eslint-disable-line
    const res = {};
    if (this.app.rootState) {
      if (this.app.rootState.token) {
        res.token = this.app.rootState.token;
      }
      if (this.app.rootState.user) {
        res.user = this.app.rootState.user;
      }
    }
    if (!res.token && cookie.get('token')) {
      res.token = cookie.get('token');
    }
    // DEBUG && console.log('AuthStore.getUserAndTokenFromRootState', res);  //eslint-disable-line
    return res;
  }

  async loadStore() {
    this.store.setState(this.storage.get('auth'));
  }
  async saveStore() {
    const { session } = this.store;
    this.storage.set('auth', this.store.toJS());
    await this.setToken(session ? session.token : null);
    // try {
    //   await this.app.reconnect();
    // } catch (err) {
    //   console.error('AuthStore.applyPromise: this.app.reconnect', err);  //eslint-disable-line
    // }
  }

  isAuth() {
    return !!this.store.session;
  }

  async logout(redirect = true) {
    await this.store.logout();
    await this.saveStore();
    if (redirect) this.app.redirect('/');
  }

  async signup(...args) {
    await this.store.signup(...args);
    await this.saveStore();
  }

  async login(...args) {
    await this.store.login(...args);
    await this.saveStore();
  }

  restorePassword({ email }) {
    console.log(123123);
    
    return this.app.api.fetch('/api/auth/restorePassword', {
      method: 'POST',
      body: { email },
    });
  }

  setPassword({ permitId, code, password }) {
    return this.app.api.fetch('/api/auth/setPassword', {
      method: 'POST',
      body: { permitId, code, password },
    });
  }

  confirmEmail({ permitId, code }) {
    return this.app.api.fetch('/api/auth/confirmEmail', {
      method: 'POST',
      body: { permitId, code },
    });
  }

  setData(...args) {
    return this.store.setData(...args);
  }

  loginPassport(data) {
    return this.applyPromiseAndFetchProfile(this.app.api.authLoginPassport(data));
  }

  authPassport(provider) {
    window.location = `/api/module/auth/${provider}`;
  }
}

// export default ctx => ({
//   init() {
//     // this.components = require('./uapp/components').default(ctx);
//     // this.socials = require('./uapp/socials').default;// (ctx);
//     // this.models = require('./uapp/models').default(ctx);
//     this.stores = require('./uapp/stores').default(ctx);
//     // this.router = require('./uapp/router').default;
//   },
//   // getStores
// });
