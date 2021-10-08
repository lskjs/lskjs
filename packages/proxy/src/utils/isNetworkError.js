import Err from '@lskjs/err';

const wildcardNetworkErrors = ['REQUEST_', 'PROXY_', 'NETWORK_'];
const networkErrors = [
  'ECONNRESET',
  'ECONNREFUSED',
  'TIMEOUT_RESPONSE_TEXT',
  'SELF_SIGNED_CERT_IN_CHAIN',
  'EHOSTUNREACH',
  'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',
  'EPROTO',
  'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
  'CERT_HAS_EXPIRED',
  'EAI_AGAIN',
  'Z_BUF_ERROR',
  'ENETUNREACH',
  'ERR_TLS_CERT_ALTNAME_INVALID',
];
// TODO: add this errors

// export function checkResponse(response) {
//   if (response.status === 407) {
//     throw new Err('PROXY_AUTH_REQUIRED');
//   } else if (response.status === 404) {
//     throw new Err('STATUS_404');
//   } else if (response.status === 429) {
//     throw new Err('NETWORK_TOO_MANY_REQUESTS', { class: 'network', status: response.status });
//   } else if (response.status >= 300) {
//     throw new Err('NETWORK_NOT_200', { status: response.status });
//   } else if (typeof response.data === 'string') {
//     /* eslint-disable max-len */
//     if (response.data.indexOf('<div class="g-recaptcha" data-sitekey="') !== -1) {
//       if (
//         response.req &&
//         response.req.headers &&
//         response.req.headers.cookie &&
//         response.req.headers.cookie.indexOf('goojf') === 0
//       ) {
//         throw new Err('NETWORK_RECAPCHA', { capchaCookie: response.req.headers.cookie.substr(6, 156) });
//       }
//       throw new Err('NETWORK_RECAPCHA');
//     }
//     if (response.data.indexOf('action_recaptcha_verify2"') !== -1) throw new Err('NETWORK_RECAPCHA');
//     if (response.data.indexOf('We have been receiving a large volume of requests from your network.') !== -1)
//       throw new Err('NETWORK_BAN');
//     if (response.data.indexOf('Our systems have detected unusual traffic from your computer network') !== -1)
//       throw new Err('NETWORK_RECAPCHA');
//     /* eslint-enable max-len */
//   }
// }

// 'NETWORK_NOT_200',
// 'NETWORK_JSON_EXPECTED',
// 'NETWORK_BAN',
// 'NETWORK_RECAPCHA',
// 'NETWORK_TOO_MANY_REQUESTS',
// 'PROXY_AUTH_REQUIRED',
// 'NETWORK_BAN_CAPCHA',
// 'FETCH_TIMEOUT',

export const isNetworkError = (err) => {
  const errCode = Err.getCode(err) || '';
  if (networkErrors.includes(errCode)) return true;

  return wildcardNetworkErrors.filter((w) => errCode.startsWith(w)).length;
};

export default isNetworkError;
