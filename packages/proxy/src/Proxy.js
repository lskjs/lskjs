import pick from 'lodash/pick';
import inc from '@lskjs/utils/inc';
import avg from '@lskjs/utils/avg';
import EventEmitter from 'events';
import { getProxyAgent } from './getProxyAgent';

export class Proxy {
  constructor(props = {}) {
    Object.assign(this, props);
    this.ee = new EventEmitter();
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
    inc(this.stats, 'get');
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
    inc(this.stats, 'get');
    // lib
    if (this.provider === 'localhost') return {};
    const httpsAgent = getProxyAgent(this);
    return {
      httpsAgent,
      httpAgent: httpsAgent,
    };
  }
  emit(...args) {
    this.ee.emit(...args);
  }
  on(...args) {
    this.ee.on(...args);
  }
  stats = {};
  feedback(props = {}) {
    const { status = 'unknown', err, time } = props;
    inc(this.stats, 'count');
    inc(this.stats, 'time', time);
    avg(this.stats, `statuses.${status}`, time);
    if (err) {
      avg(this.stats, `errors.${err}`, time);
    }
    this.emit('feedback', props, this);
  }
}

export default Proxy;
