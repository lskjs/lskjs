import axios from 'axios';

export default class Apiq {
  config = {};
  instance = axios;
  constructor(props) {
    Object.assign(this, props);
    this.init();
  }
  init() {
    this.instance = axios.create(this.config);
  }
  setToken(token) {
    this.instance.defaults.headers.common.Authorization = token;
  }
  setAuthToken(token) {
    this.setToken(token);
  }
  fetch(...args) {
    return this.instance(...args);
  }
  request(...args) {
    return this.instance.request(...args);
  }
  get(...args) {
    return this.instance.get(...args);
  }
  delete(...args) {
    return this.instance.delete(...args);
  }
  head(...args) {
    return this.instance.head(...args);
  }
  options(...args) {
    return this.instance.options(...args);
  }
  post(...args) {
    return this.instance.post(...args);
  }
  put(...args) {
    return this.instance.put(...args);
  }
  patch(...args) {
    return this.instance.patch(...args);
  }
  all(...args) {
    return this.instance.all(...args);
  }
  spread(...args) {
    return this.instance.spread(...args);
  }
}

// const url = get(this.config.apiConfig, 'url', __CLIENT__ ? '/' : `http://127.0.0.1:${this.app.config.port}`);
// const api = new this.Api({
//   ...apiConfig,
//   url,
// });
// const { app } = this;
// if (__SERVER__ && app) {
//   wrapApi({ api, app });
// }
// return api;
