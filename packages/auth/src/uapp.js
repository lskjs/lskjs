import cookie from 'js-cookie';
import AuthApi from './uapp/AuthApi';

const DEBUG = __DEV__ && false;


export default class AuthModule {
  constructor(app) {
    this.uapp = app;
    this.app = app;
    this.Api = AuthApi;
    this.api = new AuthApi(this.app);
  }

  qwe = 123;
  init() {
    this.stores = require('./uapp/stores').default(this.app);
  }

  async initAuth() {
    const res = this.getUserAndTokenFromRootState();
    DEBUG && console.log('AuthStore.init res', res);  //eslint-disable-line

    this.setUserAndToken(res);
    await this.initUserProfile();
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
      if (
        this.uapp.rootState.token
        && !(this.uapp.rootState.user && this.uapp.rootState.user.profile)
      ) {
        this.applyPromise(this.findUserProfile());
      }
    } else if (
      this.uapp.rootState.token
        && !(this.uapp.rootState.user && this.uapp.rootState.user.profile)
    ) {
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
      .catch((err) => {
        this.uapp.log.error(err);
        throw err;
      });
  }

  setToken(token, expires = 365, cookies = true) {
    DEBUG && console.log('AuthStore.setToken', token);  //eslint-disable-line
    this.uapp.api.setAuthToken(token);
    this.uapp.rootState.token = token;
    if (__CLIENT__ && cookies) {
      if (token == null) {
        cookie.remove('token');
      } else {
        cookie.set('token', token, { expires });
      }
    }
  }

  setUser(user = null) {
    DEBUG && console.log('AuthStore.setUser', user);  //eslint-disable-line
    this.uapp.rootState.user = user;
    // this.uapp.resetState();
    if (this.uapp.user) {
      if (user) {
        this.uapp.user.setState(user);
      } else {
        this.uapp.user.reset();
      }
    }
  }

  async setUserAndToken(res = {}) {
    DEBUG && console.log('AuthStore.setUserAndToken', res);  //eslint-disable-line
    if (res.token || res.user) {
      if (res.token) {
        await this.setToken(res.token);
      }
      if (res.user && res.user._id) {
        await this.setUser(res.user);
      }
    } else {
      await this.setUser(null);
      await this.setToken(null);
    }
  }

  getUserAndTokenFromRootState() {
    // DEBUG && console.log('AuthStore.getUserAndToken');  //eslint-disable-line
    const res = {};
    if (this.uapp.rootState) {
      if (this.uapp.rootState.token) {
        res.token = this.uapp.rootState.token;
      }
      if (this.uapp.rootState.user) {
        res.user = this.uapp.rootState.user;
      }
    }
    if (!res.token && cookie.get('token')) {
      res.token = cookie.get('token');
    }
    // DEBUG && console.log('AuthStore.getUserAndTokenFromRootState', res);  //eslint-disable-line
    return res;
  }

  async applyPromiseAndFetchProfile(promise) {
    const res = await this.applyPromise(promise);
    // if (__CLIENT__) {
    //   await this.applyPromise(this.findUserProfile());
    // }
    return res;
  }

  async applyPromise(promise) {
    DEBUG && console.log('AuthStore.applyPromise @@@1', promise);  //eslint-disable-line
    // @TODO: промис может быть в процессе резрешения
    this.promise = promise;
    let res;
    try {
      res = await this.promise;
      DEBUG && console.log('AuthStore.applyPromise @@@2 - result', res);  //eslint-disable-line
      await this.setUserAndToken(res);
      try {
        await this.uapp.reconnect();
      } catch (err) {
        console.error('AuthStore.applyPromise: this.uapp.reconnect', err);  //eslint-disable-line
      }
    } catch (err) {
      DEBUG && console.log('AuthStore.applyPromise ERR', err);  //eslint-disable-line
      this.logout(false, false);
      throw err;
    }
    return res;
  }

  isAuthAsync() {
    DEBUG && console.log('AuthStore.isAuthAsync', this.promise);  //eslint-disable-line
    if (!this.promise) return this.isAuth();
    return this.promise
      .then(() => this.isAuth())
      .catch(() => this.isAuth());
  }

  isAuth() {
    return !!(this.uapp.rootState && this.uapp.rootState.token && this.uapp.rootState.user && this.uapp.rootState.user._id);
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
      return this.uapp.redirect('/');
      // this.setUserAndToken({});
    }
  }

  silent(data) {
    return this.applyPromiseAndFetchProfile(
      this.api.authSilent(data),
    );
  }

  setData(...args) {
    return this.api.setData(...args);
  }
  signup(data) {
    return this.api.signup(data);
  }
  signupAndLogin(data, params) {
    return this.applyPromiseAndFetchProfile(
      this.api.signup(data),
      params,
    );
  }

  login(data) {
    return this.applyPromiseAndFetchProfile(
      this.api.login(data),
    );
  }

  recovery(data) {
    return this.api.authRecovery(data);
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
    return this.applyPromiseAndFetchProfile(
      this.api.authLoginPassport(data),
    );
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
