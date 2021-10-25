/* eslint-disable max-classes-per-file */
import Err from '@lskjs/err';
import axios from 'axios';

import { getIpv } from '../../utils/getIpv';
import { ProxyProvider } from '../ProxyProvider';

/**
 * API docs: https://proxy-store.com/en/developers
 */
export class ProxyStoreProvider extends ProxyProvider {
  provider = 'proxystore';
  baseURL = 'https://proxy-store.com/api';

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

  async checkErr(data) {
    if (data.status !== 'no') return;
    throw new Err({
      code: data.error_id,
      message: [data.error, data.message].filter(Boolean).join(': '),
    });
  }

  async fetchListRaw() {
    const { data } = await this.client.get('/getproxy');
    await this.checkErr(data);
    return data;
  }

  async fetchList() {
    const data = await this.fetchListRaw();
    const list = Object.values(data.list);
    // console.log({list})
    return list
      .filter((item) => item.active === '1')
      .map((item) =>
        this.createProxy({
          host: item.host || item.ip, // TODO: хуйня какая та
          port: +item.port,
          user: item.user,
          password: item.pass,
          type: item.type === 'socks' ? 'socks5' : item.type,
          ip: item.ip,
          tags: {
            country: String(item.country).toLowerCase(),
            ipv: getIpv(item.ip),
            comment: item.comment ? String(item.comment) : undefined,
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
    // const countries = ['us', 'ru'];
    const countries = [];
    return countries.map((country) => ({ country }));
  }
  async buy({ ...options }) {
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

export default ProxyStoreProvider;
