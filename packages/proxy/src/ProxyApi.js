import Err from '@lskjs/err';
import BaseApi from '@lskjs/server-api';

import { filterProxy } from './utils/filterProxy';
// import get from 'lodash/get';
// import pick from 'lodash/pick';

export default class ProxyApi extends BaseApi {
  getRoutes() {
    return {
      '/': this.list.bind(this),
      '/list': this.list.bind(this),
      '/list.:format': this.list.bind(this),
      '/tests': this.tests.bind(this),
      '/test': this.test.bind(this),
      '/buyList': this.buyList.bind(this),
      '/:provider': this.list.bind(this),
      '/:provider.:format': this.list.bind(this),
      // '/buyList': () => this.app.buyList(),
      // '/setActiveProviders': this.setActiveProviders.bind(this),
      // '/:provider': this.providerGetList.bind(this),
      '/:provider/list': this.list.bind(this),
      '/:provider/list.:format': this.list.bind(this),
      '/:provider/fetch': this.providerFetchList.bind(this),
      '/:provider/fetchRaw': this.providerFetchListRaw.bind(this),
      '/:provider/fetch/raw': this.providerFetchListRaw.bind(this),
      // '/:provider/fetch/raw': this.providerFetchListRaw.bind(this),
      '/:provider/buy': this.providerBuyList.bind(this),
    };
  }
  async providerFetchList(req) {
    const provider = await this.app.module(`proxy.providers.${req.params.provider}`);
    if (!provider) throw '!provider';
    return provider.fetchList();
  }
  async providerFetchListRaw(req) {
    const provider = await this.app.module(`proxy.providers.${req.params.provider}`);
    if (!provider) throw '!provider';
    return provider.fetchListRaw();
  }
  async providerBuyList(req) {
    const provider = await this.app.module(`proxy.providers.${req.params.provider}`);
    if (!provider) throw '!provider';
    return provider.buyList(req.data);
  }
  async buyList(req) {
    const proxy = await this.app.module('proxy');
    return proxy.buyList(req.data);
  }
  async tests(req) {
    const proxy = await this.app.module('proxy');
    return proxy.runProxyTests(req.data.list);
  }
  async test(req) {
    const proxy = await this.app.module('proxy');
    const { proxyKey, testId } = req.data;
    if (!proxyKey) throw new Err('!proxyKey')
    if (!testId) throw new Err('!testId')
    return proxy.runProxyTest({ proxyKey, testId, force: 1 });
  }
  async list(req, res) {
    const proxy = await this.app.module('proxy');
    const prefilter = {};
    if (req.params.provider) prefilter.provider = req.params.provider;
    // console.log({prefilter})
    const { testedAt, fetchedAt, list: rawProxyList } = await proxy.getList(prefilter);
    const proxyList = filterProxy(rawProxyList, req.data);
    if (req.params.format === 'txt' || req.data.format === 'txt') {
      return res.send(proxyList.map((p) => p.uri).join('\n'));
    }
    return {
      __pack: true,
      fetchedAt,
      testedAt,
      total: rawProxyList.length,
      count: proxyList.length,
      data: proxyList,
      // data: proxyList.map((p) => p.toObject()),
    };
  }
}
