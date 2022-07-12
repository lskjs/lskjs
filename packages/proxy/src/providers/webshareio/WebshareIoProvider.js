/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
import Err from '@lskjs/err';
import axios from 'axios';

import { ProxyProvider } from '../ProxyProvider';

/**
 * API docs: https://proxy.webshare.io/docs
 */

export class WebshareIoProvider extends ProxyProvider {
  provider = 'webshareio';
  baseURL = 'https://proxy.webshare.io/api';

  async createClient() {
    if (!this.config.apiKey) throw new Err('!config.apiKey');
    return axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Token ${this.config.apiKey}`,
      },
    });
  }

  async checkErr(res) {}
  async fetchListRaw(params = {}) {
    const res = await this.client.get('/proxy/list', { params });
    // const res = await this.client.post('/proxy/list', {query: {limit:}});
    console.log('resresresres', { params }, { ...res.data, results: res.data.results.length }, res.request);
    await this.checkErr(res);
    return res.data;
  }

  async fetchList() {
    let proxies = [];
    const data0 = await this.fetchListRaw();
    const maxCount = data0?.count;
    const pageCount = data0?.results?.length || 1;
    const maxPage = maxCount / pageCount;
    for (let page = 1; page <= maxPage; page += 1) {
      const data = await this.fetchListRaw({ page });
      const list = Object.values(data.results);
      proxies = [
        ...proxies,
        ...list
          .filter((item) => item.valid)
          .map((item) =>
            this.createProxy({
              host: item.proxy_address,
              port: +item.ports.http,
              user: item.username,
              password: item.password,
              type: 'http',
              ip: item.proxy_address,
              tags: {
                country: String(item.country_code).toLowerCase(),
                ipv: 4,
                comment: item.city_name ? String(item.city_name) : undefined,
              },
            }),
          ),
      ];
      console.log('proxies', proxies.length);
    }

    return proxies;
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
  }
}

export default WebshareIoProvider;
