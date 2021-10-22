import { parseProxies, parseProxy } from './index';

export const isProxyHub = (proxy) =>
  (proxy.startsWith('http://') || proxy.startsWith('https://')) && proxy.includes('/proxy');

export const getProxyType = (proxy) => {
  if (!proxy) return null;
  if (proxy[0] === '.' || proxy[0] === '/') return 'file';
  if (isProxyHub(proxy)) return 'hub';
  return 'proxy';
};

export const parseProxyFromString = parseProxy;

export const parseProxyParam = (proxyStr) => {
  const res = {};
  const proxyType = getProxyType(proxyStr);
  if (proxyType === 'file') {
    if (proxyStr[0] === '.') {
      // eslint-disable-next-line import/no-dynamic-require
      res.proxies = require(`${process.cwd()}${proxyStr.substr(1)}`).default;
    } else {
      // eslint-disable-next-line import/no-dynamic-require
      res.proxies = require(proxyStr).default;
    }
  } else if (proxyType === 'proxy') {
    res.proxies = parseProxies(proxyStr).map((p) => ({
      provider: 'env',
      ...p,
    }));
  } else if (proxyType === 'hub') {
    const urlObj = new URL(proxyStr);
    res.options = Object.fromEntries(urlObj.searchParams);
    urlObj.search = '';
    res.url = urlObj.toString();
  }
  return res;
};

export default parseProxyParam;
