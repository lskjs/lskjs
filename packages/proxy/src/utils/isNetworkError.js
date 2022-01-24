/* eslint-disable max-len */
import Err from '@lskjs/err';
import get from 'lodash/get';

const networkFatalsWildcards = ['REQUEST_NETWORK_FATAL', 'REQUEST_FATAL'];
const networkFatals = ['Request failed with status code 429'];

const networkErrorsWildcards = [
  'REQUEST_',
  // NOTE: legacy
  'PROXY_',
  'NETWORK_',
];
const networkErrors = [
  ...networkFatals,
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
  'ERR_SOCKET_CLOSED',
  'ERR_TLS_CERT_ALTNAME_INVALID',
];

export const isNetworkCapcha = (err) => {
  const data = get(err, 'response.data');
  if (typeof data !== 'string') return false;
  if (data.includes('<div class="g-recaptcha" data-sitekey="')) return true;
  if (data.includes('action_recaptcha_verify2"')) return true;
  if (data.includes('We have been receiving a large volume of requests from your network.')) return true;
  if (data.includes('Our systems have detected unusual traffic from your computer network')) return true;
  return false;
};

export const isNetworkFatal = (err) => {
  if (get(err, 'response.status') === 429) return true; // REQUEST_NETWORK_FATAL_TOO_MANY_REQUEST
  if (get(err, 'response.status') === 407) return true; // REQUEST_NETWORK_FATAL_PROXY_AUTH_REQUIRED
  if (isNetworkCapcha(err)) return true; // REQUEST_NETWORK_FATAL_CAPTCHA
  const errCode = Err.getCode(err) || '';
  if (networkFatals.includes(errCode)) return true;
  return networkFatalsWildcards.filter((w) => errCode.startsWith(w)).length;
};

export const isNetworkError = (err) => {
  if (isNetworkFatal(err)) return true;
  const errCode = Err.getCode(err) || '';
  if (networkErrors.includes(errCode)) return true;
  return networkErrorsWildcards.filter((w) => errCode.startsWith(w)).length;
};

export const getFatalErrCode = (err) => {
  if (get(err, 'response.status') === 429) return 'REQUEST_NETWORK_FATAL_TOO_MANY_REQUEST';
  if (get(err, 'response.status') === 407) return 'REQUEST_NETWORK_FATAL_PROXY_AUTH_REQUIRED';
  if (isNetworkCapcha(err)) return 'REQUEST_NETWORK_FATAL_CAPTCHA';
  if (isNetworkError(err)) return 'REQUEST_NETWORK';
  return null;
};

export const getErrCode = (err) => getFatalErrCode(err) || Err.getCode(err);

export default isNetworkError;

// TODO: add this errors
// if (response.status === 407) throw new Err('PROXY_AUTH_REQUIRED');
// export function checkResponse(response) {
//   if (response.status === 407) throw new Err('PROXY_AUTH_REQUIRED');
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
