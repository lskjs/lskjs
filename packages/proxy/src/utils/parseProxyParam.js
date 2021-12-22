import { parseProxies } from './parseProxies';

const tryURL = (raw) => {
  let str = raw;
  if (!(str.startsWith('http://') || str.startsWith('https://') || str.startsWith('ftp://'))) {
    str = `http://${str}`;
  }
  try {
    const url = new URL(str);
    return url;
  } catch (err) {
    return null;
  }
};

export const isProxyHub = (proxy) => (tryURL(proxy) || {}).pathname !== '/';

export const getProxyType = (proxy) => {
  if (!proxy) return null;
  if (proxy[0] === '.' || proxy[0] === '/') return 'file';
  if (isProxyHub(proxy)) return 'hub';
  return 'proxy';
};

export const parseProxyParam = (proxyStr) => {
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
  return {
    disabled: true,
  };
};

export default parseProxyParam;
