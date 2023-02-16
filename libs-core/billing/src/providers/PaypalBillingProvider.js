import BillingProvider from './BillingProvider';

// We have realization of this billing provider, just text us https://t.me/lskjs

export default class PaypalBillingProvider extends BillingProvider {}

// async initPaypal(config = {}) {
//   paypal.configure(config);
//   const payment = Promise.promisifyAll(paypal.payment);
//   paypal.payment = payment;
//   return paypal;
// }
