import { pick } from 'lodash';
import { getProxyAgent } from './getProxyAgent';

export class Proxy {
  constructor(props = {}) {
    Object.assign(this, props);
  }
  getState() {
    return pick(this, ['host', 'port', 'user', 'password', 'type', 'provider', 'ip', 'tags', 'uri', 'key']);
  }
  getUrl() {
    return this.getUri();
  }
  getUri() {
    if (this.provider === 'localhost') return null;
    return this.uri;
    // return [
    //   [this.user, this.password].filter(Boolean).join(':'),
    //   [this.host, this.port].filter(Boolean).join(':'),
    // ].filter(Boolean).join('@');
  }
  getOptions() {
    const proxy = {
      host: this.host,
      port: this.port,
    };
    if (this.user && this.password) {
      proxy.auth = {
        username: this.user,
        password: this.password,
      };
    }
    return proxy;
  }
  getAgent() {
    if (this.provider === 'localhost') return null;
    return getProxyAgent(this);
  }
  getProviderOptions() {
    // lib
    if (this.provider === 'localhost') return {};
    const httpsAgent = getProxyAgent(this);
    return {
      httpsAgent,
      httpAgent: httpsAgent,
    };
  }
}

export default Proxy;
