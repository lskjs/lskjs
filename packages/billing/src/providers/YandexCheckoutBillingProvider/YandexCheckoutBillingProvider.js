import createClient from 'yandex-checkout';
import BillingProvider from '../BillingProvider';

/**
 *
 * Docs: https://github.com/lodosstm/yandex-checkout-node#readme
 *
 * config: {
 *   shopId: 'your_shopId',
 *   secretKey: 'your_secretKey'
 *   timeout(default = 120000),
 *   debug(default = false),
 *   host(default = 'https://payment.yandex.net'),
 *   path(default = '/api/v3/')
 * }
 *
 */

export default class YandexCheckoutBillingProvider extends BillingProvider {
  provder = 'yandexCheckout';
  async init() {
    await super.init();
    if (!this.config) {
      this.log.warn('!config');
      return;
    }
    this.client = createClient(this.config);
  }

  createPayment(...args) {
    return this.client.createPayment(...args);
  }
}
