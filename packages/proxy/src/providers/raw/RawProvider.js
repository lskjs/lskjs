/* eslint-disable camelcase */
import Err from '@lskjs/err';
import axios from 'axios';
import Bluebird from 'bluebird';

import { parseProxies } from '../../utils/parseProxies';
import { ProxyProvider } from '../ProxyProvider';

export class RawProvider extends ProxyProvider {
  provider = 'raw';
  getConfigUrls() {
    const urls = this.config.urls || [];
    if (this.config.url) urls.push(this.config.url);
    return urls;
  }
  async createClient() {
    if (this.config.proxies) return axios;
    const urls = this.getConfigUrls();
    if (!urls?.length) throw new Err('!config.url');
    return axios;
  }
  async fetchListRaw() {
    if (this.config.proxies) return this.config.proxies;
    const urls = this.getConfigUrls();
    return Bluebird.map(
      urls,
      async (url) => {
        try {
          const { data } = await this.client.get(this.config.url);
          return data;
        } catch (err) {
          this.log.error('[fetchListRaw]', { url }, err);
          return { err };
        }
      },
      { concurrency: 10 },
    );
  }
  async fetchList() {
    const datas = await this.fetchListRaw();
    const proxyLists = datas.map((data) => (data.err ? [] : parseProxies(data)));
    const proxyList = [].concat(...proxyLists);
    return proxyList.map((proxy) => this.createProxy(proxy));
  }
}

export default RawProvider;
