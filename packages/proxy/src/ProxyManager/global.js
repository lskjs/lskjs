import { parseProxyParam } from '../utils/parseProxyParam';
import { ProxyManager } from './ProxyManager';

let count = 0;
let proxyManager;
export const init = async () => {
  proxyManager = await ProxyManager.start({
    config: {
      ns: 'proxy',
      // log: {
      //   name: 'proxy',
      // },
      ...parseProxyParam(process.env.PROXY),
    },
  });
};

export const initOnce = async () => {
  if (count) return proxyManager;
  count += 1;
  if (process.env.PROXY) await init();
  return proxyManager;
};

export default initOnce;
