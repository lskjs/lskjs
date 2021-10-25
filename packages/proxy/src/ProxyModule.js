import Module from '@lskjs/module';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
// import Promise from 'bluebird';
import flatten from 'lodash/flatten';
import max from 'lodash/max';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';

import { Proxy } from './Proxy';
import { filterProxy } from './utils/filterProxy';
// import mapValues from 'lodash/mapValues';

// import Uapp from './Uapp';
// const DEBUG = false;
// const numSumBy = (obj, key) => sumBy(map(obj, (o) => get(o, key, 0)));

export class ProxyModule extends Module {
  getModules() {
    return {
      ...super.getModules(),
      // providers: [import('./_ProxyProviders'), { providers: this.providers }],
      // providers: [import('@lskjs/module/asyncItems2'), { items: this.providers }],
      providers: [import('@lskjs/module/asyncModules'), { items: this.providers, config: this.config.providers }],
      tests: [import('./ProxyTests'), { tests: this.tests, config: this.config.tests }],
    };
  }
  async runTests() {
    const tests = await this.module('tests');
    // const { list } = await this.getList();
    const list = [];
    const proxyList = [new Proxy({ provider: 'localhost' }), ...list];
    return tests.runTests(proxyList);
  }
  async getTests() {
    const tests = await this.module('tests');
    // const { list } = await this.getList();
    const list = [];
    const proxyList = [new Proxy({ provider: 'localhost' }), ...list];
    return tests.getTests(proxyList);
  }
  async getList(filter = {}) {
    // const proxies = await this.runProvidersMethod('getList');
    const res = await this.runProvidersMethod('getList');
    const fetchedAt = max(Object.values(res).map((a) => a.fetchedAt));
    let rawProxyList = uniqBy(flatten(Object.values(res).map((a) => a.list)), 'key');

    // TODO: как-то облагородить
    const tests = await this.module('tests');
    const res2 = await tests.getTests(rawProxyList);
    const allTests = res2?.proxyTests || {};
    rawProxyList = rawProxyList.map((p) => {
      const proxyTests = allTests[p.key] || [];
      const testIds = proxyTests.map((t) => t?.test?.id);
      const testTags = uniq(proxyTests.map((t) => t?.test?.tags));
      p.targets = testTags;
      p.tests = testIds;
      return p;
      // return {
      //   ...p,
      //   targets: testTags,
      //   tests: testIds,
      // };
    });

    const proxyList = filterProxy(rawProxyList, filter);
    return {
      fetchedAt,
      total: rawProxyList.length,
      count: proxyList.length,
      list: proxyList,
    };
  }
  async fetchList() {
    const res = await this.runProvidersMethod('fetchList');
    const proxies = flatten(Object.values(res));
    return proxies;
  }
  async runProvidersMethod(method, ...args) {
    const providers = await this.module('providers.*');
    // console.log({ providers, method });
    return asyncMapValues(providers, (provider) =>
       //eslint-disable-line
      // const run = provider[method];
      // console.log({
      //   provider,
      //   run,
      // });
      provider[method](...args),
    );
  }

  async updateProxyTests() {
    this.log.trace('[updateProxyTests] start');
    const proxyTests = await this.module('tests');
    const providers = await this.module('providers');
    const proxies = await providers.getList();
    this.log.trace('[proxies] ', proxies);
    const result = await proxyTests.runTests(proxies);
    const stats = await this.app.module('stats');
    await stats.stop();
    this.log.debug('[updateProxyTests]', result);
  }
}

export default ProxyModule;
