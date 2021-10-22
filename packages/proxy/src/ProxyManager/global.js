import { parseProxyParam } from '../utils/parseProxyParam';
import { ProxyManager } from './ProxyManager';

let count = 0;
let proxyManager;
export const initProxyManager = async () => {
  proxyManager = await ProxyManager.start({
    config: {
      log: {
        name: 'proxy',
      },
    },
    ...parseProxyParam(process.env.PROXY),
  });
};
export default ({ wait = false } = {}) => {
  if (count) return proxyManager;
  count += 1;
  if (process.env.PROXY) {
    const promise = initProxyManager();
    if (wait) await promise;
  }
  return proxyManager;
};
