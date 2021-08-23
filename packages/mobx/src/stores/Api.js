import Err from '@lskjs/err';
import Module from '@lskjs/module';

export class Api extends Module {
  transformResponse(raw) {
    let res;
    try {
      res = JSON.parse(raw);
    } catch (err) {
      throw new Err(`API_INVALID_JSON`, err);
    }
    if (res.code) throw new Err(res);
    if (res.count && Array.isArray(res.data)) res.data.count = res.count;
    return res.data;
  }
  async init() {
    await super.init();
    const api = await this.app.module('api');
    this.client = await api.createClient({
      baseURL: this.baseURL || this.base || '/api',
      transformResponse: [this.transformResponse.bind(this)],
    });
    this.client.interceptors.request.use(
      (config) => {
        // if (this.debug) 
        this.log.trace('[api]', 'req', config.baseURL, config.url, config.data);
        console.log({config})
        return config;
      },
      (err) => {
        // if (this.debug) 
        this.log.error('[api]', 'req err');
        return Promise.reject(err);
      },
    );
  }
  fetch(...args) {
    this.log.trace('[api] fetch', this.client.fetch, ...args);
    if (this.client.fetch) return this.client.fetch(...args);
    return this.client.request(...args);
  }
}

export default Api;
