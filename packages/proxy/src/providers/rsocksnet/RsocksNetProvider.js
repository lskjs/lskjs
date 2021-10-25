/* eslint-disable camelcase */
import Err from '@lskjs/err';
import axios from 'axios';

import { ProxyProvider } from '../ProxyProvider';
import { parseProxies } from '../utils/parseProxies';

/**
 * API docs: https://rsocks.net/panel/apps/api
 */

export class RsocksNetProvider extends ProxyProvider {
  provider = 'rsocksnet';
  baseURL = 'https://rsocks.net/api/v1';

  async createClient() {
    if (!this.config.authId) throw new Err('!config.authId');
    if (!this.config.authKey) throw new Err('!config.authKey');
    // if (!this.config.user) throw new Err('!config.user');
    // if (!this.config.password) throw new Err('!config.password');
    return axios.create({
      baseURL: this.baseURL,
      headers: {
        'X-Auth-ID': this.config.authId,
        'X-Auth-Key': this.config.authKey,
      },
    });
  }

  async fetchListRaw() {
    const { data } = await this.client.post('/file/get-ips');
    return data;
  }
  async fetchList() {
    if (!this.config.rawUrl) throw new Err('!config.rawUrl');
    const { data } = await axios(this.config.rawUrl);
    const proxyList = parseProxies(data);
    return proxyList.map((proxy) =>
      this.createProxy({
        type: 'http',
        user: this.config.user,
        password: this.config.password,
        ...proxy,
        tags: {
          country: 'ru',
          ipv: 'v4',
        },
      }),
    );
  }
  async fetchOptions() {
    return {};
  }
  getBuyListProps() {
    const countries = [];
    return countries.map((country) => ({ country }));
  }
  async buy({ country }) {
    return [];
    // const { data } = await axios.post(`${this.base}/api/new-order/?api_key=${this.config.apiKey}`, {
    //   type: 'dedicated',
    //   ip_version: 6,
    //   country,
    //   quantity: 1,
    //   period: 5,
    // });
    // return data;
  }
}

export default RsocksNetProvider;
