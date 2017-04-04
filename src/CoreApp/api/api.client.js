import ApiClientBase from './ApiClientBase';

export default class ApiClient extends ApiClientBase {
  authLogin(data) {
    return this.fetch('auth/login', {
      method: 'POST',
      body: data,
    });
  }

  authSignup(data) {
    return this.fetch('auth/signup', {
      method: 'POST',
      body: data,
    });
  }

  authValidate(data) {
    return this.fetch('auth/validate', {
      method: 'GET',
      body: data,
    });
  }

  authRecovery(data) {
    return this.fetch('auth/recovery', {
      method: 'POST',
      body: data,
    });
  }

  getUser(id) {
    return this.fetch(`user/${id}`, {
      method: 'GET',
    });
  }
}
