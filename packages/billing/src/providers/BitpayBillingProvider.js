import BillingProvider from './BillingProvider';

// We have realization of this billing provider, just text us https://t.me/lskjs

export default class BitpayBillingProvider extends BillingProvider {}


  // Api is working, but disabled by BuzzGuru
      // return new Promise((resolve, reject) => {
      //   const key = config.key || fs.readFileSync(config.keyPath, 'utf8');
      //   const privkey = bitauth.decrypt(config.password, key);
      //   const client = bitpay.createClient(privkey, {
      //     config: {
      //       apiHost: config.apiHost || 'bitpay.com',
      //       apiPort: config.apiPort || 443,
      //       forceSSL: config.forceSSL || false,
      //     },
      //   });
      //   client.on('ready', () => {
      //     client.createInvoice = async (data) => {
      //       return new Promise((resolve2, reject2) => {
      //         client.as('pos').post('invoices', data, (err, invoice) => {
      //           if (err) return reject2(err);
      //           return resolve2(invoice);
      //         });
      //       });
      //     };
      //     return resolve(client);
      //   });
      //   client.on('error', reject);
      // });