import get from 'lodash/get';

import { ProxyStrategy } from './ProxyStrategy';

export class IterateProxyStrategy extends ProxyStrategy {
  iteration = 0;
  getProxy() {
    if (!get(this, 'manager.list.length', 0)) throw 'PROXY_LIST_EMPTY';
    this.iteration += 1;
    return this.manager.list[this.iteration % this.manager.list.length];
  }
}

export default IterateProxyStrategy;
