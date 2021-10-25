import Module from '@lskjs/module';
import Err from '@lskjs/utils/Err';
import axios from 'axios';

import { createProxy } from '../utils/createProxy';

export class ProxyProvider extends Module {
  cache = null;
  config = {
    cacheTimeout: 5 * 60 * 1000,
  };

  async createClient() {
    return axios.create({
      baseURL: this.baseURL,
    });
  }
  createProxy(props = {}) {
    return createProxy({
      provider: this.provider,
      ...props,
    });
  }
  async init() {
    await super.init();
    if (!this.provider) throw new Err('!provider');
    this.client = await this.createClient();
  }
  async fetchList() {
    throw new Err('IMPLEMENT_ME', { method: 'fetchList', name: this.name });
  }
  isActualCache() {
    // console.log({
    //   fetchedAt: this.cache?.fetchedAt,
    //   cacheTimeout: this.config?.cacheTimeout,
    //   new: +new Date(this.cache?.fetchedAt || 0) + (this.config?.cacheTimeout || 0),
    // });
    return +new Date(this.cache?.fetchedAt || 0) + (this.config?.cacheTimeout || 0) >= Date.now();
  }
  async update() {
    try {
      this.cache = {
        fetchedAt: new Date(),
        list: await this.fetchList(),
      };
    } catch (err) {
      this.error('[update]', err);
    }
  }
  async getList() {
    if (this.isActualCache()) return this.cache;
    await this.update();
    return this.cache;
  }
  buy() {
    throw new Err('IMPLEMENT_ME', { method: 'buy', name: this.name });
  }
  getBuyListProps() {
    // throw new Err('IMPLEMENT_ME', { method: 'getBuyListProps', name: this.name });
    return [];
  }
  async buyList() {
    return Promise.map(this.getBuyListProps(), (props) => this.buy(props));
  }
}
export default ProxyProvider;
