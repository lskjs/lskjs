import { action } from 'mobx';
import cookie from 'js-cookie';

export default class AuthStore {

  token = null;
  promise = null;

  constructor(store, data) {
    this.store = store;
    this.data = data;
    this.authenticate();
  }

  authenticate() {
    if (__CLIENT__) {
      if (this.isToken && this.isUser) {
        this.setToken(cookie.get('token'));
        this.updateUser(this.data.state.user);
      }
    }
    if (__SERVER__) {
      if (!this.isErrorJWT && this.isToken && this.isUser) {
        this.setToken(this.data.state.token);
        this.updateUser(this.data.state.user);
    }
    }
  }

  isAuthAsync() {
    if (this.isToken) {
      return this.promise
        .then(() => !!this.isAuth)
        .catch(() => !!this.isAuth) || false;
    }
    return false;
  }

  async logout() {
    await this.unsetToken();
    this.updateUser();
  }

  updateUser(data = null) {
    this.data.state.user = data;
    if (this.store.user) {
      this.store.user.update(data);
    }
  }

  unsetToken() {
    if (__CLIENT__) cookie.remove('token');
    this.store.api.setAuthToken(null);
    this.data.state.token = null;
    this.token = null;
  }

  setToken(token) {
    if (__CLIENT__) cookie.set('token', token);
    this.store.api.setAuthToken(token);
    this.data.state.token = token;
    this.token = token;
  }

  async writeResponse() {
    this.store.log.info('[Y] promise', this.promise);
    const res = await this.promise;
    this.store.log.info('[Y] response', res);
    this.setToken(res.token);
    this.updateUser(res.user);
    return res;
  }

  async init(data) {
    this.promise = this.store.api.getUser(data);
    const user = await this.promise;
    this.store.user.update(user);
  }

  @action
  async signup(data) {
    this.promise = this.store.api.authSignup(data);
    await this.writeResponse();
  }

  @action
  async login(data) {
    this.promise = this.store.api.authLogin(data);
    const res = await this.writeResponse();
    return res;
  }

  @action
  async recovery(data) {
    this.promise = this.store.api.authRecovery(data);
    await this.promise;
  }

  @action
  authPassport(provider) {
    window.location = `/api/v1/auth/${provider}`;
  }

  @action
  async signupPassport(params) {
    this.store.log.info('signupPassport');
    this.promise = this.store.api.authSignupPassport(params);
    await this.writeResponse();
  }

  @action
  async loginPassport(params) {
    if (__CLIENT__) {
      this.store.log.info('loginPassport');
      this.promise = this.store.api.authLoginPassport(params);
      await this.writeResponse();
      return true;
    }
  }

  get isAuth() {
    return !!this.store.user._id;
  }

  get isErrorJWT() {
    return this.data.req._errJwt;
  }

  get isToken() {
    return !!this.data.state.token || !!cookie.get('token');
  }

  get isUser() {
    return this.data.state.user && this.data.state.user._id;
  }

}
