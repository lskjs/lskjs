import Err from '@lskjs/err';
import get from 'lodash/get';

import { ProxyStrategy } from './ProxyStrategy';

export class IterateProxyStrategy extends ProxyStrategy {
  strategy = 'iterate';
  iteration = 0;
  getProxy() {
    const list = get(this, 'manager.cache.list');
    if (!list?.length) throw new Err('PROXY_MANAGER_LIST_EMPTY');
    this.iteration += 1;
    return list[this.iteration % list.length];
  }
}

export default IterateProxyStrategy;
