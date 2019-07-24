import Api from '@lskjs/mobx/stores/Api';

export default class AuthApi extends Api {
  base = '/api/module/auth/session';
  login(data) {
    return this.fetch('/api/module/auth/login', {
      method: 'POST',
      data,
    });
  }
  silent(data) {
    return this.fetch('/api/module/auth/silent', {
      method: 'POST',
      data,
    });
  }
  setData(data) {
    return this.fetch('/api/module/auth/setData', {
      method: 'POST',
      data,
    });
  }
  signup(data) {
    return this.fetch('/api/module/auth/signup', {
      method: 'POST',
      data,
    });
  }

  validate(data) {
    return this.fetch('/api/module/auth/validate', {
      method: 'GET',
      data,
    });
  }

  recovery(data) {
    return this.fetch('/api/module/auth/recovery', {
      method: 'POST',
      data,
    });
  }

  async getUser(body) {
    const res = await this.fetch('/api/module/user/get', {
      method: 'POST',
      body,
    });
    return res.data;
  }

  async getMyUser(body) {
    // }
    const res = await this.fetch('/api/user/me', {
      method: 'POST',
      body,
    });
    return res.data;
  }

  async userEdit(body) {
    const res = await this.fetch('/api/module/user/edit', {
      method: 'POST',
      body,
      qs: { _id: body._id },
    });
    return res;
  }

  async loginPassport(data) {
    const res = await this.fetch('/api/module/auth/social/login', {
      method: 'POST',
      data,
    });
    return res.data;
  }
}
