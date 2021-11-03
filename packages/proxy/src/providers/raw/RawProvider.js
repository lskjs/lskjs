/* eslint-disable camelcase */
import Err from '@lskjs/err';
import axios from 'axios';

import { parseProxies } from '../../utils/parseProxies';
import { ProxyProvider } from '../ProxyProvider';

export class RawProvider extends ProxyProvider {
  provider = 'raw';
  async createClient() {
    if (this.config.proxies) return axios;
    if (!this.config.url) throw new Err('!config.url');
    return axios;
  }
  async fetchListRaw() {
    if (this.config.proxies) return this.config.proxies;
    const { data } = await this.client.get(this.config.url);
    return data;
  }
  async fetchList() {
    if (this.config.proxies) return this.config.proxies;
    const data = await this.fetchListRaw();
    const proxyList = parseProxies(data);
    return proxyList.map((proxy) => this.createProxy(proxy));
  }
}

export default RawProvider;
