import { isDev } from '@lskjs/env';
import Err from '@lskjs/err';
import Module from '@lskjs/module';
import Mutex from '@lskjs/mutex';
import avg from '@lskjs/utils/avg';
import inc from '@lskjs/utils/inc';
import axios from 'axios';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import map from 'lodash/map';

import { Proxy } from '../Proxy';
import strategies from '../strategies';
import { filterProxy } from '../utils/filterProxy';
import { getProxyAgent } from '../utils/getProxyAgent';
import { parseProxyParam } from '../utils/parseProxyParam';

// const debug = false; /// __DEV__;

export class ProxyManager extends Module {
  cache = null;
  proxies = null;
  config = {
    stats: isDev,
    // updateInterval: debug ? 5 * 60 * 1000 : 10 * 60 * 1000,
    // statsInterval: debug ? 10 * 1000 : 3 * 60 * 1000,
    cacheTimeout: 5 * 60 * 1000,
    strategy: 'linear',
  };
  strategies = strategies;
  static parseProxyParam = parseProxyParam;
  async createClient() {
    const baseURL = this.config.client?.baseURL || this.config.client?.url;
    if (baseURL) {
      this.log.debug('[baseUrl] url', baseURL);
    } else {
      this.log.warn('[baseUrl] !url');
    }
    const props = {
      baseURL,
      // params: { ...this.options, ...params },
      // ...axiosParams,
      // timeout: 5000,
    };
    return axios.create(props);
  }
  async createStrategy() {
    let { Strategy } = this;
    if (!Strategy) {
      let strategy = this.config.strategy || 'random';
      if (!this.strategies[strategy]) {
        this.log.warn('!strategies[strategy]', strategy);
        strategy = 'random';
      }
      Strategy = this.strategies[strategy];
    }
    if (!Strategy) throw new Err('!Strategy');
    this.log.debug('strategy', Strategy.strategy);
    return Strategy.start({
      __parent: this,
      app: this.app,
      manager: this,
    });
  }
  async init() {
    await super.init();
    this.client = await this.createClient();
    this.strategy = await this.createStrategy();
    if (this.proxies) {
      this.log.trace('[proxies] count', this.proxies.length);
    }
    this.mutex = new Mutex();
  }
  static getLocalhostProxy() {
    return new Proxy({ provider: 'localhost' });
  }
  getLocalhostProxy() {
    return new Proxy({ provider: 'localhost' });
  }
  async getProxies(filter) {
    if (this.disabled) return [];
    const list = await this.getProxyHubProxyList();
    return filterProxy(list, filter);
  }
  async getProxy(...args) {
    if (this.disabled) return null;
    await this.getProxyHubProxyList();
    return this.strategy.getProxy(...args);
  }
  // async requestProxyHub({ params, ...axiosParams }) {
  //   const props = {
  //     baseURL: this.url,
  //     params: { ...this.options, ...params },
  //     ...axiosParams,
  //     timeout: 5000,
  //   };
  //   if (this.debug) this.log.debug('requestProxyHub >>', props.baseURL, props.params);
  //   const { data } = await axios(props);
  //   if (this.debug) this.log.trace('requestProxyHub <<', data.data.length);

  //   return data;
  // }
  async fetchProxyList(params) {
    try {
      const { data } = await this.client.get('/list');
      return { requestedAt: new Date(), ...data };
    } catch (err) {
      this.log.error('PROXY_LIST_ERROR', err);
      throw new Err('PROXY_LIST_ERROR', { method: 'fetchProxyList', params, err });
    }
  }

  wrapProxies(list = []) {
    const wrapProxy = (props) =>
      new Proxy({
        manager: this,
        ...props,
      });
    return list.map(wrapProxy);
  }

  isActualCache() {
    return +new Date(this.cache?.requestedAt || 0) + (this.config?.cacheTimeout || 0) >= Date.now();
  }
  /**
   * может быть 4 ситуации
   *
      0 - list
      1 - new, list
      2 - locked, wait, !list
      3 - locked, wait, list
   */
  async updateCache() {
    if (this.proxies) {
      this.cache = {
        updatedAt: new Date(),
        list: this.wrapProxies(this.proxies),
      };
    }
    if (this.mutex.isLocked()) {
      await this.mutex.isAsyncLocked(10000);
      if (this.cache) return;
      throw new Err('PROXY_MANAGER_TIMEOUT');
    }
    const release = await this.mutex.acquire();
    try {
      const { data: list, ...cache } = await this.fetchProxyList();
      this.cache = {
        updatedAt: new Date(),
        ...cache,
        list: this.wrapProxies(list),
      };
      release();
    } catch (err) {
      this.log.error(err);
      release();
    }
  }

  async update() {
    if (this.isActualCache()) return;
    await this.updateCache();
    const { list } = this.cache;
    if (!list?.length) {
      this.log.warn('[cache]', 'PROXY_MANAGER_LIST_EMPTY');
      // throw new Err('PROXY_MANAGER_LIST_EMPTY', { list });
    }
    await this.strategy.update();
    if (this.config.stats) await this.stats();
  }

  async getProxyHubProxyList() {
    await this.update();
    let list = [];
    if (this.cache) list = this.cache.list;
    return list;
  }

  // async stop() {
  //   await super.stop();
  //   if (this.interval) clearInterval(this.interval);
  // }

  async stats() {
    if (!this.cache?.list?.length) return;
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
    forEach(this.cache?.list || [], (proxy) => {
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

  getProxyAgent(proxy) {
    return getProxyAgent(proxy);
  }
}

export default ProxyManager;
