/* eslint-disable camelcase */
import Err from '@lskjs/err';
import axios from 'axios';

// import { parseProxies } from '../../utils/parseProxies';
import { ProxyProvider } from '../ProxyProvider';

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

  async checkErr(res) {}
  async fetchListRaw() {
    const res = await this.client.post('/file/get-ips');
    // console.log('res', res.data)
    // const res2= await this.client.post('/file/get-proxy');
    // console.log('res2', res2.data)
    await this.checkErr(res);
    return res.data;
  }

  async fetchList() {
    const data = await this.fetchListRaw();
    
    // console.log({ data });
    const list = Object.values(data.packages);
    // console.log({list})
    const ips = [].concat(...list.map(l => l.ips || []))
    throw 'NOT_IMPLEMENTED'
    // console.log(123123123,{ips})
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
