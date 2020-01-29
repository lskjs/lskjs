import Api from '@lskjs/mobx/stores/Api';

export default class AuthApi extends Api {
  // base = '/api/auth/session';
  base = '/api/auth';
  login(data) {
    return this.fetch(`${this.base}/login`, {
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
  signup(data) {
    return this.fetch(`${this.base}/signup`, {
      method: 'POST',
      data,
    });
  }

  validate(data) {
    return this.fetch(`${this.base}/validate`, {
      method: 'GET',
      data,
    });
  }

  recovery(data) {
    return this.fetch(`${this.base}/recovery`, {
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
    const res = await this.fetch(`${this.base}/social/login`, {
      method: 'POST',
      data,
    });
    return res.data;
  }
}
