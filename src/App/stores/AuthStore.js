import cookie from 'js-cookie';

export default class AuthStore {

  promise = null;

  constructor({ user, api, rootState, log }) {
    this.user = user;
    this.api = api;
    this.log = log;
    this.rootState = rootState;
  }

  authenticate(res) {
    // @TODO: подумать
    if (res.token && res.user && res.user._id) {
      this.setToken(res.token);
      this.setUser(res.user);
      return true;
    }
    return false;
  }

  async setToken(token) {
    this.api.setAuthToken(token);
    this.rootState.token = token;
    if (__CLIENT__) {
      if (token == null) {
        this.log.trace('AuthStore cookie.remove');
        cookie.remove('token'/* , { path: '/' }*/);
      } else {
        this.log.trace('AuthStore cookie.set', token);
        cookie.set('token', token/* , { path: '/' }*/);
      }
    }
  }

  async setUser(user = null) {
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

  async init(data) {
    this.promise = this.api.getUser(data);
    const user = await this.promise;
    this.user && this.user.update(user);
  }

  isAuthAsync() {
    if (!this.promise) return false;
    return this.promise
      .then(() => !!this.isAuth())
      .catch(() => !!this.isAuth());
  }

  isAuth() {
    return !!(this.rootState && this.rootState.token && this.rootState.user && this.rootState.user._id);
  }

  async applyPromise(promise) {
    // @TODO: промис может быть в процессе резрешения
    // this.log.info('[Y] promise', promise);
    this.promise = promise;
    const res = await this.promise;
    // this.log.info('[Y] res', res);
    await this.setToken(res.token);
    await this.setUser(res.user);
    return res;
  }

  logout() {
    this.log.trace('AuthStore.logout');
    this.setToken(null);
    this.setUser(null);
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
