import HttpsProxyAgent from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';

export function getProxyAgent({ type, host, port, user, password } = {}) {
  if (type === 'http' || type === 'https') {
    let params = {
      host,
      port,
      secureProxy: type === 'https',
    };
    if (user && password) {
      params = {
        ...params,
        auth: `${user}:${password}`,
        headers: {
          'Proxy-Authentication': `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}`,
        },
      };
    }
    return new HttpsProxyAgent(params);
  }
  if (type === 'socks5') {
    return new SocksProxyAgent({
      host,
      port,
      userId: user,
      password,
    });
  }
  return null;
}

export default getProxyAgent;
