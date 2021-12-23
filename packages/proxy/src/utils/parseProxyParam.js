import fs from 'fs';

import { parseProxies } from './parseProxies';
import { tryURLparse } from './tryURLparse';

export const isProxyList = (proxy) => (tryURLparse(proxy) || {}).pathname !== '/';
export const isProxyHub = isProxyList; // TODO: Добавлено для поддержки старых версий. Удалить, если не используется

export const getProxyType = (proxy) => {
  if (!proxy) return null;
  if (proxy[0] === '.' || proxy[0] === '/') return 'file';
  if (isProxyList(proxy)) return 'list';
  // TODO: добавить проверку на type: proxy
  // Если тип не распознан, возвращать null
  return 'proxy';
};

export const parseProxyParam = (proxyStr) => {
  const proxyType = getProxyType(proxyStr);
  if (proxyType === 'file') {
    const path = proxyStr.startsWith('.') ? `${process.cwd()}${proxyStr.substr(1)}` : proxyStr;
    let proxies = '';

    try {
      // eslint-disable-next-line import/no-dynamic-require
      proxies = require(path).default;
    } catch (error) {
      proxies = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
    }

    return { proxies };
  }
  if (proxyType === 'proxy') {
    const proxies = parseProxies(proxyStr).map((p) => ({
      provider: 'env',
      ...p,
    }));
    return { proxies };
  }
  if (proxyType === 'list') {
    const urlObj = tryURL(proxyStr);
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
