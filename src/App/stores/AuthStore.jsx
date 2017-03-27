import { computed, action } from 'mobx';
import cookie from 'react-cookie';

export default class AuthStore {

  token = null;

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
      this.setToken(this.data.req.token);
      this.updateUser(this.data.req.user);
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
    cookie.remove('token', { path: '/' });
    this.token = null;
  }

  async setToken(token) {
    this.store.api.setAuthToken(token);
    cookie.save('token', token, { path: '/' });
    this.token = token;
  }

  @action
  async signup(data) {
    this.store.ui.status('wait');
    const res = await this.store.api.authSignup(data);
    this.store.ui.status(res.code);
    await this.setToken(res.token);
    await this.updateUser(res.user);
  }

  @action
  async login(data) {
    this.store.ui.status('wait');
    const res = await this.store.api.authLogin(data);
    this.store.ui.status(res.code);
    await this.setToken(res.token);
    await this.updateUser(res.user);
    return res;
  }

  @action
  async recovery(data) {
    this.store.ui.status('wait');
    const res = await this.store.api.authRecovery(data);
    this.store.ui.status(res.code);
  }

  @action
  authPassport(provider) {
    window.location = `/api/v1/auth/${provider}`;
  }

  @action
  async signupPassport(data, { p }) {
    console.log('signupPassport');
    this.store.ui.status('wait');
    const res = await this.store.api.authSignupPassport({ ...data, p });
    this.store.ui.status(res.code);
    await this.setToken(res.token);
    await this.updateUser(res.user);
  }

  @action
  async loginPassport(data, { p }) {
    if (__CLIENT__) {
      console.log('loginPassport');
      this.store.ui.status('wait');
      const res = await this.store.api.authLoginPassport({ ...data, p });
      console.log({ res })
      this.store.ui.status(res.code);
      await this.setToken(res.token);
      await this.updateUser(res.user);
      return true
    }
  }

  async updateUser(data = null) {
    if (this.store.user) {
      this.store.user.update(data);
    }
  }

  @computed get isAuth() {
    return this.store.user._id;
  }

  @computed get isErrorJWT() {
    return this.data.req._errJwt;
  }

  @computed get isToken() {
    return this.data.req.token !== 'undefined' || !this.data.req.token || cookie.load('token');
  }

  @computed get isUser() {
    return this.data.req.user && this.data.req.user._id || this.data.state.user && this.data.state.user._id;
  }

}
