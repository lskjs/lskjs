import camelCase from 'lodash/camelCase';
import forEach from 'lodash/forEach';

export const getProxyLabels = (proxy) => {
  const labels = {};
  if (proxy) {
    labels.proxyKey = proxy.key;
    labels.proxyType = proxy.type;
    labels.proxyProvider = proxy.provider;
    forEach(proxy.tags, (value, name) => {
      labels[camelCase(`proxy_${name}`)] = value;
    });
  }
  return labels;
};

export const createProxy = (proxy) => proxy;

export const getProxyKey = (proxy) =>
  [proxy.host, proxy.port]
    .filter(Boolean)
    .join(':')
    .replace(/[^a-zA-Z0-9]/g, '_');

export function parseProxy(str) {
  if (typeof str !== 'string') return str;
  let uri = str;
  if (!uri.includes('://')) uri = `http://${uri}`;
  const url = new URL(uri);
  const type = url.protocol ? url.protocol.substr(0, url.protocol.length - 1) : 'http';
  const { username: user, password, hostname: host, port } = url;

  const proxy = {
    type,
    host,
    port,
    uri,
  };
  if (user) proxy.user = user;
  if (password) proxy.password = password;
  proxy.key = getProxyKey(proxy);
  return createProxy(proxy);
}

export const parseProxyFromString = parseProxy;

export const parseProxies = (str = '') => str.split(/[,\n]/).map((p) => parseProxy(p));
