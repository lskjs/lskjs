import { observable } from 'mobx';
import cookie from 'react-cookie';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import User from './User';

export default class AuthStore {
  constructor(app) {
    this.app = app;
  }

  @observable token = null
  @observable user = null
  @observable isAuth = null


  @autobind
  init(data) {
    // console.log('AuthStore.init', data);
    if (data.token === 'undefined' || !data.token || !data.user || !data.user._id)  {
      this.logout();
      return null;
    }
    this.save(data)
    // const token = cookie.load('authToken')
    // if (token) {
    //   this.promise = this.login({token}).catch(err => {
    //     console.log('AuthStore.init', err);
    //     return {}
    //   })
    // } else {
    //   this.promise = Promise.resolve()
    // }
    // return {}
  }


  promise = null
  isAuthAsync() {
    return this.promise
    .then(() => !!this.isAuth)
    .catch(() => !!this.isAuth);
  }

  async signup(data) {
    this.promise = this.app.api.authSignup(data);
    const res = await this.promise;
    await this.save(res);
    return res;
  }

  async login(data) {
    this.promise = this.app.api.authLogin(data);
    const res = await this.promise;
    await this.save(res);
    return res;
  }

  async recovery(data) {
    this.promise = this.app.api.authRecovery(data);
    const res = await this.promise;
    return res;
  }

  async logout() {
    cookie.remove('token');
    // console.log('logout', cookie.get('token'));
    this.app.api.setAuthToken(null);
    this.user = null;
    this.token = null;
    this.isAuth = null;
    this.app.update();
  }

  async save(data) {
    // console.log('Auth.save', data);
    if (data.token === 'undefined' || !data.token || !data.user || !data.user._id)  {
      this.logout();
      return null;
    }
    cookie.save('token', data.token);
    this.app.api.setAuthToken(data.token);

    if (this.user) {
      this.user.set(data.user);
    } else {
      this.user = new User(data.user);
    }

    this.token = data.token;
    this.isAuth = true;
    this.app.update();
  }

}
