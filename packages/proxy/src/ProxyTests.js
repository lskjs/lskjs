import Err from '@lskjs/err';
import Module from '@lskjs/module';
import tryJSONparse from '@lskjs/utils/tryJSONparse';
import Bluebird from 'bluebird';
import find from 'lodash/find';
import flatten from 'lodash/flatten';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import isFunction from 'lodash/isFunction';
import pick from 'lodash/pick';
import shuffle from 'lodash/shuffle';

import { createRequest } from './createRequest';

const getId = ({ proxy, test }) => [get(proxy, 'key'), test.id].filter(Boolean).join('_');

export class ProxyTests extends Module {
  config = {
    concurrency: tryJSONparse(process.env.PREFETCH) || 50,
    cacheTimeout: 5 * 60 * 1000,
  };
  cache = {
    results: {},
    proxyStats: {},
    updatedAt: null,
  };
  request(req, { request, ...props } = {}) {
    if (isFunction(req)) {
      return req({
        request,
        ...props,
      });
    }
    return request({
      ...req,
      ...props,
    });
  }
  async execTest({ id, proxy, test = {} } = {}) {
    const apm = await this.app.module('apm');
    const stats = await this.app.module('stats');
    const log = await this.log.createChild({ name: `${test.id}` });
    const request = createRequest({
      apm,
      stats,
      log,
    });
    // console.log({ proxy });
    const res = {
      id: getId({ proxy, test }),
      proxy,
      proxyKey: proxy?.key || '?',
      test,
    };
    const startedAt = new Date();
    try {
      await this.request(test.req, { proxy, request });
      res.status = 'success';
    } catch (err) {
      res.status = 'error';
      res.errCode = Err.getCode(err);
      res.err = err;
    }
    res.time = Date.now() - startedAt;
    res.updatedAt = Date.now();
    const expired = test.expired || 5 * 60 * 1000;
    res.expiredAt = Date.now() + expired;
    // const ok = test.validate ? await test.validate(res2) : true;
    return res;
  }
  getCache(id) {
    if (!this.cache.results[id]) return null;
    if (this.cache.results[id].expiredAt < Date.now()) {
      delete this.cache.results[id];
      return null;
    }
    return this.cache.results[id];
  }
  setCache(res) {
    let { id } = res;
    if (!id) id = getId(res);
    if (!id) throw new Err('!id', { res });
    this.cache.results[id] = res;
    this.cache.updatedAt = Date.now();
    this.cache.proxyStats = groupBy(this.cache.results, 'proxy.key');
  }
  updateCache() {
    Object.keys(this.cache.results).map((id) => this.getCache(id));
  }

  getResults() {
    this.updateCache();
    return this.cache.results;
  }
  async runTest({ proxy, testId, test, force = false, ...props } = {}) {
    if (!test && testId) {
      // eslint-disable-next-line no-param-reassign
      test = find(this.tests, { id: testId });
    }
    const id = getId({ proxy, test });
    let res = this.getCache(id);
    if (res && !force) return res;
    res = await this.execTest({ id, proxy, test, ...props });
    // this.log.trace('[runTest]', res)
    this.setCache(res);
    return res;
  }
  getProxyStats(proxyList) {
    if (!proxyList) return this.cache.proxyStats;
    const proxyKeys = proxyList.map((proxy) => proxy.key);
    return pick(this.cache.proxyStats, proxyKeys);
  }
  async runTests(proxyList, { force = false } = {}) {
    const { concurrency } = this.config;
    const stats = await this.app.module('stats');
    stats.startTimer();
    // this.log.trace('[runTests] start');
    const res = await Bluebird.map(
      shuffle(proxyList),
      (proxy) =>
        Bluebird.map(shuffle(this.tests), (test) => this.runTest({ proxy, test, force }), {
          concurrency: 1,
        }),
      { concurrency },
    );
    stats.stopTimer();
    // this.log.debug('[runTests]', res);
    return flatten(res);
  }
}

export default ProxyTests;
