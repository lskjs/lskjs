import Err from '@lskjs/err';
import set from 'lodash/set';

import { createProxy } from './createProxy';

const setProxyValue = (proxy, path, value) => set(proxy, path, decodeURIComponent(value));

export function parseProxy(str, { json = false, throws = true } = {}) {
  if (typeof str !== 'string') return json ? createProxy(str).toJSON() : createProxy(str);
  let uri = str;
  if (!uri.includes('://')) uri = `http://${uri}`;
  let url;
  try {
    // eslint-disable-next-line prefer-const
    url = new URL(uri);
  } catch (err) {
    if (!throws) return null;
    throw err;
    // throw new Err(err, { uri });
  }
  const params = Object.fromEntries(url.searchParams);
  const type = url.protocol ? url.protocol.substr(0, url.protocol.length - 1) : 'http';
  const { username: user, password, hostname: host, port } = url;

  const proxy = {
    type,
    host,
    port,
  };
  if (user) setProxyValue(proxy, 'user', user);
  if (password) setProxyValue(proxy, 'password', password);
  if (params.provider) setProxyValue(proxy, 'provider', params.provider);
  // if (params.provider) set(proxy, 'tags.provider', params.provider);
  if (params.ip) setProxyValue(proxy, 'ip', params.ip);
  if (params.country) setProxyValue(proxy, 'tags.country', params.country);
  if (params.ipv) setProxyValue(proxy, 'tags.ipv', params.ipv);
  if (params.subtype) setProxyValue(proxy, 'tags.subtype', params.subtype);
  // proxy.uri = createUri(proxy);
  // proxy.key = createKey(proxy);
  return json ? createProxy(proxy).toJSON() : createProxy(proxy);
}

export const parseProxies = (str = '') => {
  if (Array.isArray(str)) return str.map((p) => parseProxy(p, { throws: false })).filter(Boolean);
  if (typeof str !== 'string') return [str];
  return str
    .trim()
    .split(/[,\n]/)
    .map((p) => parseProxy(p, { throws: false }))
    .filter(Boolean);
};
