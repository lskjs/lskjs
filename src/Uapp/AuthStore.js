import cookie from 'js-cookie';

export default class AuthStore {

  promise = null;

  constructor({ user, api, rootState, log }) {
    this.user = user;
    this.api = api;
    this.log = log;
    this.rootState = rootState || {};
  }

  init() {
    const res = this.getUserAndToken();
    this.log.trace('AuthStore.init res', res);
    this.setUserAndToken(res);
    this.initUserProfile();
  }

  initUserProfile() {
    if (
      this.rootState.token &&
      __CLIENT__ &&
      !(this.rootState.user && this.rootState.user.profile)
    ) {
      this.applyPromise(
        this.findUserProfile(),
      );
    }
  }


  async findUserProfile() {
    return this.api.getUser({ _id: this.user._id }).then(user => ({ user }));
  }


  setToken(token) {
    this.log.trace('AuthStore.setToken', token);
    this.api.setAuthToken(token);
    this.rootState.token = token;
    if (__CLIENT__) {
      if (token == null) {
        // this.log.trace('AuthStore cookie.remove');
        cookie.remove('token'/* , { path: '/' }*/);
      } else {
        // this.log.trace('AuthStore cookie.set', token);
        cookie.set('token', token/* , { path: '/' }*/);
      }
    }
  }

  setUser(user = null) {
    this.log.trace('AuthStore.setUser', user);
    this.rootState.user = user;
    if (this.user) {
      if (user) {
        this.user.update(user);
      } else {
        this.user.reset();
      }
    }
  }

  setUserAndToken(res = {}) {
    this.log.trace('AuthStore.setUserAndToken', res);
    if (res.token || res.user) {
      if (res.token) {
        this.setToken(res.token);
      }
      if (res.user && res.user._id) {
        this.setUser(res.user);
      }
    } else {
      this.setToken(null);
      this.setUser(null);
    }
  }

  getUserAndToken() {
    this.log.trace('AuthStore.getUserAndToken');
    const res = {};
    if (this.rootState) {
      if (this.rootState.token) {
        res.token = this.rootState.token;
      }
      if (this.rootState.user) {
        res.user = this.rootState.user;
      }
    }
    if (!res.token && cookie.get('token')) {
      res.token = cookie.get('token');
    }
    return res;
  }

  async applyPromise(promise) {
    this.log.trace('AuthStore.applyPromise');
    // @TODO: промис может быть в процессе резрешения
    this.promise = promise;
    const res = await this.promise;
    this.setUserAndToken(res);
    return res;
  }

  isAuthAsync() {
    this.log.trace('AuthStore.isAuthAsync');
    if (!this.promise) return false;
    return this.promise
      .then(() => this.isAuth())
      .catch(() => this.isAuth());
  }

  isAuth() {
    return !!(this.rootState && this.rootState.token && this.rootState.user && this.rootState.user._id);
  }


  logout() {
    this.log.trace('AuthStore.logout');
    this.setUserAndToken({});
  }

  signup(data) {
    return this.applyPromise(
      this.api.authSignup(data),
    );
  }

  login(data) {
    return this.applyPromise(
      this.api.authLogin(data),
    );
  }

  recovery(data) {
    return this.applyPromise(
      this.api.authRecovery(data),
    );
  }

  signupPassport(data) {
    return this.applyPromise(
      this.api.authSignupPassport(data),
    );
  }

  loginPassport(data) {
    return this.applyPromise(
      this.api.authLoginPassport(data),
    );
  }

  authPassport(provider) {
    window.location = `/api/v1/auth/${provider}`;
  }

}
