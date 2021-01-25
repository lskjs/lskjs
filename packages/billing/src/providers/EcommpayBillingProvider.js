import BillingProvider from './BillingProvider';

// We have realization of this billing provider, just text us https://t.me/lskjs

export default class EcommpayBillingProvider extends BillingProvider {}

// async initEcommpoy(config = {}) {
//   return {
//     config,
//     createSignature(data) {
//       const message = joinMessage(data);
//       const hmac = CryptoJS.HmacSHA512(message, config.secret);
//       const base64 = CryptoJS.enc.Base64.stringify(hmac);

//       console.log({ // eslint-disable-line no-console
//         message,
//         hmac: hmac.toString(),
//         base64,
//       });

//       return base64;
//     },
//     createPaymentUrl(data) {
//       const signature = this.createSignature(data);
//       const params = {
//         ...data,
//         signature,
//       };
//       // /payment?project_id=0&payment_id=70872663&language_code=en
//       //  &payment_amount=95&payment_currency=USD
//       //  &signature=YWb6Z20ByxpQ30hfTIjaCCsVIwVynXV%2BVLe
//       return `${config.url}/payment?${qs.stringify(params)}`;
//     },
//     verifySignature(params) {
//       const { signature, ...data } = params;
//       return this.createSignature(data) === signature;
//     },
//   };
// }
