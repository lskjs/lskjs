/* eslint-disable import/no-dynamic-require */
export function isProxyHub(proxy) {
  return (proxy.indexOf('http://') === 0 || proxy.indexOf('https://') === 0) && proxy.includes('/proxy');
}

export function getProxyType(proxy) {
  if (!proxy) return null;
  if (proxy[0] === '.') return 'file';
  if (proxy[0] === '/') return 'file';
  if (isProxyHub(proxy)) return 'hub';
  return 'proxy';
}

export function getProxyKey(proxy) {
  return [proxy.host, proxy.port]
    .filter(Boolean)
    .join(':')
    .replace(/[^a-zA-Z0-9]/g, '_');
}

export function parseProxyFromString(proxyStr) {
  if (typeof proxyStr !== 'string') return proxyStr;
  let uri = proxyStr;
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
  return proxy;
}

export function parseProxyParam(proxyStr) {
  const res = {};
  const proxyType = getProxyType(proxyStr);
  if (proxyType === 'file') {
    if (proxyStr[0] === '.') {
      res.proxies = require(`${process.cwd()}${proxyStr.substr(1)}`).default;
    } else {
      res.proxies = require(proxyStr).default;
    }
  } else if (proxyType === 'proxy') {
    res.proxies = proxyStr.split(',').map((str) => {
      const proxy = parseProxyFromString(str);
      proxy.provider = 'env';
      return proxy;
    });
  } else if (proxyType === 'hub') {
    const urlObj = new URL(proxyStr);
    res.options = Object.fromEntries(urlObj.searchParams);
    urlObj.search = '';
    res.url = urlObj.toString();
  }
  return res;
}

export default parseProxyParam;
