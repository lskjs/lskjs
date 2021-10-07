import { isDev } from '@lskjs/env';
import Err from '@lskjs/err';
import Module from '@lskjs/module';
import Mutex from '@lskjs/mutex';
import avg from '@lskjs/utils/avg';
import inc from '@lskjs/utils/inc';
import axios from 'axios';
import countBy from 'lodash/countBy';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import map from 'lodash/map';

import { getProxyAgent } from './getProxyAgent';
import { Proxy } from './Proxy';
import strategies from './strategies';
import { parseProxyParam } from './utils/parseProxyParam';

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

const debug = false; /// __DEV__;

export class ProxyManager extends Module {
  config = {
    stats: isDev,
    updateInterval: debug ? 5 * 60 * 1000 : 10 * 60 * 1000,
    statsInterval: debug ? 10 * 1000 : 3 * 60 * 1000,
    strategy: 'linear',
  };
  strategies = strategies;
  static parseProxyParam = parseProxyParam;
  async init() {
    await super.init();
    if (!this.strategy) {
      let strategy = this.config.strategy || 'random';
      if (!this.strategies[strategy]) strategy = 'random';
      this.log.warn('setDefaultStratefy', strategy);
      this.strategy = this.strategies[strategy];
      this.log.debug('use strategy', strategy);
    }
    const { strategy: Strategy } = this;
    if (this.url) {
      this.log.debug('proxyHub url', this.url);
    } else {
      this.log.warn('proxyHub !url');
    }
    if (this.proxies) {
      this.log.trace('proxies.length', this.proxies.length);
    }
    this.mutex = new Mutex();
    this.strategy = await Strategy.start({
      __parent: this,
      app: this.app,
      manager: this,
    });
  }
  static getLocalhostProxy() {
    return new Proxy({ provider: 'localhost' });
  }
  getLocalhostProxy() {
    return new Proxy({ provider: 'localhost' });
  }
  async getProxies(filter) {
    if (this.disabled) return [];
    if (!this.list) this.list = await this.getCachedProxyHubProxyList();
    let { list } = this;
    if (filter) list = list.filter((proxy) => filterFn(proxy, filter));
    return list;
  }
  async getProxy(...args) {
    if (this.disabled) return null;
    if (!this.list) this.list = await this.getCachedProxyHubProxyList();
    return this.strategy.getProxy(...args);
  }
  async requestProxyHub({ params, ...axiosParams }) {
    const props = {
      baseURL: this.url,
      params: { ...this.options, ...params },
      ...axiosParams,
      timeout: 5000,
    };
    if (this.debug) this.log.debug('requestProxyHub >>', props.baseURL, props.params);
    const { data } = await axios(props);
    if (this.debug) this.log.trace('requestProxyHub <<', data.data.length);

    return data;
  }
  async getProxyHubProxyList(params) {
    const wrapProxy = (props) =>
      new Proxy({
        manager: this,
        ...props,
      });
    if (!this.url) return (this.proxies || []).map(wrapProxy);
    try {
      const { data: proxies } = await this.requestProxyHub({
        url: 'list',
        params,
      });
      if (!proxies) {
        throw new Err('PROXY_HUB_NOT_FOUND_PROXY');
      }
      return proxies.map(wrapProxy);
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
  async stats() {
    if (!(this.list && this.list.length)) return;
    const { proxies, ...stats } = await this.getStats();
    const percent = (a, t) => (!t ? '??' : `${Math.floor((a / t) * 100)}%`);
    const infoRow = ({ count = 0, statuses, errors = {}, time }, name) => {
      if (!count) return null;
      const success = get(statuses, 'success.count', 0);
      const successTime = get(statuses, 'success.value', 0);
      return [
        (name || '').padStart(20),
        count && `${success}/${count}(${percent(success, count)})`.padEnd(30),
        time && `${successTime}/${time}(${percent(successTime, time)})`.padEnd(30),
        Object.keys(errors).join(','),
      ]
        .filter(Boolean)
        .join(' ');
    };
    const proxiesStr = map(proxies, infoRow).filter(Boolean).join('\n');
    const stats2 = await this.strategy.getStats();
    const args = ['[stats]', stats2];
    if (stats.count) {
      args.push(`\n${infoRow(stats, 'SUM')}`);
      if (proxiesStr) {
        args.push(`\n${proxiesStr}`);
      }
    }
    if (Object.keys(stats2).length) {
      this.log.debug(...args);
    }
  }

  async getStats() {
    const stats = {
      proxies: {},
    };
    forEach(this.list, (proxy) => {
      const proxyStats = proxy.stats;
      stats.proxies[proxy.key] = proxyStats;
      inc(stats, 'count', proxyStats.count || 0);
      inc(stats, 'time', proxyStats.time || 0);
      forEach(proxyStats.statuses, (avgVal, name) => {
        avg(stats, `statuses.${name}`, avgVal);
      });
      forEach(proxyStats.errors, (avgVal, name) => {
        avg(stats, `errors.${name}`, avgVal);
      });
    });

    return stats;
  }

  async update() {
    if (this.config.stats) this.stats();
    this.list = await this.getProxyHubProxyList();
    const stats = [];
    if (this.list.length) {
      stats.push(countBy(this.list, 'provider'));
      stats.push(countBy(this.list, 'tags.country'));
    }
    this.log.trace(`[update]`, `proxies: ${this.list.length}`, ...stats);
    await this.strategy.update();
  }

  async run() {
    await super.run();
    await this.update();
    this.interval = setInterval(() => this.update(), this.config.updateInterval);
    if (this.config.stats) this.statsInterval = setInterval(() => this.stats(), this.config.statsInterval);
  }

  getProxyAgent(proxy) {
    return getProxyAgent(proxy);
  }
}

export default ProxyManager;
