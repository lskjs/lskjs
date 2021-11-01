import { parseProxies } from './parseProxies';

export const isProxyHub = (proxy) =>
  (proxy.startsWith('http://') || proxy.startsWith('https://')) && proxy.includes('/proxy');

export const getProxyType = (proxy) => {
  if (!proxy) return null;
  if (proxy[0] === '.' || proxy[0] === '/') return 'file';
  if (isProxyHub(proxy)) return 'hub';
  return 'proxy';
};

export const parseProxyParam = (proxyStr) => {
  const res = {};
  const proxyType = getProxyType(proxyStr);
  if (proxyType === 'file') {
    if (proxyStr[0] === '.') {
      // eslint-disable-next-line import/no-dynamic-require
      const proxies = require(`${process.cwd()}${proxyStr.substr(1)}`).default;
      return { proxies };
    }
    // eslint-disable-next-line import/no-dynamic-require
    const proxies = require(proxyStr).default;
    return { proxies };
  }
  if (proxyType === 'proxy') {
    const proxies = parseProxies(proxyStr).map((p) => ({
      provider: 'env',
      ...p,
    }));
    return { proxies };
  }
  if (proxyType === 'hub') {
    const urlObj = new URL(proxyStr);
    const options = Object.fromEntries(urlObj.searchParams);
    urlObj.search = '';
    const baseURL = urlObj.toString();

    return {
      client: {
        baseURL,
        options,
      },
    };
  }
  return res;
};

export default parseProxyParam;
