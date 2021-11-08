import Err from '@lskjs/err';

import { ProxyStrategy } from './ProxyStrategy';

export class IterateProxyStrategy extends ProxyStrategy {
  strategy = 'iterate';
  iteration = 0;
  getProxy() {
    const list = this.getList();
    const fatalCount = this.getFatalCount();
    const count = list?.length;
    if (!count) throw new Err('PROXY_MANAGER_LIST_EMPTY', { count, fatalCount });
    this.iteration += 1;

    return list[this.iteration % (count, fatalCount)];
  }
}

export default IterateProxyStrategy;
