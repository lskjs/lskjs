import set from 'lodash/set';

import { createProxy } from './createProxy';

export function parseProxy(str) {
  if (typeof str !== 'string') return createProxy(str);
  let uri = str;
  if (!uri.includes('://')) uri = `http://${uri}`;
  const url = new URL(uri);
  const params = Object.fromEntries(url.searchParams);
  const type = url.protocol ? url.protocol.substr(0, url.protocol.length - 1) : 'http';
  const { username: user, password, hostname: host, port } = url;

  const proxy = {
    type,
    host,
    port,
  };
  if (user) proxy.user = user;
  if (password) proxy.password = password;
  if (params.provider) proxy.provider = params.provider;
  // if (params.provider) set(proxy, 'tags.provider', params.provider);
  if (params.ip) proxy.ip = params.ip;
  if (params.country) set(proxy, 'tags.country', params.country);
  if (params.ipv) {
    set(proxy, 'tags.ipv', params.ipv);
  }
  if (params.subtype) set(proxy, 'tags.subtype', params.subtype);
  // proxy.uri = createUri(proxy);
  // proxy.key = createKey(proxy);

  return createProxy(proxy);
}

export const parseProxies = (str = '') => {
  if (Array.isArray(str)) return str.map((p) => parseProxy(p));
  if (typeof str !== 'string') return [str];
  return str.split(/[,\n]/).map((p) => parseProxy(p));
};
