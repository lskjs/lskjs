import avg from '@lskjs/utils/avg';
import inc from '@lskjs/utils/inc';
import EventEmitter from 'events';
import pick from 'lodash/pick';

import { createKey } from './utils/createKey';
import { createUri } from './utils/createUri';
import { getIpv } from './utils/getIpv';
import { getProxyAgent } from './utils/getProxyAgent';

export class Proxy {
  constructor(props = {}) {
    Object.assign(this, props);
    if (!this.key) this.key = this.getKey();
    if (!this.uri) this.uri = this.getUri();
    if (!this.tags?.ipv && this.ip) {
      if (!this.tags) this.tags = {};
      this.tags.ipv = getIpv(this.ip);
    }
    this.ee = new EventEmitter();
  }
  getState() {
    // const ipv = getIpv(ip);
    return {
      // TODO: migrate provider to tags
      // TODO: think abount ip placement
      ...pick(this, ['type', 'host', 'port', 'user', 'password', 'provider', 'ip', 'tests', 'targets']), // , 'uri', 'key'
      tags: {
        ...this.tags,
      },
      key: this.getKey(),
      uri: this.getUri(),
    };
  }
  toObject() {
    return this.getState();
  }
  toJSON() {
    return this.getState();
  }
  getJson() {
    return this.getState();
  }
  getUrl() {
    return this.getUri();
  }
  getUri() {
    if (this.provider === 'localhost') return null;
    if (this.uri) return this.uri;
    return createUri(this);
  }
  getKey() {
    if (this.provider === 'localhost') return 'localhost';
    return createKey(this);
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
    inc(this.stats, 'get');
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
    const { status = 'unknown', err, time, fatal } = props;
    inc(this.stats, 'count');
    inc(this.stats, 'time', time);
    avg(this.stats, `statuses.${status}`, time);
    if (fatal) inc(this.stats, 'fatal');
    if (err) avg(this.stats, `errors.${err}`, time);
    this.emit('feedback', props, this);
  }
}

export default Proxy;
