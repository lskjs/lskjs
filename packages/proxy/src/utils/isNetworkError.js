import Err from '@lskjs/err';

const wildcardNetworkErrors = ['PROXY_', 'NETWORK_'];
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
