import axios from 'axios';
import countBy from 'lodash/countBy';
import sample from 'lodash/sample';
import get from 'lodash/get';
import Err from '@lskjs/utils/Err';
import Module from '@lskjs/module';
import { Mutex } from './utils/Mutex';
import { getProxyAgent } from './getProxyAgent';
import { Proxy } from './Proxy';

export const filterFn = (proxy, filter) => {
  if (filter.ignoreKeys && filter.ignoreKeys.includes(get(proxy, 'key'))) return false;
  if (filter.key && get(proxy, 'key') !== filter.key) return false;
  if (filter.provider && get(proxy, 'provider') !== filter.provider) return false;
  if (filter.type && get(proxy, 'type') !== filter.type) return false;
  if (filter.country && get(proxy, 'tags.country') !== filter.country) return false;
  if (filter.ipv && get(proxy, 'tags.ipv') !== filter.ipv) return false;
  if (filter.comment && get(proxy, 'tags.comment') !== filter.comment) return false;
  return true;
};

export class ProxyManager extends Module {
  async init() {
    await super.init();
    this.log.trace('proxyHub', this.url);
    this.mutex = new Mutex();
  }
  async getLocalhostProxy() {
    return new Proxy({ provider: 'localhost' });
  }
  async getProxy(filter) {
    if (this.disabled) return null;
    if (!this.list) this.list = await this.getCachedProxyHubProxyList();
    let { list } = this;
    if (filter) {
      list = list.filter((proxy) => filterFn(proxy, filter));
    }
    return sample(list);
  }
  getProxyHubBaseUrl(proxyServer) {
    return this.url;
  }
  async requestProxyHub({ params, ...axiosParams }) {
    const props = {
      baseURL: this.getProxyHubBaseUrl(),
      params: { ...this.options, ...params },
      ...axiosParams,
      timeout: 5000,
    };
    this.log.debug('requestProxyHub >>', props.baseURL, props.params);
    const { data } = await axios(props);
    this.log.trace('requestProxyHub <<', data.data.length);

    return data;
  }
  async getProxyHubProxyList(params) {
    try {
      const { data: proxies } = await this.requestProxyHub({
        url: 'list',
        params,
      });
      if (!proxies) {
        throw new Err('PROXY_HUB_NOT_FOUND_PROXY');
      }
      return proxies.map(
        (props) =>
          new Proxy({
            manager: this,
            ...props,
          }),
      );
    } catch (err) {
      this.log.error('PROXY_HUB_ERROR', err);
      throw new Err('PROXY_HUB_ERROR', { err });
    }
  }
  /**
   * может быть 4 ситуации
   *
      0 - list
      1 - new, list
      2 - locked, wait, !list
      3 - locked, wait, list
   */
  async getCachedProxyHubProxyList() {
    if (this.list) return this.list;
    if (this.mutex.isLocked()) {
      await this.mutex.isAsyncLocked(10000);
      if (this.list) return this.list;
      throw new Err('PROXY_HUB_TIMEOUT');
    }
    const release = await this.mutex.acquire();
    try {
      this.list = await this.getProxyHubProxyList();
    } finally {
      release();
    }
    return this.list;
  }

  recounts = 0;
  recountProbability() {
    this.log.trace('recountProbability');
    this.recounts += 1;
  }
  async sendFeedbackToHub() {
    this.log.trace('sendFeedbackToHub');
  }
  async saveFeedback() {
    // this.debug = DEBUG_PROXY;
    if (this.debug) {
      await this.saveFileFeedback();
    }
    await this.sendFeedbackToHub();
  }
  async saveFileFeedback() {
    this.log.trace('saveFileFeedback');
    // if (!(proxies && proxies.length)) {
    //   this.log.trace('!proxies');
    //   return;
    // }
    // const dataJson = JSON.stringify(sortBy(proxies, p => -get(p, 'info.probability', 0)), null, 2);
    // await writeFile(`/tmp/parser/${hostname()}-proxies.json`, dataJson, { debug: true }).catch(() => null);
    // const sortedProxies = sortBy(proxies, p => -get(p, 'info.probability', 0));
    // const data = objects2csv(sortedProxies.map(p => ({
    //   key: get(p, 'key'),
    //   country: get(p, 'meta.country'),
    //   provider: get(p, 'meta.provider'),
    //   success: get(p, 'info.success', 0),
    //   error: get(p, 'info.error', 0),
    //   errorCodes: map(get(p, 'info.errorCodes'), (val, key) => [key, val].join(':')).join(' '),
    //   requests: get(p, 'info.success', 0) + get(p, 'info.error', 0),
    //   time: get(p, 'info.time.avg', 0),
    //   kpd: get(p, 'info.kpd', 0),
    //   probability: get(p, 'info.probability', 0),
    // })));
    // await writeFile(`/tmp/parser/${hostname()}-proxies.txt`, data, { debug: true }).catch(() => null);
  }
  async stop() {
    await super.stop();
    if (this.interval) clearInterval(this.interval);
  }
  async tick() {
    this.log.trace('tick');
    // await super.recountProxyProbability();
    // await super.saveFeedback();
  }
  async update() {
    this.list = await this.getProxyHubProxyList();
    this.log.trace(`list updated summmary: ${this.list.length}`, countBy(this.list, 'provider'));
  }

  async run() {
    await super.run();
    this.update();
    this.interval = setInterval(() => this.update(), 120000);
  }

  getProxyAgent(proxy) {
    return getProxyAgent(proxy);
  }
}

export default ProxyManager;
