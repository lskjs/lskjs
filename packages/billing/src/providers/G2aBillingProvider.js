import BillingProvider from './BillingProvider';

const productionQuoteUrl = 'https://checkout.pay.g2a.com/index/createQuote';
const sandboxQuoteUrl = 'https://checkout.test.pay.g2a.com/index/createQuote';

const productionRedirectUrl = 'https://checkout.pay.g2a.com/index/gateway?token=';
const sandboxRedirectUrl = 'https://checkout.test.pay.g2a.com/index/gateway?token=';

const productionTransactionDataUrl = 'https://pay.g2a.com/rest/transactions/';
const sandboxTransactionDataUrl = 'https://www.test.pay.g2a.com/rest/transactions/';

// We have realization of this billing provider, just text us https://t.me/lskjs

export default class G2aBillingProvider extends BillingProvider {}
