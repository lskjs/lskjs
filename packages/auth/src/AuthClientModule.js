import cookie from 'js-cookie';
import Module from '@lskjs/module';
import tryJSONparse from '@lskjs/utils/tryJSONparse';
// import AuthApi from './stores/AuthApi';

const DEBUG = __DEV__ && false;

export default class AuthClientModule extends Module {
  name = 'AuthClientModule';

  async init() {
    await super.init();
    this.stores = require('./stores').default(this.app);
    const { AuthStore } = this.stores;
    this.authStore = new AuthStore();
  }

  async run() {
    await super.run();
    await this.loadStore();
  }

  async initAuth() {
    const res = this.getUserAndTokenFromRootState();
    DEBUG && console.log('AuthStore.init res', res);  //eslint-disable-line

    // this.setUserAndToken(res);
    // await this.initUserProfile();
    // if (res.user.iat && res.token) {
    //   try {
    //     const { user } = await this.findUserProfile();
    //     this.setUser(user);
    //   } catch (err) {
    //     uapp.log.error(err);
    //     if (__DEV__) {
    //       console.log('Auth.logout();');  //eslint-disable-line
    //       this.logout();
    //     } else {
    //       this.logout();
    //     }
    //   }
    // }
  }

  async initUserProfile() {
    DEBUG && console.log('AuthStore.initUserProfile uapp.rootState.user', uapp.rootState.user);  //eslint-disable-line
    if (__CLIENT__) {
      if (this.app.rootState.token && !(this.app.rootState.user && this.app.rootState.user.profile)) {
        this.applyPromise(this.findUserProfile());
      }
    } else if (this.app.rootState.token && !(this.app.rootState.user && this.app.rootState.user.profile)) {
      await this.applyPromise(this.findUserProfile());
    }
  }
  async getMyUser(body) {
    const res = await this.api.fetch('/api/users/me', {
      method: 'POST',
      body,
    });
    return res.data;
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
    this.app.rootState.token = token;
    if (__CLIENT__ && cookies) {
      if (token == null) {
        cookie.remove('token');
      } else {
        cookie.set('token', token, { expires });
      }
    }
  }

  setUser(userData = null) {
    DEBUG && console.log('AuthStore.setUser', user);  //eslint-disable-line
    this.app.rootState.user = userData;
    // this.app.resetState();
    if (userData) {
      if (this.app.user && this.app.user.setState) this.app.user.setState(userData);
    } else if (this.app.user && this.app.user.reset) this.app.user.reset();
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

  // async saveStore(promise) {
  //   const res = await this.applyPromise(promise);
  //   // if (__CLIENT__) {
  //   //   await this.applyPromise(this.findUserProfile());
  //   // }
  //   return res;
  // }

  async loadStore() {
    if (typeof localStorage !== 'undefined') {
      const sessions = tryJSONparse(localStorage.getItem('lsk.auth.sessions'));
      this.authStore.sessions = sessions || [];
    }
  }
  async saveStore() {
    // DEBUG && console.log('AuthStore.applyPromise @@@1', promise);  //eslint-disable-line
    // @TODO: промис может быть в процессе резрешения

    const { session, sessions } = this.authStore;

    const js = this.authStore.toJS();
    // console.log({ session, sessions, js});
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('lsk.auth.sessions', JSON.stringify(sessions));
    }

    // DEBUG && console.log('AuthStore.setUserAndToken', res);  //eslint-disable-line
    if (session.token || session.user) {
      if (session.token) {
        await this.setToken(session.token);
      }
      if (session.user && session.user._id) {
        await this.setUser(session.user);
      }
    } else {
      await this.setUser(null);
      await this.setToken(null);
    }

    // try {
    //   await this.app.reconnect();
    // } catch (err) {
    //   console.error('AuthStore.applyPromise: this.app.reconnect', err);  //eslint-disable-line
    // }

    // return res;
  }

  isAuthAsync() {
    DEBUG && console.log('AuthStore.isAuthAsync', this.promise);  //eslint-disable-line
    if (!this.promise) return this.isAuth();
    return this.promise.then(() => this.isAuth()).catch(() => this.isAuth());
  }

  isAuth() {
    return !!(this.authStore && this.authStore.session);
    return !!(this.app.rootState && this.app.rootState.token && this.app.rootState.user && this.app.rootState.user._id);
  }

  logout(dontSaveCookies = false, redirect = true) {
    DEBUG && console.log('AuthStore.logout!');  //eslint-disable-line
    this.setToken(null, 365, !dontSaveCookies);
    this.setUser(null);
    if (__CLIENT__) {
      localStorage.clear();
    }
    if (redirect) {
      if (__CLIENT__) window.location = '/';
      this.app.redirect('/');
      // this.setUserAndToken({});
    }
  }

  setData(...args) {
    return this.authStore.setData(...args);
  }
  signup(...args) {
    return this.authStore.signup(...args);
  }

  async silent(...args) {
    await this.authStore.authSilent(...args);
    return this.saveStore();
  }

  async signupAndLogin(...args) {
    await this.authStore.signup(...args);
    return this.saveStore();
  }

  async login(...args) {
    console.log('login @@@');

    await this.authStore.login(...args);
    return this.saveStore();
  }

  recovery(...args) {
    return this.authStore.authRecovery(...args);
  }

  restorePassword({ email }) {
    return this.api.fetch('/api/module/auth/restorePasswordPermit', {
      method: 'POST',
      body: { email },
    });
  }
  setPassword({ code, password }) {
    return this.api.fetch('/api/module/auth/confirmPassword', {
      method: 'POST',
      body: { code, password },
    });
  }

  loginPassport(data) {
    return this.applyPromiseAndFetchProfile(this.api.authLoginPassport(data));
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
