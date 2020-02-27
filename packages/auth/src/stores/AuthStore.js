/* eslint-disable max-classes-per-file */
import { observable } from 'mobx';
import Api from '@lskjs/mobx/stores/Api';
import Store from '@lskjs/mobx/stores/Store';

export class AuthApi extends Api {
  base = '/api/auth';
  login(data) {
    return this.fetch(`${this.base}/login`, {
      method: 'POST',
      data,
    });
  }
  signup(data) {
    return this.fetch(`${this.base}/signup`, {
      method: 'POST',
      data,
    });
  }
  silent(data) {
    return this.fetch(`${this.base}/silent`, {
      method: 'POST',
      data,
    });
  }
  setData(data) {
    return this.fetch(`${this.base}/setData`, {
      method: 'POST',
      data,
    });
  }
  check(data) {
    return this.fetch(`${this.base}/check`, {
      method: 'POST',
      data,
    });
  }
  restore(data) {
    return this.fetch(`${this.base}/restore`, {
      method: 'POST',
      data,
    });
  }
  status(data) {
    return this.fetch(`${this.base}/status`, {
      method: 'POST',
      data,
    });
  }
  info(data) {
    return this.fetch(`${this.base}/info`, {
      method: 'POST',
      data,
    });
  }

  // async getUser(body) {
  //   const res = await this.fetch('/api/module/user/get', {
  //     method: 'POST',
  //     body,
  //   });
  //   return res.data;
  // }

  // async getMyUser(body) {
  //   // }
  //   const res = await this.fetch('/api/user/me', {
  //     method: 'POST',
  //     body,
  //   });
  //   return res.data;
  // }

  // async userEdit(body) {
  //   const res = await this.fetch('/api/module/user/edit', {
  //     method: 'POST',
  //     body,
  //     qs: { _id: body._id },
  //   });
  //   return res;
  // }

  // async loginPassport(data) {
  //   const res = await this.fetch(`${this.base}/social/login`, {
  //     method: 'POST',
  //     data,
  //   });
  //   return res.data;
  // }
}

export default uapp =>
  class AuthStore extends Store {
    static api = new AuthApi({ uapp });
    @observable session = null;
    @observable sessions = [];
    // @computed isAuth() {
    // }
    async applySession({ user, token }) {
      let session = this.sessions.filter(s => s._id === user._id)[0];
      if (session) {
        session.token = token;
        session.user = user;
      } else {
        session = {
          _id: user._id,
          user,
          token,
        };
        this.sessions.push(session);
      }
      this.session = session;
      // if (!this.session) this.session = session;
    }
    async login(props) {
      const session = await this.constructor.api.login(props);
      this.applySession(session);
      return session;
    }
    async signup(props) {
      const session = await this.constructor.api.signup(props);
      this.applySession(session);
      return session;
    }
    async logout() {
      this.sessions = this.sessions.filter(s => s._id !== this.session._id);
      // eslint-disable-next-line prefer-destructuring
      this.session = this.sessions[0];
    }
  };
