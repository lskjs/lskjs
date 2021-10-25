import Err from '@lskjs/err';
import Module from '@lskjs/module';
import tryJSONparse from '@lskjs/utils/tryJSONparse';
import Bluebird from 'bluebird';
import flatten from 'lodash/flatten';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import isFunction from 'lodash/isFunction';
import shuffle from 'lodash/shuffle';

import { createRequest } from './createRequest';

export class ProxyTests extends Module {
  config = {
    concurrency: tryJSONparse(process.env.PREFETCH) || 50,
    cacheTimeout: 5 * 60 * 1000,
  };
  cache = null;
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
  async runTest({ proxy, test = {} } = {}) {
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
      id: [get(proxy, 'key'), test.id].filter(Boolean).join('_'),
      proxy,
      test,
    };
    const startedAt = new Date();
    try {
      await this.request(test.req, { proxy, request });
      res.status = 'success';
    } catch (err) {
      res.status = 'error';
      res.err = Err.getCode(err);
    }
    res.time = Date.now() - startedAt;
    res.updatedAt = Date.now();
    const expired = test.expired || 5 * 60 * 1000;
    res.expiredAt = Date.now() + expired;
    // const ok = test.validate ? await test.validate(res2) : true;
    return res;
  }
  async runTests(proxyList) {
    const { concurrency } = this.config;
    const stats = await this.app.module('stats');
    stats.startTimer();
    // this.log.trace('[runTests] start');
    const res = await Bluebird.map(
      shuffle(proxyList),
      (proxy) =>
        Bluebird.map(shuffle(this.tests), (test) => this.runTest({ proxy, test }), {
          concurrency: 1,
        }),
      { concurrency },
    );
    stats.stopTimer();
    // this.log.debug('[runTests]', res);
    return flatten(res);
  }

  isActualCache() {
    // console.log({
    //   fetchedAt: this.cache?.fetchedAt,
    //   cacheTimeout: this.config?.cacheTimeout,
    //   new: +new Date(this.cache?.fetchedAt || 0) + (this.config?.cacheTimeout || 0),
    // });
    return +new Date(this.cache?.fetchedAt || 0) + (this.config?.cacheTimeout || 0) >= Date.now();
  }

  async update(proxyList) {
    try {
      const list = await this.runTests(proxyList);
      const proxyTests = groupBy(list, 'proxy.key');
      this.cache = {
        fetchedAt: new Date(),
        list,
        proxyTests,
      };
    } catch (err) {
      this.error('[getTests]', err);
    }
  }
  async getTests(proxyList) {
    if (this.isActualCache()) return this.cache;
    this.update(proxyList);
    return this.cache;
  }
}

export default ProxyTests;
