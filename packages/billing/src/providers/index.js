export default {
  bitpay: () => import('./BitpayBillingProvider'),
  coingate: () => import('./CoingateBillingProvider'),
  ecommpay: () => import('./EcommpayBillingProvider'),
  epayments: () => import('./EpaymentsBillingProvider'),
  g2a: () => import('./G2aBillingProvider'),
  paypal: () => import('./PaypalBillingProvider'),
  stripe: () => import('./StripeBillingProvider'),
  interkassa: () => import('./InterkassaBillingProvider'),
  yandexCheckout: () => import('./YandexCheckoutBillingProvider'),
};
