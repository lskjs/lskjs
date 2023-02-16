/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
import Err from '@lskjs/err';
import axios from 'axios';

import { getIpv } from '../../utils/getIpv';
import { ProxyProvider } from '../ProxyProvider';

/**
 * API docs: https://proxy.webshare.io/docs
 */

export class Proxy6netProvider extends ProxyProvider {
  provider = 'proxy6net';
  baseURL = 'https://proxy6.net/api';

  async createClient() {
    if (!this.config.apiKey) throw new Err('!config.apiKey');
    return axios.create({
      baseURL: `${this.baseURL}/${this.config.apiKey}`,
    });
  }

  async getBalance() {
    const { data } = await this.client.get('/getbalance');
    return {
      currency: 'RUB',
      value: data.balance,
    };
  }

  async checkErr(res) {
    if (res?.data?.error) {
      // console.log('res?.data?.error', res?.data?.error);
      throw new Err({
        code: `PROXY_PROVIDER_${res.data.error_id}`,
        message: res.data.error,
        data: res.data,
      });
    }
  }
  async fetchListRaw(params = {}) {
    const res = await this.client.get('/getproxy', { params });

    // const res = await this.client.post('/proxy/list', {query: {limit:}});
    await this.checkErr(res);
    return res.data;
  }

  async fetchList() {
    const data = await this.fetchListRaw();
    const list = Object.values(data.list);
    return list
      .filter((item) => item.active === '1')
      .map((item) =>
        this.createProxy({
          host: item.host,
          port: +item.port,
          user: item.user,
          password: item.pass,
          type: item.type === 'socks' ? 'socks5' : item.type,
          ip: item.ip,
          tags: {
            country: String(item.country).toLowerCase(),
            ipv: getIpv(item.ip),
            comment: item.descr ? String(item.descr) : undefined,
            dateFrom: new Date(item.unixtime * 1000),
            dateTo: new Date(item.unixtime_end * 1000),
          },
        }),
      );
  }
  async fetchOptions() {
    const { data } = await this.client.get(`/getcountry`);
    return { countries: data.list };
  }
  getBuyListProps() {
    const countries = [];
    return countries.map((country) => ({ country }));
  }
  async buy({ ...options }) {
    // TODO: NOT SURE
    const { data } = await this.client.get(`/buy`, {
      params: {
        type: 'http',
        count: 1,
        period: 5,
        category: 'tiktok',
        ...options,
      },
    });

    if (data.error) {
      throw new Err({ message: data.error });
    }
    return { data, price: data.price };
  }
}

export default Proxy6netProvider;
