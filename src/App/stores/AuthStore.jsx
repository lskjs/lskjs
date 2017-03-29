import { computed, action } from 'mobx';
import cookie from 'react-cookie';

export default class AuthStore {

  token = null;
  promise = null;

  constructor(store, data) {
    this.store = store;
    this.data = data;
    this.authenticate();
  }

  authenticate() {
    if (__CLIENT__) return this.authOnClient();
    if (__SERVER__) return this.authOnServer();
    return null;
  }

  authOnServer() {
    if (!this.isErrorJWT && this.isToken && this.isUser) {
      this.setToken(this.data.state.token);
      this.updateUser(this.data.state.user);
    } else {
      this.logout();
    }
  }

  authOnClient() {
    if (this.isToken && this.isUser) {
      this.setToken(cookie.load('token'));
      this.updateUser(this.data.state.user);
    } else {
      this.logout();
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

  async checkAuthData() {
    if (!this.isToken || !this.isUser) {
      await this.logout();
      return false;
    }
    return true;
  }

  async logout() {
    await this.unsetToken();
    this.updateUser();
  }

  async unsetToken() {
    await this.store.api.setAuthToken(null);
    this.data.state.token = null;
    cookie.remove('token', { path: '/' });
    this.token = null;
  }

  async setToken(token) {
    this.store.api.setAuthToken(token);
    this.data.state.token = token;
    cookie.save('token', token, { path: '/' });
    this.token = token;
  }

  async writeResponse() {
    this.store.log.info('[Y] promise', this.promise);
    const res = await this.promise;
    this.store.log.info('[Y] res', res);
    this.store.ui.status(res.code);
    await this.setToken(res.token);
    await this.updateUser(res.user);
    return res;
  }

  async init(data) {
    this.promise = this.store.api.getUser(data);
    const user = await this.promise;
    this.store.user.update(user);
  }

  @action
  async signup(data) {
    this.store.ui.status('wait');
    this.promise = this.store.api.authSignup(data);
    await this.writeResponse();
  }

  @action
  async login(data) {
    this.store.ui.status('wait');
    this.promise = this.store.api.authLogin(data);
    const res = await this.writeResponse();
    return res;
  }

  @action
  async recovery(data) {
    this.store.ui.status('wait');
    this.promise = this.store.api.authRecovery(data);
    const res = await this.promise;
    this.store.ui.status(res.code);
  }

  @action
  authPassport(provider) {
    window.location = `/api/v1/auth/${provider}`;
  }

  @action
  async signupPassport(params) {
    this.store.log.info('signupPassport');
    this.store.ui.status('wait');
    this.promise = this.store.api.authSignupPassport(params);
    await this.writeResponse();
  }

  @action
  async loginPassport(params) {
    if (__CLIENT__) {
      this.store.log.info('loginPassport');
      this.store.ui.status('wait');
      this.promise = this.store.api.authLoginPassport(params);
      await this.writeResponse();
      return true;
    }
  }

  async updateUser(data = null) {
    this.data.state.user = data;
    if (this.store.user) {
      this.store.user.update(data);
    }
  }

  @computed get isAuth() {
    return !!this.store.user._id;
  }

  @computed get isErrorJWT() {
    return this.data.req._errJwt;
  }

  @computed get isToken() {
    return !!this.data.state.token || !!cookie.load('token');
  }

  @computed get isUser() {
    return this.data.state.user && this.data.state.user._id;
  }

}
