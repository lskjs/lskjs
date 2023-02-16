import { client, testClient } from 'coingate-v2'; // npm audit error

import BillingProvider from '../BillingProvider';

// We have realization of this billing provider, just text us https://t.me/lskjs

export default class CoingateBillingProvider extends BillingProvider {
  async init() {
    await this.init();
    if (this.config.sandbox) {
      this.client = client(this.config.token);
    } else {
      this.client = testClient(this.config.token);
    }
  }

  /**
   * Docs: https://developer.coingate.com/docs/create-order
   */
  createOrder(...args) {
    return this.client.createOrder(...args);
  }

  /**
   * Docs: https://developer.coingate.com/docs/get-order
   */
  getOrder(...args) {
    return this.client.getOrder(...args);
  }

  /**
   * Docs: https://developer.coingate.com/docs/list-orders
   */
  listOrders(...args) {
    return this.client.listOrders(...args);
  }

  /**
   * Docs: https://developer.coingate.com/docs/get-rate
   */
  getExchangeRate(...args) {
    return this.client.getExchangeRate(...args);
  }

  /**
   * Docs: https://developer.coingate.com/docs/list-rates
   */
  listExchangeRates(...args) {
    return this.client.listExchangeRates(...args);
  }

  /**
   * Docs: https://developer.coingate.com/docs/ping
   */
  ping(...args) {
    return this.client.ping(...args);
  }
}
